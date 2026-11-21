import type { League, LeagueReference, Match, MatchStatus, Standing, Team, Venue } from '../types';

/**
 * Sports Agenda API (https://apibr.com/sports-agenda/swagger/).
 * Override the base URL with VITE_API_BASE_URL, e.g. for a local API.
 */
export const API_BASE_URL: string = (
  import.meta.env.VITE_API_BASE_URL ?? 'https://apibr.com/sports-agenda/api/v1'
).replace(/\/+$/, '');

/** Upper bound when following X-total-pages, so a bad header cannot loop forever. */
const MAX_PAGES = 20;
const PAGE_SIZE = 100;

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// ----------------------------------------------------------------- API shapes

interface TeamDto {
  id: number;
  name: string;
  logo: string | null;
}

interface LeagueReferenceDto {
  id: number;
  name: string;
  year: number;
  code: string | null;
}

interface LeagueDto extends LeagueReferenceDto {
  teams_count: number;
  matches_count: number;
  upcoming_matches_count: number;
}

interface MatchDto {
  id: number;
  date: string;
  status: MatchStatus;
  league: LeagueReferenceDto;
  home_team: TeamDto;
  away_team: TeamDto;
  score: { home: number; away: number } | null;
  venue: Venue | null;
}

interface StandingDto {
  position: number;
  team: TeamDto;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
}

// -------------------------------------------------------------------- mappers

const toTeam = (dto: TeamDto): Team => ({ id: String(dto.id), name: dto.name, logo: dto.logo });

const toLeagueReference = (dto: LeagueReferenceDto): LeagueReference => ({
  id: String(dto.id),
  name: dto.name,
  year: dto.year,
  code: dto.code,
});

const toLeague = (dto: LeagueDto): League => ({
  ...toLeagueReference(dto),
  teamsCount: dto.teams_count,
  matchesCount: dto.matches_count,
  upcomingMatchesCount: dto.upcoming_matches_count,
});

const toMatch = (dto: MatchDto): Match => ({
  id: String(dto.id),
  date: dto.date,
  status: dto.status,
  leagueId: String(dto.league.id),
  league: toLeagueReference(dto.league),
  homeTeam: toTeam(dto.home_team),
  awayTeam: toTeam(dto.away_team),
  score: dto.score,
  venue: dto.venue,
});

const toStanding = (dto: StandingDto): Standing => ({
  position: dto.position,
  team: toTeam(dto.team),
  played: dto.played,
  won: dto.won,
  drawn: dto.drawn,
  lost: dto.lost,
  goalsFor: dto.goals_for,
  goalsAgainst: dto.goals_against,
  goalDifference: dto.goal_difference,
  points: dto.points,
});

// ---------------------------------------------------------------------- fetch

type Query = Record<string, string | number | boolean | undefined>;

function buildUrl(path: string, query: Query = {}): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) {
      params.set(key, String(value));
    }
  }
  const search = params.toString();
  return `${API_BASE_URL}${path}${search ? `?${search}` : ''}`;
}

async function request<T>(path: string, query?: Query): Promise<{ data: T; totalPages: number }> {
  let response: Response;
  try {
    response = await fetch(buildUrl(path, query), { headers: { Accept: 'application/json' } });
  } catch {
    throw new ApiError(0, 'Could not reach the Sports Agenda API. Check your connection and try again.');
  }

  if (!response.ok) {
    let message = `Request failed with HTTP ${response.status}`;
    try {
      const body = await response.json();
      if (body && typeof body.error === 'string') {
        message = body.error;
      }
    } catch {
      // Not JSON: keep the generic message.
    }
    throw new ApiError(response.status, message);
  }

  const data = (await response.json()) as T;
  const totalPages = Number(response.headers.get('X-total-pages') ?? '1');

  return { data, totalPages: Number.isFinite(totalPages) ? totalPages : 1 };
}

async function get<T>(path: string, query?: Query): Promise<T> {
  return (await request<T>(path, query)).data;
}

/** Fetches every page of a collection, following X-total-pages. */
async function getAllPages<T>(path: string, query: Query = {}): Promise<T[]> {
  const first = await request<T[]>(path, { ...query, per_page: PAGE_SIZE, page: 1 });
  const pages = Math.min(first.totalPages, MAX_PAGES);
  if (pages <= 1) {
    return first.data;
  }

  const rest = await Promise.all(
    Array.from({ length: pages - 1 }, (_, i) =>
      get<T[]>(path, { ...query, per_page: PAGE_SIZE, page: i + 2 })
    )
  );

  return first.data.concat(...rest);
}

/** YYYY-MM-DD of the given moment in the browser's time zone. */
export function localDate(date: Date = new Date()): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** The browser's IANA time zone, so "today" means the visitor's today. */
export function browserTimeZone(): string | undefined {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || undefined;
  } catch {
    return undefined;
  }
}

const RECENT_LIMIT = 10;

export const api = {
  leagues: {
    /** Leagues that have at least one match. */
    getAll: async () => (await getAllPages<LeagueDto>('/leagues', { hide_empty: true })).map(toLeague),
    getById: async (id: string) => toLeague(await get<LeagueDto>(`/leagues/${encodeURIComponent(id)}`)),
    getTeams: async (id: string) =>
      (await getAllPages<TeamDto>(`/leagues/${encodeURIComponent(id)}/teams`)).map(toTeam),
    getMatches: async (id: string) =>
      (await getAllPages<MatchDto>(`/leagues/${encodeURIComponent(id)}/matches`)).map(toMatch),
    getStandings: async (id: string) =>
      (await get<StandingDto[]>(`/leagues/${encodeURIComponent(id)}/standings`)).map(toStanding),
  },

  teams: {
    getAll: async () => (await getAllPages<TeamDto>('/teams')).map(toTeam),
    getById: async (id: string) => toTeam(await get<TeamDto>(`/teams/${encodeURIComponent(id)}`)),
    getLeagues: async (id: string) =>
      (await get<LeagueDto[]>(`/teams/${encodeURIComponent(id)}/leagues`)).map(toLeague),
    getMatches: async (id: string) =>
      (await getAllPages<MatchDto>(`/teams/${encodeURIComponent(id)}/matches`)).map(toMatch),
  },

  matches: {
    getById: async (id: string) => toMatch(await get<MatchDto>(`/matches/${encodeURIComponent(id)}`)),
    /** Every match kicking off today in the visitor's time zone. */
    getToday: async () =>
      (await getAllPages<MatchDto>('/matches', { date: localDate(), tz: browserTimeZone() })).map(toMatch),
    /** Most recent results first. */
    getPast: async (limit: number = RECENT_LIMIT) =>
      (await get<MatchDto[]>('/matches', { status: 'finished', order: 'desc', per_page: limit })).map(toMatch),
    /** Next scheduled matches, soonest first. */
    getUpcoming: async (limit: number = RECENT_LIMIT) =>
      (
        await get<MatchDto[]>('/matches', {
          status: 'scheduled',
          from: new Date().toISOString(),
          per_page: limit,
        })
      ).map(toMatch),
  },
};

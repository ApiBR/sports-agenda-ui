export interface League {
  id: string;
  name: string;
  year: number;
  /** ESPN league code, e.g. BRA.1 */
  code: string | null;
  logo?: string;
  teamsCount: number;
  matchesCount: number;
  upcomingMatchesCount: number;
}

export interface LeagueReference {
  id: string;
  name: string;
  year: number;
  code: string | null;
}

export interface Team {
  id: string;
  name: string;
  logo: string | null;
}

export interface Standing {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export type MatchStatus = 'scheduled' | 'in_play' | 'finished';

export interface Venue {
  name: string | null;
  city: string | null;
  country: string | null;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  /** Kick-off, ISO 8601 in UTC */
  date: string;
  score: {
    home: number;
    away: number;
  } | null;
  status: MatchStatus;
  leagueId: string;
  league: LeagueReference;
  venue: Venue | null;
}

/** Points per result used by the API's standings. */
export const SCORING_SYSTEM = { win: 3, draw: 1, loss: 0 } as const;

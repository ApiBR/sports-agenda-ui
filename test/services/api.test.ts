import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { api, API_BASE_URL, ApiError, localDate } from '../../src/services/api';

const matchDto = {
  id: 7,
  date: '2026-11-22T19:00:00Z',
  status: 'finished',
  league: { id: 1, name: 'Campeonato Brasileiro', year: 2026, code: 'BRA.1' },
  home_team: { id: 1, name: 'Flamengo', logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/819.png' },
  away_team: { id: 2, name: 'Vasco da Gama', logo: null },
  score: { home: 2, away: 0 },
  venue: { name: 'Maracanã', city: 'Rio de Janeiro', country: null },
  updated_at: '2026-11-22T21:00:00Z',
};

function jsonResponse(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

describe('api service', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
  });

  const requestedUrl = (call = 0) => new URL(fetchMock.mock.calls[call][0] as string);

  it('maps a match from the API shape', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse(matchDto));

    const match = await api.matches.getById('7');

    expect(requestedUrl().toString()).toBe(`${API_BASE_URL}/matches/7`);
    expect(match).toEqual({
      id: '7',
      date: '2026-11-22T19:00:00Z',
      status: 'finished',
      leagueId: '1',
      league: { id: '1', name: 'Campeonato Brasileiro', year: 2026, code: 'BRA.1' },
      homeTeam: { id: '1', name: 'Flamengo', logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/819.png' },
      awayTeam: { id: '2', name: 'Vasco da Gama', logo: null },
      score: { home: 2, away: 0 },
      venue: { name: 'Maracanã', city: 'Rio de Janeiro', country: null },
    });
  });

  it('follows X-total-pages for whole collections', async () => {
    fetchMock
      .mockResolvedValueOnce(jsonResponse([{ id: 1, name: 'A', logo: null }], 200, { 'X-total-pages': '2' }))
      .mockResolvedValueOnce(jsonResponse([{ id: 2, name: 'B', logo: null }], 200, { 'X-total-pages': '2' }));

    const teams = await api.teams.getAll();

    expect(teams.map((team) => team.name)).toEqual(['A', 'B']);
    expect(requestedUrl(0).searchParams.get('page')).toBe('1');
    expect(requestedUrl(1).searchParams.get('page')).toBe('2');
    expect(requestedUrl(1).searchParams.get('per_page')).toBe('100');
  });

  it('asks only for leagues with matches', async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse([
        { id: 1, name: 'Campeonato Brasileiro', year: 2026, code: 'BRA.1', teams_count: 20, matches_count: 380, upcoming_matches_count: 10 },
      ])
    );

    const leagues = await api.leagues.getAll();

    expect(requestedUrl().searchParams.get('hide_empty')).toBe('true');
    expect(leagues[0]).toMatchObject({ id: '1', teamsCount: 20, matchesCount: 380, upcomingMatchesCount: 10 });
  });

  it('queries today in the browser time zone and recent results newest first', async () => {
    fetchMock.mockImplementation(() => Promise.resolve(jsonResponse([])));

    await api.matches.getToday();
    await api.matches.getPast(5);
    await api.matches.getUpcoming();

    expect(requestedUrl(0).searchParams.get('date')).toBe(localDate());
    expect(requestedUrl(0).searchParams.get('tz')).toBeTruthy();
    expect(Object.fromEntries(requestedUrl(1).searchParams)).toEqual({ status: 'finished', order: 'desc', per_page: '5' });
    expect(requestedUrl(2).searchParams.get('status')).toBe('scheduled');
    expect(requestedUrl(2).searchParams.get('from')).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it('maps standings', async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse([
        {
          position: 1, team: { id: 1, name: 'Flamengo', logo: null }, played: 2, won: 1, drawn: 1, lost: 0,
          goals_for: 3, goals_against: 1, goal_difference: 2, points: 4,
        },
      ])
    );

    const [row] = await api.leagues.getStandings('1');

    expect(requestedUrl().pathname).toMatch(/\/leagues\/1\/standings$/);
    expect(row).toMatchObject({ position: 1, goalsFor: 3, goalsAgainst: 1, goalDifference: 2, points: 4 });
  });

  it('surfaces the API error message', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ error: 'League not found' }, 404));

    await expect(api.leagues.getById('99')).rejects.toEqual(new ApiError(404, 'League not found'));
  });

  it('reports network failures', async () => {
    fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'));

    await expect(api.teams.getById('1')).rejects.toMatchObject({ status: 0 });
  });
});

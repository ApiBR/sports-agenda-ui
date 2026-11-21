import type { League, Match, Standing, Team } from '../src/types';

export const flamengo: Team = { id: '1', name: 'Flamengo', logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/819.png' };
export const vasco: Team = { id: '2', name: 'Vasco da Gama', logo: null };

export const brasileirao: League = {
  id: '1',
  name: 'Campeonato Brasileiro',
  year: 2026,
  code: 'BRA.1',
  teamsCount: 20,
  matchesCount: 380,
  upcomingMatchesCount: 10,
};

export const libertadores: League = { ...brasileirao, id: '2', name: 'Copa Libertadores', code: null, upcomingMatchesCount: 0 };

const leagueReference = { id: '1', name: 'Campeonato Brasileiro', year: 2026, code: 'BRA.1' };

export const finishedMatch: Match = {
  id: '10',
  homeTeam: flamengo,
  awayTeam: vasco,
  date: '2026-11-18T19:00:00Z',
  score: { home: 2, away: 0 },
  status: 'finished',
  leagueId: '1',
  league: leagueReference,
  venue: { name: 'Maracanã', city: 'Rio de Janeiro', country: null },
};

export const liveMatch: Match = { ...finishedMatch, id: '11', score: { home: 1, away: 1 }, status: 'in_play', venue: null };

export const scheduledMatch: Match = {
  ...finishedMatch,
  id: '12',
  homeTeam: vasco,
  awayTeam: flamengo,
  date: '2030-06-01T20:00:00Z',
  score: null,
  status: 'scheduled',
  venue: null,
};

export const standings: Standing[] = [
  { position: 1, team: flamengo, played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 2, goalsAgainst: 0, goalDifference: 2, points: 3 },
  { position: 2, team: vasco, played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 0, goalsAgainst: 2, goalDifference: -2, points: 0 },
];

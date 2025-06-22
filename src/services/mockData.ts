import { League, Match, Team, Player } from '../types';

// Mock team logos from Unsplash (sports-related images)
const teamLogos = [
  'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1577223625816-6500cc0d7247?w=200&h=200&fit=crop',
];

// Mock league logos
const leagueLogos = [
  'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1574629289-760acc89b4e8?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1516731415730-0c607149933a?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1574629289-760acc89b4e8?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=200&h=200&fit=crop',
];

// Mock player images
const playerImages = [
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop',
];

const createPlayers = (teamId: string): Player[] => {
  return Array.from({ length: 5 }, (_, i) => ({
    id: `${teamId}-player-${i + 1}`,
    name: `Player ${i + 1}`,
    number: i + 1,
    position: ['Forward', 'Midfielder', 'Defender', 'Goalkeeper'][Math.floor(Math.random() * 4)],
    image: playerImages[i % playerImages.length],
  }));
};

export const mockLeagues: League[] = [
  { 
    id: '1', 
    name: 'Premier League', 
    year: 2024, 
    logo: leagueLogos[0],
    scoringSystem: { win: 3, draw: 1, loss: 0 }
  },
  { 
    id: '2', 
    name: 'La Liga', 
    year: 2024, 
    logo: leagueLogos[1],
    scoringSystem: { win: 3, draw: 1, loss: 0 }
  },
  { 
    id: '3', 
    name: 'Bundesliga', 
    year: 2024,
    logo: leagueLogos[2],
    scoringSystem: { win: 3, draw: 1, loss: 0 }
  },
  { 
    id: '4', 
    name: 'Serie A', 
    year: 2024,
    logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop',
    scoringSystem: { win: 2, draw: 1, loss: 0 }
  },
  {
    id: '5',
    name: 'Ligue 1',
    year: 2024,
    logo: leagueLogos[4],
    scoringSystem: { win: 3, draw: 1, loss: 0 }
  },
  {
    id: '6',
    name: 'Eredivisie',
    year: 2024,
    logo: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop',
    scoringSystem: { win: 3, draw: 1, loss: -1 } // Unique: Penalty for losing
  },
  {
    id: '7',
    name: 'Primeira Liga',
    year: 2024,
    logo: leagueLogos[6],
    scoringSystem: { win: 3, draw: 1, loss: 0 }
  },
  {
    id: '8',
    name: 'Championship',
    year: 2024,
    scoringSystem: { win: 3, draw: 1, loss: 0 }
  },
  {
    id: '9',
    name: 'Scottish Premiership',
    year: 2024,
    scoringSystem: { win: 3, draw: 1, loss: 0 }
  },
  {
    id: '10',
    name: 'Super League Greece',
    year: 2024,
    scoringSystem: { win: 2, draw: 1, loss: 0 } // Different scoring system
  }
];

const createTeamStats = (): TeamStats => ({
  played: Math.floor(Math.random() * 20) + 10,
  won: Math.floor(Math.random() * 10) + 5,
  drawn: Math.floor(Math.random() * 5),
  lost: Math.floor(Math.random() * 5),
  goalsFor: Math.floor(Math.random() * 40) + 20,
  goalsAgainst: Math.floor(Math.random() * 20) + 10,
  points: 0, // Will be calculated based on league scoring system
});

export const mockTeams: Team[] = [
  { 
    id: '1', 
    name: 'Manchester United', 
    logo: teamLogos[0], 
    players: createPlayers('1'),
    stats: createTeamStats()
  },
  { 
    id: '2', 
    name: 'Liverpool', 
    logo: teamLogos[1], 
    players: createPlayers('2'),
    stats: createTeamStats()
  },
  { 
    id: '3', 
    name: 'Arsenal', 
    logo: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop', 
    players: createPlayers('3'),
    stats: createTeamStats()
  },
  { 
    id: '4', 
    name: 'Chelsea', 
    logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop', 
    players: createPlayers('4'),
    stats: createTeamStats()
  },
];

const createMatch = (
  id: string,
  homeTeam: Team,
  awayTeam: Team,
  status: Match['status'],
  hoursOffset: number,
  leagueId: string,
  score?: { home: number; away: number }
): Match => ({
  id,
  homeTeam,
  awayTeam,
  date: new Date(Date.now() + hoursOffset * 3600000).toISOString(),
  status,
  leagueId,
  score,
});

export const mockMatches: Match[] = [
  // Today's matches
  createMatch('1', mockTeams[0], mockTeams[1], 'live', 0, '1', { home: 2, away: 1 }),
  createMatch('2', mockTeams[2], mockTeams[3], 'scheduled', 2, '1'),
  
  // Past matches
  createMatch('3', mockTeams[1], mockTeams[2], 'finished', -48, '1', { home: 3, away: 0 }),
  createMatch('4', mockTeams[3], mockTeams[0], 'finished', -24, '2', { home: 1, away: 1 }),
  
  // Upcoming matches
  createMatch('5', mockTeams[2], mockTeams[1], 'scheduled', 48, '2'),
  createMatch('6', mockTeams[0], mockTeams[3], 'scheduled', 72, '1'),
];
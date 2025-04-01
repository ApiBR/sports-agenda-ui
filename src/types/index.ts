export interface League {
  id: string;
  name: string;
  year: number;
  logo?: string;
  scoringSystem: {
    win: number;
    draw: number;
    loss: number;
  };
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  players: Player[];
  stats?: TeamStats;
}

export interface TeamStats {
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  image: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  score?: {
    home: number;
    away: number;
  };
  status: 'scheduled' | 'live' | 'finished';
  leagueId: string;
}
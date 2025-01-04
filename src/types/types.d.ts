interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  date: string;
  score?: string;
  league?: string;
}

interface MatchListProps {
  matches: Match[];
}

interface Team {
  id: number;
  name: string;
  logo: string;
  players: Player[];
  matches: Match[];
  leagues: League[];
}

interface TeamGridProps {
  teams?: Team[] | null;
}

interface League {
  id: number;
  name: string;
  year: number;
  teams?: Team[] | null;
}

interface Player {
  id: number;
  name: string;
  position: string;
  age: number;
}

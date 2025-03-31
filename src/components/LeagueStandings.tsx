import React from 'react';
import { Link } from 'react-router-dom';
import type { Team, League } from '../types';

interface LeagueStandingsProps {
  teams: Team[];
  league: League;
}

export const LeagueStandings: React.FC<LeagueStandingsProps> = ({ teams, league }) => {
  // Calculate points based on league's scoring system
  const teamsWithPoints = teams.map(team => {
    if (!team.stats) return team;
    
    const points = (
      team.stats.won * league.scoringSystem.win +
      team.stats.drawn * league.scoringSystem.draw +
      team.stats.lost * league.scoringSystem.loss
    );
    
    return {
      ...team,
      stats: {
        ...team.stats,
        points
      }
    };
  });

  // Sort teams by points (descending)
  const sortedTeams = teamsWithPoints.sort((a, b) => {
    if (!a.stats || !b.stats) return 0;
    if (b.stats.points !== a.stats.points) {
      return b.stats.points - a.stats.points;
    }
    // If points are equal, sort by goal difference
    const aGD = a.stats.goalsFor - a.stats.goalsAgainst;
    const bGD = b.stats.goalsFor - b.stats.goalsAgainst;
    if (bGD !== aGD) {
      return bGD - aGD;
    }
    // If goal difference is equal, sort by goals scored
    return b.stats.goalsFor - a.stats.goalsFor;
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Pos</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Team</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600 text-center">P</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600 text-center">W</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600 text-center">D</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600 text-center">L</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600 text-center">GF</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600 text-center">GA</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600 text-center">GD</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600 text-center">Pts</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team, index) => {
            if (!team.stats) return null;
            const goalDifference = team.stats.goalsFor - team.stats.goalsAgainst;
            
            return (
              <tr 
                key={team.id}
                className={`
                  border-t
                  ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  hover:bg-[rgb(241,248,233)] transition-colors
                `}
              >
                <td className="px-4 py-3 text-sm">{index + 1}</td>
                <td className="px-4 py-3">
                  <Link 
                    to={`/team/${team.id}`}
                    className="flex items-center space-x-3 group"
                  >
                    <img 
                      src={team.logo} 
                      alt={team.name} 
                      className="w-8 h-8 object-contain"
                    />
                    <span className="text-sm font-medium group-hover:text-emerald-600 transition-colors">
                      {team.name}
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm text-center">{team.stats.played}</td>
                <td className="px-4 py-3 text-sm text-center">{team.stats.won}</td>
                <td className="px-4 py-3 text-sm text-center">{team.stats.drawn}</td>
                <td className="px-4 py-3 text-sm text-center">{team.stats.lost}</td>
                <td className="px-4 py-3 text-sm text-center">{team.stats.goalsFor}</td>
                <td className="px-4 py-3 text-sm text-center">{team.stats.goalsAgainst}</td>
                <td className="px-4 py-3 text-sm text-center font-medium">
                  <span className={goalDifference > 0 ? 'text-green-600' : goalDifference < 0 ? 'text-red-600' : 'text-gray-600'}>
                    {goalDifference > 0 ? '+' : ''}{goalDifference}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-center font-bold">{team.stats.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Scoring System</h3>
        <div className="flex space-x-4 text-sm text-gray-600">
          <span>Win: {league.scoringSystem.win} pts</span>
          <span>Draw: {league.scoringSystem.draw} pts</span>
          <span>Loss: {league.scoringSystem.loss} pts</span>
        </div>
      </div>
    </div>
  );
};
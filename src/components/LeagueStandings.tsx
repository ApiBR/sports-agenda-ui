import React from 'react';
import { Link } from 'react-router-dom';
import { TeamLogo } from './TeamLogo';
import { SCORING_SYSTEM, type Standing } from '../types';

interface LeagueStandingsProps {
  standings: Standing[];
}

/** The league table as ranked by the API (points, goal difference, goals for, wins). */
export const LeagueStandings: React.FC<LeagueStandingsProps> = ({ standings }) => {
  if (standings.length === 0) {
    return <p className="text-sm text-gray-500">No finished matches yet.</p>;
  }

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
          {standings.map((row, index) => (
            <tr
              key={row.team.id}
              className={`
                border-t
                ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                hover:bg-[rgb(241,248,233)] transition-colors
              `}
            >
              <td className="px-4 py-3 text-sm">{row.position}</td>
              <td className="px-4 py-3">
                <Link to={`/team/${row.team.id}`} className="flex items-center space-x-3 group">
                  <TeamLogo team={row.team} />
                  <span className="text-sm font-medium group-hover:text-emerald-600 transition-colors">
                    {row.team.name}
                  </span>
                </Link>
              </td>
              <td className="px-4 py-3 text-sm text-center">{row.played}</td>
              <td className="px-4 py-3 text-sm text-center">{row.won}</td>
              <td className="px-4 py-3 text-sm text-center">{row.drawn}</td>
              <td className="px-4 py-3 text-sm text-center">{row.lost}</td>
              <td className="px-4 py-3 text-sm text-center">{row.goalsFor}</td>
              <td className="px-4 py-3 text-sm text-center">{row.goalsAgainst}</td>
              <td className="px-4 py-3 text-sm text-center font-medium">
                <span
                  className={
                    row.goalDifference > 0 ? 'text-green-600' : row.goalDifference < 0 ? 'text-red-600' : 'text-gray-600'
                  }
                >
                  {row.goalDifference > 0 ? '+' : ''}
                  {row.goalDifference}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-center font-bold">{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Scoring System</h3>
        <div className="flex space-x-4 text-sm text-gray-600">
          <span>Win: {SCORING_SYSTEM.win} pts</span>
          <span>Draw: {SCORING_SYSTEM.draw} pts</span>
          <span>Loss: {SCORING_SYSTEM.loss} pts</span>
        </div>
        <p className="mt-2 text-xs text-gray-500">Computed from the finished matches collected so far.</p>
      </div>
    </div>
  );
};

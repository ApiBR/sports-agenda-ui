import React from 'react';
import { Link } from 'react-router-dom';
import type { Team } from '../types';

interface TeamGridProps {
  teams: Team[];
}

export const TeamGrid: React.FC<TeamGridProps> = ({ teams }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {teams.map((team) => (
        <Link
          key={team.id}
          to={`/team/${team.id}`}
          className="rounded-lg p-4 hover:shadow-lg transition-all flex flex-col items-center"
          style={{ backgroundColor: 'rgb(241, 248, 233)' }}
        >
          <img
            src={team.logo}
            alt={team.name}
            className="w-20 h-20 object-contain mb-3"
          />
          <h3 className="text-center font-medium text-gray-800">{team.name}</h3>
        </Link>
      ))}
    </div>
  );
};
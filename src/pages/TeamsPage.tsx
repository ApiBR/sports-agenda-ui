import React from 'react';
import { Link } from 'react-router-dom';
import { mockTeams } from '../services/mockData';

export const TeamsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">All Teams</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockTeams.map((team) => (
          <Link
            key={team.id}
            to={`/team/${team.id}`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all group"
          >
            <div className="flex flex-col items-center text-center">
              <img
                src={team.logo}
                alt={team.name}
                className="w-24 h-24 object-contain mb-4 group-hover:scale-105 transition-transform"
              />
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                {team.name}
              </h2>
              {team.stats && (
                <div className="mt-2 text-sm text-gray-500">
                  <span>{team.stats.played} matches</span>
                  <span className="mx-2">•</span>
                  <span>{team.stats.won} wins</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
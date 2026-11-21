import React from 'react';
import { Link } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { TeamLogo } from '../components/TeamLogo';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';

export const TeamsPage: React.FC = () => {
  const { data: teams, isLoading, error } = useApi(() => api.teams.getAll());

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !teams) {
    return <ErrorMessage message={error ?? 'An error occurred'} />;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">All Teams</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teams.map((team) => (
          <Link
            key={team.id}
            to={`/team/${team.id}`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all group"
          >
            <div className="flex flex-col items-center text-center">
              <TeamLogo team={team} className="w-24 h-24 mb-4 group-hover:scale-105 transition-transform" />
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                {team.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

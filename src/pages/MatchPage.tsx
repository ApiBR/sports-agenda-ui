import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { TeamLogo } from '../components/TeamLogo';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';

export const MatchPage: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const { data: match, isLoading, error } = useApi(() => api.matches.getById(id), [id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !match) {
    return <ErrorMessage message={error ?? 'Match not found'} />;
  }

  const venue = match.venue
    ? [match.venue.name, match.venue.city, match.venue.country].filter(Boolean).join(', ')
    : '';

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <Link
            to={`/league/${match.leagueId}`}
            className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
          >
            {match.league.name} {match.league.year}
          </Link>
        </div>

        <div className="flex items-center justify-between mb-8">
          <Link to={`/team/${match.homeTeam.id}`} className="flex flex-col items-center flex-1 group">
            <TeamLogo team={match.homeTeam} className="w-24 h-24 mb-4 group-hover:scale-105 transition-transform" />
            <h2 className="text-xl font-bold text-center group-hover:text-emerald-600 transition-colors">
              {match.homeTeam.name}
            </h2>
          </Link>

          <div className="flex flex-col items-center px-8">
            {match.status !== 'scheduled' && match.score ? (
              <div className="text-4xl font-bold mb-2">
                {match.score.home} - {match.score.away}
              </div>
            ) : (
              <div className="text-xl font-semibold mb-2">VS</div>
            )}
            <div className="text-sm text-gray-500">
              {new Date(match.date).toLocaleDateString()}{' '}
              {new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="mt-2 px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'rgb(241, 248, 233)' }}>
              {match.status === 'in_play' ? (
                <span className="text-red-500 font-semibold">LIVE</span>
              ) : match.status === 'finished' ? (
                'Finished'
              ) : (
                'Scheduled'
              )}
            </div>
          </div>

          <Link to={`/team/${match.awayTeam.id}`} className="flex flex-col items-center flex-1 group">
            <TeamLogo team={match.awayTeam} className="w-24 h-24 mb-4 group-hover:scale-105 transition-transform" />
            <h2 className="text-xl font-bold text-center group-hover:text-emerald-600 transition-colors">
              {match.awayTeam.name}
            </h2>
          </Link>
        </div>

        {venue && (
          <div className="flex items-center justify-center text-sm text-gray-600 space-x-2">
            <MapPin className="w-4 h-4" />
            <span>{venue}</span>
          </div>
        )}
      </div>
    </div>
  );
};

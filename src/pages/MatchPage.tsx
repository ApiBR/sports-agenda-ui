import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { api } from '../services/api';
import type { Match } from '../types';

export const MatchPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [match, setMatch] = useState<Match | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const matchData = await api.matches.getById(id);
        setMatch(matchData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Match not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <Link 
            to={`/league/${match.leagueId}`}
            className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
          >
            View League Details
          </Link>
        </div>
        
        <div className="flex items-center justify-between mb-8">
          <Link 
            to={`/team/${match.homeTeam.id}`}
            className="flex flex-col items-center flex-1 group"
          >
            <img
              src={match.homeTeam.logo}
              alt={match.homeTeam.name}
              className="w-24 h-24 object-contain mb-4 group-hover:scale-105 transition-transform"
            />
            <h2 className="text-xl font-bold text-center group-hover:text-emerald-600 transition-colors">
              {match.homeTeam.name}
            </h2>
          </Link>

          <div className="flex flex-col items-center px-8">
            {match.status === 'finished' && match.score ? (
              <div className="text-4xl font-bold mb-2">
                {match.score.home} - {match.score.away}
              </div>
            ) : (
              <div className="text-xl font-semibold mb-2">VS</div>
            )}
            <div className="text-sm text-gray-500">
              {new Date(match.date).toLocaleDateString()} {new Date(match.date).toLocaleTimeString()}
            </div>
            <div className="mt-2 px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'rgb(241, 248, 233)' }}>
              {match.status === 'live' ? (
                <span className="text-red-500 font-semibold">LIVE</span>
              ) : match.status === 'finished' ? (
                'Finished'
              ) : (
                'Scheduled'
              )}
            </div>
          </div>

          <Link 
            to={`/team/${match.awayTeam.id}`}
            className="flex flex-col items-center flex-1 group"
          >
            <img
              src={match.awayTeam.logo}
              alt={match.awayTeam.name}
              className="w-24 h-24 object-contain mb-4 group-hover:scale-105 transition-transform"
            />
            <h2 className="text-xl font-bold text-center group-hover:text-emerald-600 transition-colors">
              {match.awayTeam.name}
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};
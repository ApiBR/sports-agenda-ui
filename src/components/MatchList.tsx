import React from 'react';
import { Link } from 'react-router-dom';
import { TeamLogo } from './TeamLogo';
import type { Match } from '../types';

interface MatchListProps {
  matches: Match[];
  title: string;
  emptyMessage?: string;
}

export const MatchList: React.FC<MatchListProps> = ({ matches, title, emptyMessage = 'No matches to show.' }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {matches.length === 0 ? (
        <p className="text-sm text-gray-500">{emptyMessage}</p>
      ) : (
        <div className="space-y-4">
          {matches.map((match) => (
            <Link
              key={match.id}
              to={`/match/${match.id}`}
              className="block rounded-lg p-4 hover:bg-[rgb(241,248,233)] transition-colors"
              style={{ backgroundColor: 'rgb(241, 248, 233)' }}
            >
              <div className="text-xs text-gray-500 text-center mb-2">{match.league.name}</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <TeamLogo team={match.homeTeam} />
                  <span className="font-medium">{match.homeTeam.name}</span>
                </div>

                <div className="flex flex-col items-center px-4">
                  {match.status !== 'scheduled' && match.score ? (
                    <div className="text-lg font-bold">
                      {match.score.home} - {match.score.away}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">
                      {new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                  <div className="text-xs text-gray-500">
                    {match.status === 'in_play' ? (
                      <span className="text-red-500 font-semibold">LIVE</span>
                    ) : (
                      new Date(match.date).toLocaleDateString()
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3 flex-1 justify-end">
                  <span className="font-medium text-right">{match.awayTeam.name}</span>
                  <TeamLogo team={match.awayTeam} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { mockLeagues } from '../services/mockData';

export const LeaguesPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">All Leagues</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockLeagues.map((league) => (
          <Link
            key={league.id}
            to={`/league/${league.id}`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center space-x-4">
              {league.logo ? (
                <img
                  src={league.logo}
                  alt={league.name}
                  className="w-16 h-16 object-contain"
                />
              ) : (
                <div className="w-16 h-16 bg-[rgb(241,248,233)] rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-emerald-600" />
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{league.name}</h2>
                <p className="text-gray-600">Season {league.year}</p>
                <div className="mt-2 text-sm text-gray-500">
                  <span>Win: {league.scoringSystem.win} pts</span>
                  <span className="mx-2">•</span>
                  <span>Draw: {league.scoringSystem.draw} pts</span>
                  <span className="mx-2">•</span>
                  <span>Loss: {league.scoringSystem.loss} pts</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
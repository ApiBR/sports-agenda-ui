import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MatchList } from '../components/MatchList';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { PlayerCarousel } from '../components/PlayerCarousel';
import { api } from '../services/api';
import type { Team, Match, League } from '../types';

export const TeamPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError('Team ID is required');
        setIsLoading(false);
        return;
      }

      try {
        const [teamData, leaguesData, matchesData] = await Promise.all([
          api.teams.getById(id),
          api.teams.getLeagues(id),
          api.teams.getMatches(id),
        ]);

        setTeam(teamData);
        setLeagues(leaguesData);
        setMatches(matchesData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching team data');
        setTeam(null);
        setLeagues([]);
        setMatches([]);
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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">{error}</p>
          <p className="text-gray-600 mt-2">Please try again later or contact support if the problem persists.</p>
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Team not found</p>
        </div>
      </div>
    );
  }

  const pastMatches = matches.filter(match => match.status === 'finished');
  const upcomingMatches = matches.filter(match => match.status === 'scheduled');

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4">
          <img src={team.logo} alt={team.name} className="w-24 h-24 object-contain" />
          <h1 className="text-3xl font-bold text-gray-900">{team.name}</h1>
        </div>
      </div>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Squad</h2>
        <PlayerCarousel players={team.players} />
      </section>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Competitions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {leagues.map((league) => (
            <div key={league.id} className="p-4 border rounded-lg">
              <h3 className="font-semibold">{league.name}</h3>
              <p className="text-gray-600">Season {league.year}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <MatchList matches={pastMatches} title="Past Matches" />
        <MatchList matches={upcomingMatches} title="Upcoming Matches" />
      </div>
    </div>
  );
};
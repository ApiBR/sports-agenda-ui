import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TeamGrid } from '../components/TeamGrid';
import { MatchList } from '../components/MatchList';
import { LeagueStandings } from '../components/LeagueStandings';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { api } from '../services/api';
import type { League, Team, Match } from '../types';

export const LeaguePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [league, setLeague] = useState<League | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const [leagueData, teamsData, matchesData] = await Promise.all([
          api.leagues.getById(id),
          api.leagues.getTeams(id),
          api.leagues.getMatches(id),
        ]);

        setLeague(leagueData);
        setTeams(teamsData);
        setMatches(matchesData);
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

  if (!league) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">League not found</p>
      </div>
    );
  }

  const pastMatches = matches.filter(match => match.status === 'finished');
  const upcomingMatches = matches.filter(match => match.status === 'scheduled');

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4">
          {league.logo && (
            <img 
              src={league.logo} 
              alt={league.name} 
              className="w-16 h-16 object-contain"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{league.name}</h1>
            <p className="text-gray-600">Season {league.year}</p>
          </div>
        </div>
      </div>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Standings</h2>
        <LeagueStandings teams={teams} league={league} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Teams</h2>
        <TeamGrid teams={teams} />
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <MatchList matches={pastMatches} title="Past Matches" />
        <MatchList matches={upcomingMatches} title="Upcoming Matches" />
      </div>
    </div>
  );
};
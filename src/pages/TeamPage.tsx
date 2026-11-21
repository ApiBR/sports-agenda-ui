import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { MatchList } from '../components/MatchList';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { TeamLogo } from '../components/TeamLogo';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';

export const TeamPage: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const { data, isLoading, error } = useApi(async () => {
    const [team, leagues, matches] = await Promise.all([
      api.teams.getById(id),
      api.teams.getLeagues(id),
      api.teams.getMatches(id),
    ]);
    return { team, leagues, matches };
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !data) {
    return <ErrorMessage message={error ?? 'Team not found'} />;
  }

  const { team, leagues, matches } = data;
  const pastMatches = matches.filter((match) => match.status === 'finished').reverse();
  const upcomingMatches = matches.filter((match) => match.status !== 'finished');

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4">
          <TeamLogo team={team} className="w-24 h-24" />
          <h1 className="text-3xl font-bold text-gray-900">{team.name}</h1>
        </div>
      </div>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Competitions</h2>
        {leagues.length === 0 ? (
          <p className="text-sm text-gray-500">No competitions found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leagues.map((league) => (
              <Link
                key={league.id}
                to={`/league/${league.id}`}
                className="p-4 border rounded-lg hover:bg-[rgb(241,248,233)] transition-colors"
              >
                <h3 className="font-semibold">{league.name}</h3>
                <p className="text-gray-600">Season {league.year}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <MatchList matches={pastMatches} title="Past Matches" />
        <MatchList matches={upcomingMatches} title="Upcoming Matches" />
      </div>
    </div>
  );
};

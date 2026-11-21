import React from 'react';
import { useParams } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { TeamGrid } from '../components/TeamGrid';
import { MatchList } from '../components/MatchList';
import { LeagueStandings } from '../components/LeagueStandings';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';

export const LeaguePage: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const { data, isLoading, error } = useApi(async () => {
    const [league, teams, matches, standings] = await Promise.all([
      api.leagues.getById(id),
      api.leagues.getTeams(id),
      api.leagues.getMatches(id),
      api.leagues.getStandings(id),
    ]);
    return { league, teams, matches, standings };
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !data) {
    return <ErrorMessage message={error ?? 'League not found'} />;
  }

  const { league, teams, matches, standings } = data;
  const pastMatches = matches.filter((match) => match.status === 'finished').reverse();
  const upcomingMatches = matches.filter((match) => match.status !== 'finished');

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4">
          {league.logo ? (
            <img src={league.logo} alt={league.name} className="w-16 h-16 object-contain" />
          ) : (
            <div className="w-16 h-16 bg-[rgb(241,248,233)] rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-emerald-600" />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{league.name}</h1>
            <p className="text-gray-600">Season {league.year}</p>
          </div>
        </div>
      </div>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Standings</h2>
        <LeagueStandings standings={standings} />
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

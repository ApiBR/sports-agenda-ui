import React from 'react';
import { LeagueCarousel } from '../components/LeagueCarousel';
import { MatchList } from '../components/MatchList';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';

export const HomePage: React.FC = () => {
  const { data, isLoading, error } = useApi(async () => {
    const [leagues, today, past, upcoming] = await Promise.all([
      api.leagues.getAll(),
      api.matches.getToday(),
      api.matches.getPast(),
      api.matches.getUpcoming(),
    ]);
    // Leagues with games coming up first.
    leagues.sort((a, b) => b.upcomingMatchesCount - a.upcomingMatchesCount || a.name.localeCompare(b.name));
    return { leagues, today, past, upcoming };
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !data) {
    return <ErrorMessage message={error ?? 'An error occurred'} />;
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Popular Leagues</h2>
        <LeagueCarousel leagues={data.leagues} />
      </section>

      <section>
        <MatchList matches={data.today} title="Today's Matches" emptyMessage="No matches today." />
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <MatchList matches={data.past} title="Past Matches" />
        <MatchList matches={data.upcoming} title="Upcoming Matches" />
      </div>
    </div>
  );
};

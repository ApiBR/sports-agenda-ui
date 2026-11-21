import React from 'react';
import { MatchList } from '../components/MatchList';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';

const LIST_SIZE = 30;

export const MatchesPage: React.FC = () => {
  const { data, isLoading, error } = useApi(async () => {
    const [today, upcoming, past] = await Promise.all([
      api.matches.getToday(),
      api.matches.getUpcoming(LIST_SIZE),
      api.matches.getPast(LIST_SIZE),
    ]);
    return { today, upcoming, past };
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !data) {
    return <ErrorMessage message={error ?? 'An error occurred'} />;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">All Matches</h1>

      <div className="space-y-8">
        <section>
          <MatchList matches={data.today} title="Today's Matches" emptyMessage="No matches today." />
        </section>

        <section>
          <MatchList matches={data.upcoming} title="Upcoming Matches" />
        </section>

        <section>
          <MatchList matches={data.past} title="Past Matches" />
        </section>
      </div>
    </div>
  );
};

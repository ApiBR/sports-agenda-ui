import React from 'react';
import { mockMatches } from '../services/mockData';
import { MatchList } from '../components/MatchList';

export const MatchesPage: React.FC = () => {
  const todayMatches = mockMatches.filter(match => {
    const matchDate = new Date(match.date);
    const today = new Date();
    return (
      matchDate.getDate() === today.getDate() &&
      matchDate.getMonth() === today.getMonth() &&
      matchDate.getFullYear() === today.getFullYear()
    );
  });

  const pastMatches = mockMatches.filter(match => match.status === 'finished');
  const upcomingMatches = mockMatches.filter(match => match.status === 'scheduled');

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">All Matches</h1>
      
      <div className="space-y-8">
        <section>
          <MatchList matches={todayMatches} title="Today's Matches" />
        </section>

        <section>
          <MatchList matches={upcomingMatches} title="Upcoming Matches" />
        </section>

        <section>
          <MatchList matches={pastMatches} title="Past Matches" />
        </section>
      </div>
    </div>
  );
};
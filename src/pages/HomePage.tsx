import React, { useState, useEffect } from 'react';
import { LeagueCarousel } from '../components/LeagueCarousel';
import { MatchList } from '../components/MatchList';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { api } from '../services/api';
import type { League, Match } from '../types';

export const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [todayMatches, setTodayMatches] = useState<Match[]>([]);
  const [pastMatches, setPastMatches] = useState<Match[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leaguesData, todayData, pastData, upcomingData] = await Promise.all([
          api.leagues.getAll(),
          api.matches.getToday(),
          api.matches.getPast(),
          api.matches.getUpcoming(),
        ]);

        setLeagues(leaguesData);
        setTodayMatches(todayData);
        setPastMatches(pastData);
        setUpcomingMatches(upcomingData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Popular Leagues</h2>
        <LeagueCarousel leagues={leagues} />
      </section>

      <section>
        <MatchList matches={todayMatches} title="Today's Matches" />
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <MatchList matches={pastMatches} title="Past Matches" />
        <MatchList matches={upcomingMatches} title="Upcoming Matches" />
      </div>
    </div>
  );
};
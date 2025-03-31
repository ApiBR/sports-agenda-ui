import { League, Team } from '../types';
import { mockLeagues, mockMatches, mockTeams } from './mockData';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function mockFetch<T>(data: T): Promise<T> {
  await delay(Math.random() * 500 + 500); // Random delay between 500-1000ms

  if (!data) {
    throw new ApiError(404, 'Resource not found');
  }

  return data;
}

export const api = {
  leagues: {
    getAll: () => mockFetch<League[]>(mockLeagues),
    getById: (id: string) => {
      const league = mockLeagues.find(l => l.id === id);
      return league ? mockFetch(league) : Promise.reject(new ApiError(404, 'League not found'));
    },
    getTeams: (id: string) => {
      const leagueExists = mockLeagues.some(l => l.id === id);
      return leagueExists ? mockFetch<Team[]>(mockTeams) : Promise.reject(new ApiError(404, 'League not found'));
    },
    getMatches: (id: string) => {
      const leagueExists = mockLeagues.some(l => l.id === id);
      if (!leagueExists) {
        return Promise.reject(new ApiError(404, 'League not found'));
      }
      const matches = mockMatches.filter(m => m.leagueId === id);
      return mockFetch(matches);
    },
  },
  
  teams: {
    getById: (id: string) => {
      const team = mockTeams.find(t => t.id === id);
      return team ? mockFetch(team) : Promise.reject(new ApiError(404, 'Team not found'));
    },
    getLeagues: (id: string) => {
      const teamExists = mockTeams.some(t => t.id === id);
      return teamExists ? mockFetch<League[]>(mockLeagues) : Promise.reject(new ApiError(404, 'Team not found'));
    },
    getMatches: (id: string) => {
      const teamExists = mockTeams.some(t => t.id === id);
      if (!teamExists) {
        return Promise.reject(new ApiError(404, 'Team not found'));
      }
      const matches = mockMatches.filter(
        m => m.homeTeam.id === id || m.awayTeam.id === id
      );
      return mockFetch(matches);
    },
  },
  
  matches: {
    getById: (id: string) => {
      const match = mockMatches.find(m => m.id === id);
      return match ? mockFetch(match) : Promise.reject(new ApiError(404, 'Match not found'));
    },
    getToday: () => {
      const today = new Date();
      const matches = mockMatches.filter(m => {
        const matchDate = new Date(m.date);
        return (
          matchDate.getDate() === today.getDate() &&
          matchDate.getMonth() === today.getMonth() &&
          matchDate.getFullYear() === today.getFullYear()
        );
      });
      return mockFetch(matches);
    },
    getPast: () => {
      const matches = mockMatches.filter(m => m.status === 'finished');
      return mockFetch(matches);
    },
    getUpcoming: () => {
      const matches = mockMatches.filter(m => m.status === 'scheduled');
      return mockFetch(matches);
    },
  },
};
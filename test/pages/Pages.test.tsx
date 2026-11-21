import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../../src/pages/HomePage';
import { LeaguePage } from '../../src/pages/LeaguePage';
import { LeaguesPage } from '../../src/pages/LeaguesPage';
import { MatchPage } from '../../src/pages/MatchPage';
import { MatchesPage } from '../../src/pages/MatchesPage';
import { TeamPage } from '../../src/pages/TeamPage';
import { TeamsPage } from '../../src/pages/TeamsPage';
import { ApiError } from '../../src/services/api';
import {
  brasileirao, finishedMatch, flamengo, libertadores, liveMatch, scheduledMatch, standings, vasco,
} from '../fixtures';

const mocks = vi.hoisted(() => ({
  api: {
    leagues: {
      getAll: vi.fn(),
      getById: vi.fn(),
      getTeams: vi.fn(),
      getMatches: vi.fn(),
      getStandings: vi.fn(),
    },
    teams: { getAll: vi.fn(), getById: vi.fn(), getLeagues: vi.fn(), getMatches: vi.fn() },
    matches: { getById: vi.fn(), getToday: vi.fn(), getPast: vi.fn(), getUpcoming: vi.fn() },
  },
}));

vi.mock('../../src/services/api', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../../src/services/api')>()),
  api: mocks.api,
}));

const api = mocks.api;

const renderAt = (path: string, pattern: string, page: React.ReactElement) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path={pattern} element={page} />
      </Routes>
    </MemoryRouter>
  );

beforeEach(() => {
  vi.resetAllMocks();
});

describe('HomePage', () => {
  it('shows leagues with upcoming games first and the match lists', async () => {
    api.leagues.getAll.mockResolvedValue([libertadores, brasileirao]);
    api.matches.getToday.mockResolvedValue([liveMatch]);
    api.matches.getPast.mockResolvedValue([finishedMatch]);
    api.matches.getUpcoming.mockResolvedValue([scheduledMatch]);

    renderAt('/', '/', <HomePage />);

    const leagueLinks = await screen.findAllByRole('link', { name: /Campeonato Brasileiro|Copa Libertadores/ });
    expect(leagueLinks[0]).toHaveAttribute('href', '/league/1');
    expect(screen.getByText('LIVE')).toBeInTheDocument();
    expect(screen.getByText('2 - 0')).toBeInTheDocument();
  });

  it('shows the API error', async () => {
    api.leagues.getAll.mockRejectedValue(new ApiError(0, 'Could not reach the Sports Agenda API.'));
    api.matches.getToday.mockResolvedValue([]);
    api.matches.getPast.mockResolvedValue([]);
    api.matches.getUpcoming.mockResolvedValue([]);

    renderAt('/', '/', <HomePage />);

    expect(await screen.findByText('Could not reach the Sports Agenda API.')).toBeInTheDocument();
  });
});

describe('LeaguePage', () => {
  it('shows the league, standings, teams and matches', async () => {
    api.leagues.getById.mockResolvedValue(brasileirao);
    api.leagues.getTeams.mockResolvedValue([flamengo, vasco]);
    api.leagues.getMatches.mockResolvedValue([finishedMatch, scheduledMatch]);
    api.leagues.getStandings.mockResolvedValue(standings);

    renderAt('/league/1', '/league/:id', <LeaguePage />);

    expect(await screen.findByRole('heading', { name: 'Campeonato Brasileiro' })).toBeInTheDocument();
    expect(api.leagues.getStandings).toHaveBeenCalledWith('1');
    expect(screen.getByText('Season 2026')).toBeInTheDocument();
    expect(screen.getByText('+2')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Flamengo/ }).length).toBeGreaterThan(1);
  });

  it('shows not found', async () => {
    api.leagues.getById.mockRejectedValue(new ApiError(404, 'League not found'));
    api.leagues.getTeams.mockResolvedValue([]);
    api.leagues.getMatches.mockResolvedValue([]);
    api.leagues.getStandings.mockResolvedValue([]);

    renderAt('/league/99', '/league/:id', <LeaguePage />);

    expect(await screen.findByText('League not found')).toBeInTheDocument();
  });
});

describe('TeamPage', () => {
  it('shows the team, its competitions and matches', async () => {
    api.teams.getById.mockResolvedValue(flamengo);
    api.teams.getLeagues.mockResolvedValue([brasileirao]);
    api.teams.getMatches.mockResolvedValue([finishedMatch, scheduledMatch]);

    renderAt('/team/1', '/team/:id', <TeamPage />);

    expect(await screen.findByRole('heading', { name: 'Flamengo' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Campeonato Brasileiro\s*Season 2026/ })).toHaveAttribute('href', '/league/1');
  });

  it('handles a team without competitions', async () => {
    api.teams.getById.mockResolvedValue(vasco);
    api.teams.getLeagues.mockResolvedValue([]);
    api.teams.getMatches.mockResolvedValue([]);

    renderAt('/team/2', '/team/:id', <TeamPage />);

    expect(await screen.findByText('No competitions found.')).toBeInTheDocument();
  });

  it('shows not found', async () => {
    api.teams.getById.mockRejectedValue(new ApiError(404, 'Team not found'));
    api.teams.getLeagues.mockResolvedValue([]);
    api.teams.getMatches.mockResolvedValue([]);

    renderAt('/team/99', '/team/:id', <TeamPage />);

    expect(await screen.findByText('Team not found')).toBeInTheDocument();
  });
});

describe('MatchPage', () => {
  it('shows the score and venue of a finished match', async () => {
    api.matches.getById.mockResolvedValue(finishedMatch);

    renderAt('/match/10', '/match/:id', <MatchPage />);

    expect(await screen.findByText('2 - 0')).toBeInTheDocument();
    expect(screen.getByText('Finished')).toBeInTheDocument();
    expect(screen.getByText('Maracanã, Rio de Janeiro')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Campeonato Brasileiro 2026' })).toHaveAttribute('href', '/league/1');
  });

  it('shows the live and scheduled states', async () => {
    api.matches.getById.mockResolvedValueOnce(liveMatch);
    const { unmount } = renderAt('/match/11', '/match/:id', <MatchPage />);
    expect(await screen.findByText('LIVE')).toBeInTheDocument();
    unmount();

    api.matches.getById.mockResolvedValueOnce(scheduledMatch);
    renderAt('/match/12', '/match/:id', <MatchPage />);
    expect(await screen.findByText('Scheduled')).toBeInTheDocument();
    expect(screen.getByText('VS')).toBeInTheDocument();
  });

  it('shows not found', async () => {
    api.matches.getById.mockRejectedValue(new ApiError(404, 'Match not found'));

    renderAt('/match/99', '/match/:id', <MatchPage />);

    expect(await screen.findByText('Match not found')).toBeInTheDocument();
  });
});

describe('list pages', () => {
  it('LeaguesPage lists leagues with their counts', async () => {
    api.leagues.getAll.mockResolvedValue([brasileirao]);

    renderAt('/leagues', '/leagues', <LeaguesPage />);

    expect(await screen.findByText('20 teams')).toBeInTheDocument();
    expect(screen.getByText('380 matches')).toBeInTheDocument();
  });

  it('LeaguesPage shows the API error', async () => {
    api.leagues.getAll.mockRejectedValue(new Error('boom'));

    renderAt('/leagues', '/leagues', <LeaguesPage />);

    expect(await screen.findByText('boom')).toBeInTheDocument();
  });

  it('TeamsPage lists teams', async () => {
    api.teams.getAll.mockResolvedValue([flamengo, vasco]);

    renderAt('/teams', '/teams', <TeamsPage />);

    expect(await screen.findByRole('link', { name: /Vasco da Gama/ })).toHaveAttribute('href', '/team/2');
  });

  it('TeamsPage shows the API error', async () => {
    api.teams.getAll.mockRejectedValue(new Error('boom'));

    renderAt('/teams', '/teams', <TeamsPage />);

    expect(await screen.findByText('boom')).toBeInTheDocument();
  });

  it('MatchesPage shows today, upcoming and past matches', async () => {
    api.matches.getToday.mockResolvedValue([]);
    api.matches.getUpcoming.mockResolvedValue([scheduledMatch]);
    api.matches.getPast.mockResolvedValue([finishedMatch]);

    renderAt('/matches', '/matches', <MatchesPage />);

    expect(await screen.findByText('No matches today.')).toBeInTheDocument();
    expect(api.matches.getUpcoming).toHaveBeenCalledWith(30);
    expect(screen.getByText('2 - 0')).toBeInTheDocument();
  });

  it('MatchesPage shows the API error', async () => {
    api.matches.getToday.mockRejectedValue(new Error('boom'));
    api.matches.getUpcoming.mockResolvedValue([]);
    api.matches.getPast.mockResolvedValue([]);

    renderAt('/matches', '/matches', <MatchesPage />);

    expect(await screen.findByText('boom')).toBeInTheDocument();
  });
});

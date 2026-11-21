import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MatchList } from '../../src/components/MatchList';
import { LeagueStandings } from '../../src/components/LeagueStandings';
import { TeamGrid } from '../../src/components/TeamGrid';
import { TeamLogo } from '../../src/components/TeamLogo';
import { ErrorMessage } from '../../src/components/ErrorMessage';
import { finishedMatch, flamengo, liveMatch, scheduledMatch, standings, vasco } from '../fixtures';

const inRouter = (ui: React.ReactElement) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('TeamLogo', () => {
  it('renders the crest', () => {
    render(<TeamLogo team={flamengo} />);
    expect(screen.getByRole('img', { name: 'Flamengo' })).toHaveAttribute('src', flamengo.logo);
  });

  it('falls back to a shield without a logo', () => {
    render(<TeamLogo team={vasco} />);
    expect(screen.getByRole('img', { name: 'Vasco da Gama' }).tagName).toBe('DIV');
  });

  it('falls back to a shield when the crest fails to load', () => {
    render(<TeamLogo team={flamengo} />);
    fireEvent.error(screen.getByRole('img', { name: 'Flamengo' }));
    expect(screen.getByRole('img', { name: 'Flamengo' }).tagName).toBe('DIV');
  });
});

describe('MatchList', () => {
  it('shows scores, the live badge and kick-off times', () => {
    inRouter(<MatchList matches={[finishedMatch, liveMatch, scheduledMatch]} title="Matches" />);

    const links = screen.getAllByRole('link');
    expect(links.map((link) => link.getAttribute('href'))).toEqual(['/match/10', '/match/11', '/match/12']);
    expect(within(links[0]).getByText('2 - 0')).toBeInTheDocument();
    expect(within(links[1]).getByText('LIVE')).toBeInTheDocument();
    expect(within(links[2]).queryByText(/ - /)).not.toBeInTheDocument();
    expect(within(links[2]).getByText('Campeonato Brasileiro')).toBeInTheDocument();
  });

  it('shows the empty message', () => {
    inRouter(<MatchList matches={[]} title="Today" emptyMessage="No matches today." />);
    expect(screen.getByText('No matches today.')).toBeInTheDocument();
  });
});

describe('LeagueStandings', () => {
  it('renders the table in the API order', () => {
    inRouter(<LeagueStandings standings={standings} />);

    const rows = screen.getAllByRole('row').slice(1);
    expect(rows).toHaveLength(2);
    expect(within(rows[0]).getByText('Flamengo')).toBeInTheDocument();
    expect(within(rows[0]).getByText('+2')).toBeInTheDocument();
    expect(within(rows[1]).getByText('-2')).toBeInTheDocument();
    expect(screen.getByText('Win: 3 pts')).toBeInTheDocument();
  });

  it('explains an empty table', () => {
    inRouter(<LeagueStandings standings={[]} />);
    expect(screen.getByText('No finished matches yet.')).toBeInTheDocument();
  });
});

describe('TeamGrid and ErrorMessage', () => {
  it('links every team', () => {
    inRouter(<TeamGrid teams={[flamengo, vasco]} />);
    expect(screen.getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual(['/team/1', '/team/2']);
  });

  it('shows the error', () => {
    render(<ErrorMessage message="League not found" />);
    expect(screen.getByText('League not found')).toBeInTheDocument();
  });
});

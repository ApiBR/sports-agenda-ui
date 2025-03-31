import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Header } from '../../src/components/Header';

// Helper to render Header with a given initial route.
const renderWithRouter = (initialRoute: string) => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="*" element={<Header />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Header component', () => {
  it('renders the main header content', () => {
    renderWithRouter('/');
    expect(screen.getByRole('link', { name: /Sports Agenda/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Football/i })).toBeInTheDocument();
  });

  it('renders secondary navigation when in football section (root path)', () => {
    renderWithRouter('/');
    // Use role-based queries to target links in the secondary navigation.
    expect(screen.getByRole('link', { name: /^Home$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Leagues$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Teams$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Matches$/i })).toBeInTheDocument();
  });

  it('renders secondary navigation when in football section (e.g., /teams)', () => {
    renderWithRouter('/teams');
    expect(screen.getByRole('link', { name: /^Home$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Leagues$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Teams$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Matches$/i })).toBeInTheDocument();
  });

  it('does not render secondary navigation when not in a football section', () => {
    // Use a route that doesn't match the football section regex.
    renderWithRouter('/basketball');
    expect(screen.getByRole('link', { name: /Sports Agenda/i })).toBeInTheDocument();
    // Secondary navigation should not be present.
    expect(screen.queryByRole('link', { name: /^Home$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /^Leagues$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /^Teams$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /^Matches$/i })).not.toBeInTheDocument();
  });

  it('applies active link class to the current route', () => {
    // Test active styling on the Home link when on '/'
    renderWithRouter('/');
    const homeLink = screen.getByRole('link', { name: /^Home$/i });
    expect(homeLink.className).toContain('bg-emerald-700');

    // Test active styling on the Leagues link when on '/leagues'
    renderWithRouter('/leagues');
    const leaguesLink = screen.getByRole('link', { name: /^Leagues$/i });
    expect(leaguesLink.className).toContain('bg-emerald-700');
  });
});
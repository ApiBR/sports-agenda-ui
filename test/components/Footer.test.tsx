import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from '../../src/components/Footer';

describe('Footer component', () => {
  it('renders correctly', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2025 Sports Agenda - API BR/i)).toBeInTheDocument();
  });

  it('contains the author link', () => {
    render(<Footer />);
    const linkElement = screen.getByRole('link', { name: /Guilherme Branco Stracini/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://guibranco.github.io/?utm_campaign=project&utm_media=sports+agenda&utm_source=apibr.com');
  });
});

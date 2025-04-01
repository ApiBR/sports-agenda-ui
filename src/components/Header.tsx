import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, CircleDot } from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();
  const isFootballSection = location.pathname === '/' || location.pathname.match(/\/(leagues|teams|matches|league|team|match)/);

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-emerald-700' : '';
  };

  return (
    <header className="text-white shadow-lg">
      {/* Main header */}
      <div style={{ backgroundColor: 'rgb(0, 77, 64)' }}>
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
              <Trophy className="w-8 h-8" />
              <span>Sports Agenda</span>
            </Link>
            <Link 
              to="/" 
              className={`hover:text-emerald-200 transition-colors flex items-center space-x-2 ${isFootballSection ? 'text-emerald-200' : ''}`}
            >
              <CircleDot className="w-5 h-5" />
              <span>Football</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Football-specific secondary navigation */}
      {isFootballSection && (
        <div className="bg-emerald-800">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-center">
              <Link 
                to="/" 
                className={`px-6 py-3 text-sm font-medium hover:bg-emerald-700 transition-colors ${isActive('/')}`}
              >
                Home
              </Link>
              <Link 
                to="/leagues" 
                className={`px-6 py-3 text-sm font-medium hover:bg-emerald-700 transition-colors ${isActive('/leagues')}`}
              >
                Leagues
              </Link>
              <Link 
                to="/teams" 
                className={`px-6 py-3 text-sm font-medium hover:bg-emerald-700 transition-colors ${isActive('/teams')}`}
              >
                Teams
              </Link>
              <Link 
                to="/matches" 
                className={`px-6 py-3 text-sm font-medium hover:bg-emerald-700 transition-colors ${isActive('/matches')}`}
              >
                Matches
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
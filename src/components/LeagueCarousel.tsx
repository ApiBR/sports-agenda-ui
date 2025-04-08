import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import type { League } from '../types';

interface LeagueCarouselProps {
  leagues: League[];
}

export const LeagueCarousel: React.FC<LeagueCarouselProps> = ({ leagues }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg"
      >
        <ChevronLeft className="w-6 h-6 text-emerald-600" />
      </button>
      
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 py-4 px-8 scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {leagues.map((league) => (
          <Link
            key={league.id}
            to={`/league/${league.id}`}
            className="shrink-0 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 w-64"
          >
            <div className="flex items-center space-x-3">
              {league.logo ? (
                <img src={league.logo} alt={league.name} className="w-12 h-12 object-contain" />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-gray-400" />
                </div>
              )}
              <div>
                <h3 className="font-semibold text-gray-800">{league.name}</h3>
                <p className="text-sm text-gray-500">{league.year}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg"
      >
        <ChevronRight className="w-6 h-6 text-emerald-600" />
      </button>
    </div>
  );
};
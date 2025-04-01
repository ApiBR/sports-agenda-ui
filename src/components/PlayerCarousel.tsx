import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Player } from '../types';

interface PlayerCarouselProps {
  players: Player[];
}

export const PlayerCarousel: React.FC<PlayerCarouselProps> = ({ players }) => {
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
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6 text-emerald-600" />
      </button>
      
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-6 py-6 px-8 scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {players.map((player) => (
          <div
            key={player.id}
            className="flex-none w-48 bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-200"
          >
            <img
              src={player.image}
              alt={player.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{player.name}</h3>
                <span className="text-2xl font-bold text-emerald-600">#{player.number}</span>
              </div>
              <p className="text-sm text-gray-600">{player.position}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6 text-emerald-600" />
      </button>
    </div>
  );
};
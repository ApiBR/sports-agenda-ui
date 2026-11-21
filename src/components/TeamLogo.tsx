import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import type { Team } from '../types';

interface TeamLogoProps {
  team: Pick<Team, 'name' | 'logo'>;
  className?: string;
}

/** The team's crest, or a neutral shield when there is none or it fails to load. */
export const TeamLogo: React.FC<TeamLogoProps> = ({ team, className = 'w-8 h-8' }) => {
  const [failed, setFailed] = useState(false);

  if (!team.logo || failed) {
    return (
      <div
        className={`${className} flex items-center justify-center text-gray-400`}
        role="img"
        aria-label={team.name}
      >
        <Shield className="w-3/4 h-3/4" />
      </div>
    );
  }

  return (
    <img
      src={team.logo}
      alt={team.name}
      loading="lazy"
      className={`${className} object-contain`}
      onError={() => setFailed(true)}
    />
  );
};

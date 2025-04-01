import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="text-white py-8 mt-auto" style={{ backgroundColor: 'rgb(0, 77, 64)' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <p className="text-center">
            © 2025 Sports Agenda - API BR. All Rights Reserved. Built with ❤️ by{' '}
            <a
              href="https://guibranco.github.io/?utm_campaign=project&utm_media=sports+agenda&utm_source=apibr.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'rgb(255, 204, 0)' }}
              className="hover:text-yellow-300 transition-colors"
            >
              Guilherme Branco Stracini
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
import React, { useState } from 'react';
import { JoyGlobe } from './components/JoyGlobe';
import { AlbumOverlay } from './components/AlbumOverlay';
import { JoyAlbum } from './types';
import { MOCK_ALBUMS } from './constants';

const App: React.FC = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<JoyAlbum | null>(null);

  const handleAlbumSelect = (album: JoyAlbum) => {
    setSelectedAlbum(album);
  };

  const handleCloseOverlay = () => {
    setSelectedAlbum(null);
  };

  return (
    <div className="w-full h-screen bg-slate-950 overflow-hidden relative font-sans text-white">
      
      {/* --- Star Background --- */}
      <style>{`
        /* Dynamic Star Field */
        .stars-container {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            overflow: hidden;
            pointer-events: none;
            background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
        }
        .star {
            position: absolute;
            background: white;
            border-radius: 50%;
            animation: twinkle 4s infinite ease-in-out;
        }
        @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
        }
        /* Shooting Star */
        .shooting-star {
            position: absolute;
            top: 50%;
            left: 50%;
            height: 2px;
            background: linear-gradient(-45deg, rgba(255,255,255,1), rgba(0,0,255,0));
            border-radius: 999px;
            filter: drop-shadow(0 0 6px rgba(105, 155, 255, 1));
            animation: tail 3s ease-in-out infinite, shooting 3s ease-in-out infinite;
        }
        .shooting-star::before {
            content: '';
            position: absolute;
            top: calc(50% - 1px);
            right: 0;
            height: 2px;
            background: linear-gradient(-45deg, rgba(0,0,255,0), rgba(255,255,255,1), rgba(0,0,255,0));
            transform: translateX(50%) rotateZ(45deg);
            border-radius: 100%;
            animation: shining 3s ease-in-out infinite;
        }
        @keyframes tail {
            0% { width: 0; }
            30% { width: 100px; }
            100% { width: 0; }
        }
        @keyframes shooting {
            0% { transform: translateX(0) translateY(0) rotate(35deg); }
            100% { transform: translateX(800px) translateY(800px) rotate(35deg); }
        }
        @keyframes shining {
            0% { width: 0; }
            50% { width: 30px; }
            100% { width: 0; }
        }
      `}</style>
      
      <div className="stars-container">
          {/* Static Stars via Array generation */}
          {Array.from({ length: 100 }).map((_, i) => (
              <div 
                key={i} 
                className="star" 
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 3 + 1}px`,
                    height: `${Math.random() * 3 + 1}px`,
                    animationDelay: `${Math.random() * 5}s`,
                    opacity: Math.random() * 0.7 + 0.3
                }} 
              />
          ))}
          {/* Shooting Stars */}
          <div className="shooting-star" style={{ top: '20%', left: '10%', animationDelay: '0s' }}></div>
          <div className="shooting-star" style={{ top: '10%', left: '60%', animationDelay: '5s' }}></div>
          <div className="shooting-star" style={{ top: '70%', left: '20%', animationDelay: '8s' }}></div>
      </div>

      {/* Header */}
      <header className="absolute top-4 left-0 right-0 z-10 flex justify-between items-center px-6 pointer-events-none">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-lg font-serif italic">
            <span className="text-amber-400">Uncommon</span> <span className="text-blue-500 not-italic">Joy</span>
          </h1>
          <p className="text-xs text-amber-200/70">Staff Collage 2024</p>
        </div>
        
        {/* Eagle Logo */}
        <div className="pointer-events-auto">
            <div className="w-14 h-14 rounded-full bg-amber-400 p-1 shadow-lg border-2 border-blue-900 flex items-center justify-center">
              <img 
                 src="https://cdn-icons-png.flaticon.com/512/2826/2826555.png" 
                 alt="Eagle Logo" 
                 className="w-full h-full object-contain drop-shadow-md"
              />
            </div>
        </div>
      </header>

      {/* Main 3D Globe */}
      <main className="w-full h-full relative z-0">
        <JoyGlobe 
          albums={MOCK_ALBUMS} 
          onAlbumSelect={handleAlbumSelect} 
          isPaused={!!selectedAlbum} 
        />
      </main>

      {/* Footer / Instructions */}
      {!selectedAlbum && (
        <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none z-10">
           <p className="text-amber-100/30 text-xs uppercase tracking-widest animate-pulse">
             Tap a moment to expand
           </p>
        </div>
      )}

      {/* Full Screen Overlay */}
      <AlbumOverlay 
        album={selectedAlbum} 
        onClose={handleCloseOverlay} 
      />

    </div>
  );
};

export default App;

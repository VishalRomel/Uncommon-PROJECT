import React, { useRef, useEffect, useState, useMemo } from 'react';
import { JoyAlbum } from '../types';

interface JoyGlobeProps {
  albums: JoyAlbum[];
  onAlbumSelect: (album: JoyAlbum) => void;
  isPaused: boolean;
}

// Math helper to distribute points on a sphere
const getSpherePosition = (index: number, total: number) => {
  const phi = Math.acos(1 - 2 * (index + 0.5) / total);
  const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 0.5);
  
  const x = Math.cos(theta) * Math.sin(phi);
  const y = Math.sin(theta) * Math.sin(phi);
  const z = Math.cos(phi);
  
  return { x, y, z };
};

export const JoyGlobe: React.FC<JoyGlobeProps> = ({ albums, onAlbumSelect, isPaused }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for rotation (longitude angle in radians)
  const [rotation, setRotation] = useState(0);
  
  const requestRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number | undefined>(undefined);
  
  // Interaction Refs
  const dragStartRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const lastMouseXRef = useRef(0);
  const interactionTargetRef = useRef<JoyAlbum | null>(null);

  // Configuration
  const TILT_DEG = 12; // The tilt of the earth's axis
  const TILT_RAD = TILT_DEG * (Math.PI / 180);
  const ORBIT_RADIUS = 300; 
  const EARTH_RADIUS = 100; // Matches CSS width/2
  const PERSPECTIVE = 1000;

  // Calculate initial sphere positions once
  const positions = useMemo(() => {
    return albums.map((album, i) => ({
      ...album,
      basePos: getSpherePosition(i, albums.length)
    }));
  }, [albums]);

  const animate = (time: number) => {
    if (lastTimeRef.current !== undefined && !isPaused && !isDraggingRef.current) {
      // Auto-rotation speed
      const delta = 0.008; 
      setRotation(prev => prev + delta);
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPaused]);

  // -- Interaction Handlers --

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    lastMouseXRef.current = e.clientX;
    if(containerRef.current) containerRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseXRef.current;
    
    // Sync Drag
    setRotation(prev => prev + (dx * -0.005));
    lastMouseXRef.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    if(containerRef.current) containerRef.current.releasePointerCapture(e.pointerId);
    
    // Check for click (minimal movement)
    const moveX = Math.abs(e.clientX - dragStartRef.current.x);
    const moveY = Math.abs(e.clientY - dragStartRef.current.y);
    
    if (moveX < 10 && moveY < 10 && interactionTargetRef.current) {
      onAlbumSelect(interactionTargetRef.current);
    }
    
    // Reset target
    interactionTargetRef.current = null;
  };

  // Text Wrapping Logic
  // Using single repetition to allow more space between characters given the large font size
  const textString = "UNCOMMON EXCELLENCE GIRLS  ★  ";
  const textChars = textString.split('');
  const charStep = 360 / textChars.length;

  // Visual Parameters based on rotation state
  const rotationDeg = rotation * (180 / Math.PI);
  // Earth texture moves opposite to rotation to simulate spin
  const earthBgPos = -(rotationDeg / 360) * 100; 
  // Clouds move slightly faster/different for parallax
  const cloudBgPos = -(rotationDeg / 360) * 120;

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center overflow-hidden touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="relative w-full h-full flex items-center justify-center perspective-container">
        <style>{`
          .tilted-axis-group {
             transform: rotateZ(${TILT_DEG}deg);
             width: 100%; height: 100%;
             display: flex; justify-content: center; align-items: center;
             transform-style: preserve-3d;
             pointer-events: none;
          }
          .earth-3d {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            /* High res realistic earth day map */
            background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Solarsystemscope_texture_8k_earth_daymap.jpg/600px-Solarsystemscope_texture_8k_earth_daymap.jpg');
            background-size: auto 100%; 
            /* Realistic Atmosphere Glow + Night Shadow */
            box-shadow: 
                inset 30px 0 60px 10px rgba(0, 0, 0, 0.9), /* Night side shadow */
                0 0 25px 5px rgba(100, 180, 255, 0.4); /* Atmosphere Glow */
            position: absolute;
            z-index: 50; 
            transform-style: preserve-3d;
            background-repeat: repeat-x;
            will-change: background-position;
          }
          /* Cloud Layer */
          .earth-clouds {
            position: absolute;
            width: 202px;
            height: 202px;
            border-radius: 50%;
            z-index: 51;
            /* Simple cloud-like pattern texture */
            background: url('https://www.transparenttextures.com/patterns/stardust.png'); 
            opacity: 0.4;
            transform-style: preserve-3d;
            pointer-events: none;
            box-shadow: -10px -10px 15px rgba(255,255,255,0.1) inset;
          }
          .text-ring-rotator {
             position: absolute;
             transform-style: preserve-3d;
             z-index: 55;
          }
        `}</style>

        {/* 1. The Tilted Group (Earth + Text) */}
        <div className="tilted-axis-group">
            
            {/* The Rotating Earth */}
            <div 
              className="earth-3d" 
              style={{ backgroundPosition: `${earthBgPos}% 0` }}
            ></div>

            {/* Cloud Layer (adds realism) */}
            <div 
                className="earth-clouds"
                style={{ 
                    backgroundPosition: `${cloudBgPos}% 0`,
                    transform: `rotateY(${rotationDeg * 1.1}deg)` 
                }}
            ></div>

            {/* The Rotating Text Ring */}
            <div 
              className="text-ring-rotator"
              style={{ transform: `rotateY(${rotationDeg}deg)` }}
            >
              {textChars.map((char, i) => (
                <span
                  key={i}
                  style={{
                    position: 'absolute',
                    left: 0, top: 0,
                    // INCREASED RADIUS to 165px to prevent overlap
                    transform: `rotateY(${i * charStep}deg) translateZ(165px)`,
                    backfaceVisibility: 'hidden',
                    // COLOR: YELLOW/GOLD
                    color: '#fbbf24', 
                    fontSize: '32px', // BIGGER FONT
                    fontFamily: 'serif',
                    fontWeight: '900',
                    // Darker shadow to make yellow pop
                    textShadow: '0 1px 3px rgba(0,0,0,1), 0 0 5px rgba(245, 158, 11, 0.5)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
        </div>

        {/* 2. The Satellites (Images) - Manually projected to match the tilt */}
        {positions.map((item) => {
          // A. Rotate point around Y Axis (Spin)
          let { x, y, z } = item.basePos;
          const cosR = Math.cos(rotation);
          const sinR = Math.sin(rotation);
          
          const x1 = x * cosR - z * sinR;
          const y1 = y;
          const z1 = z * cosR + x * sinR;

          // B. Rotate point around Z Axis (Tilt)
          const cosT = Math.cos(TILT_RAD);
          const sinT = Math.sin(TILT_RAD);
          
          const x2 = x1 * cosT - y1 * sinT;
          const y2 = x1 * sinT + y1 * cosT;
          const z2 = z1; // Z-depth relative to screen plane

          // C. Projection for Image
          const scale = PERSPECTIVE / (PERSPECTIVE - (z2 * ORBIT_RADIUS));
          const screenX = x2 * ORBIT_RADIUS * scale;
          const screenY = y2 * ORBIT_RADIUS * scale;

          // D. Projection for Surface Anchor (The point on earth directly below the image)
          const scaleSurf = PERSPECTIVE / (PERSPECTIVE - (z2 * EARTH_RADIUS));
          const surfX = x2 * EARTH_RADIUS * scaleSurf;
          const surfY = y2 * EARTH_RADIUS * scaleSurf;

          // E. Calculate Line Properties
          const dx = screenX - surfX;
          const dy = screenY - surfY;
          const lineLength = Math.sqrt(dx * dx + dy * dy);
          const lineAngle = Math.atan2(dy, dx) * (180 / Math.PI);
          
          // F. Visibility / Depth Logic
          const isBehind = z2 < -0.1; 
          const opacity = isBehind ? Math.max(0, 1 + (z2 * 2)) : 1; 
          const zIndex = Math.floor(50 + (z2 * 40)); 

          // G. Dynamic Sizing based on content
          const isLargeAlbum = item.images.length >= 3;
          const isMediumAlbum = item.images.length === 2;
          const baseSizeClass = isLargeAlbum ? "w-24 h-24 md:w-32 md:h-32" : isMediumAlbum ? "w-16 h-16 md:w-20 md:h-20" : "w-12 h-12 md:w-16 md:h-16";
          
          // H. Theme Color Logic (Blue or Gold based on Category)
          const isBlueTheme = item.category === 'classroom' || item.category === 'shoutout';
          const borderColorClass = isBlueTheme 
             ? 'bg-gradient-to-br from-blue-600 to-blue-900' // Blue Theme
             : 'bg-gradient-to-br from-amber-400 to-yellow-600'; // Gold Theme

          return (
            <React.Fragment key={item.id}>
              {/* Neon Tether Line */}
              {opacity > 0.05 && (
                <div 
                  className="absolute top-1/2 left-1/2 origin-left pointer-events-none"
                  style={{
                    width: `${lineLength}px`,
                    height: '2px',
                    marginTop: '-1px', // Center vertically
                    backgroundColor: isBlueTheme ? 'rgba(59, 130, 246, 0.6)' : 'rgba(251, 191, 36, 0.6)', 
                    boxShadow: isBlueTheme ? '0 0 8px rgba(59, 130, 246, 0.8)' : '0 0 8px rgba(245, 158, 11, 0.8)',
                    transform: `translate3d(${surfX}px, ${surfY}px, 0) rotate(${lineAngle}deg)`,
                    zIndex: zIndex - 1, 
                    opacity: opacity * 0.6,
                    display: z2 < -0.4 ? 'none' : 'block',
                  }}
                />
              )}

              {/* The Image Itself */}
              <div
                onPointerDown={() => {
                  interactionTargetRef.current = item;
                }}
                style={{
                  transform: `translate3d(${screenX}px, ${screenY}px, 0) scale(${scale})`,
                  zIndex: zIndex,
                  opacity: opacity,
                  display: z2 < -0.4 ? 'none' : 'flex',
                }}
                className="absolute cursor-pointer will-change-transform flex-col items-center justify-center pointer-events-auto"
              >
                <div className="relative group transition-transform duration-300 hover:scale-110">
                  {/* Themed Gradient Border - No White Border */}
                  <div className={`p-1.5 rounded-lg shadow-2xl overflow-hidden ${borderColorClass}`}>
                    <img
                      src={item.images[0] || 'https://via.placeholder.com/150/1e3a8a/FFFFFF?text=Joy'}
                      alt=""
                      className={`${baseSizeClass} object-cover rounded pointer-events-none`}
                      draggable={false}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150/1e3a8a/FFFFFF?text=Joy';
                      }}
                    />
                  </div>
                  
                  {/* Hover Label */}
                  {scale > 0.8 && !isBehind && (
                     <div className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] font-bold rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border shadow-lg ${isBlueTheme ? 'bg-amber-400 text-blue-900 border-blue-900' : 'bg-blue-900 text-amber-300 border-amber-400'}`}>
                       {item.author}
                     </div>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

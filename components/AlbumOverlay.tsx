import React, { useEffect, useState } from 'react';
import { JoyAlbum } from '../types';
import { X, MessageCircle, User, Clock, ChevronRight, ChevronLeft, ImageOff } from 'lucide-react';

interface AlbumOverlayProps {
  album: JoyAlbum | null;
  onClose: () => void;
}

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1000&auto=format&fit=crop";

export const AlbumOverlay: React.FC<AlbumOverlayProps> = ({ album, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle entry animation
  useEffect(() => {
    if (album) {
      setIsVisible(true);
      setCurrentImageIndex(0);
    } else {
      setIsVisible(false);
    }
  }, [album]);

  const handleClose = () => {
    setIsVisible(false);
    // Allow animation to finish before actually unmounting/nulling in parent
    setTimeout(onClose, 300);
  };

  // Safe access to images array
  const images = (album?.images && album.images.length > 0) ? album.images : [DEFAULT_IMAGE];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!album && !isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[1000] flex items-center justify-center p-4 transition-all duration-300 ease-out ${
        isVisible ? 'bg-blue-950/80 backdrop-blur-md opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0 pointer-events-none'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`relative w-full max-w-lg bg-zinc-900 border border-amber-500/50 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 ease-out ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-0 translate-y-20'
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking card
      >
        {/* Header / Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-start bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center space-x-2">
            <img 
              src={album?.avatarUrl || "https://ui-avatars.com/api/?name=Joy"} 
              alt={album?.author} 
              className="w-8 h-8 rounded-full border border-amber-400 bg-zinc-700"
            />
            <div className="text-white text-sm font-medium drop-shadow-md">
              <span className="block leading-tight text-amber-50">{album?.author || 'Anonymous Joy'}</span>
              <span className="text-xs opacity-80 font-light flex items-center gap-1 text-blue-200">
                <Clock size={10} /> {album?.timestamp || 'Recently'}
              </span>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Image Display */}
        <div className="relative aspect-[4/3] bg-black group">
            <img 
              src={images[currentImageIndex]} 
              alt="Joy Moment" 
              className="w-full h-full object-cover animate-fade-in"
              onError={(e) => {
                // If the specific image fails, fall back to default
                (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
              }}
            />
          
          {/* Navigation Arrows if multiple images */}
          {images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight size={24} />
              </button>
              
              {/* Dots indicator */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-1.5">
                {images.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex ? 'w-4 bg-amber-400' : 'w-1.5 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 bg-zinc-900">
          {album?.message ? (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                {/* Changed Icon color from red-400 to blue-400 (swapped) */}
                <MessageCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <p className="text-zinc-100 text-lg font-light leading-relaxed">
                  "{album.message}"
                </p>
              </div>
            </div>
          ) : (
             <p className="text-zinc-500 italic text-center">No message attached, just pure joy!</p>
          )}

          {/* Additional details or related mini-thumbnails could go here */}
          <div className="mt-6 flex justify-between items-center border-t border-zinc-800 pt-4">
             <div className="text-xs text-amber-500 uppercase tracking-widest font-bold">
               Uncommon Joy
             </div>
             <div className="flex items-center gap-1 text-xs text-zinc-400">
                <span>{album?.category || 'General'}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

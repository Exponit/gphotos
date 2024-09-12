import React, { useEffect } from 'react';
import { setSize } from '@/services/gphoto.service';

interface LightboxProps {
  src: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const Lightbox: React.FC<LightboxProps> = ({ src, onClose, onPrev, onNext, hasPrev, hasNext }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft' && hasPrev) {
        onPrev();
      } else if (event.key === 'ArrowRight' && hasNext) {
        onNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <div 
      className="fixed inset-0 bg-black flex items-center justify-center z-50" 
      onClick={onClose}
    >
      {hasPrev && (
        <button 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl focus:outline-none"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          &#8592;
        </button>
      )}
      <div 
        className="max-w-4xl max-h-4xl" 
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={setSize(src, 1200, 1200)} 
          alt="Enlarged image" 
          className="max-w-full max-h-[90vh] object-contain"
        />
      </div>
      {hasNext && (
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl focus:outline-none"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          &#8594;
        </button>
      )}
    </div>
  );
};

export default Lightbox;
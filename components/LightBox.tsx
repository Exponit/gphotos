import React, { useEffect } from 'react';
import { setSize } from '@/services/gphoto.service';
import { useSwipeable } from 'react-swipeable';

interface LightboxProps {
  src: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const Lightbox: React.FC<LightboxProps> = ({ src, onClose, onPrev, onNext, hasPrev, hasNext }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => hasNext && onNext(),
    onSwipedRight: () => hasPrev && onPrev(),
    trackMouse: true
  });

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
      <div {...handlers} className="relative max-w-3xl w-full h-full flex items-center justify-center">
        <img 
          src={setSize(src, 1200, 1200)} 
          alt="Enlarged image" 
          className="max-h-full max-w-full object-contain"
        />
        {hasPrev && (
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl focus:outline-none hidden sm:block"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
          >
            &#8592;
          </button>
        )}
        {hasNext && (
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl focus:outline-none hidden sm:block"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
          >
            &#8594;
          </button>
        )}
      </div>
    </div>
  );
};

export default Lightbox;
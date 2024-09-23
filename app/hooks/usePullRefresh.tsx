"use client";

import { useState, useEffect } from 'react';

const THRESHOLD = 100; // Pull distance required to trigger refresh

export function usePullToRefresh(onRefresh: () => void) {
  const [startY, setStartY] = useState(0);
  const [pullDistance, setPullDistance] = useState(0);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        setStartY(e.touches[0].clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (startY > 0) {
        const currentY = e.touches[0].clientY;
        const distance = currentY - startY;
        if (distance > 0) {
          setPullDistance(distance);
        }
      }
    };

    const handleTouchEnd = () => {
      if (pullDistance > THRESHOLD) {
        onRefresh();
      }
      setStartY(0);
      setPullDistance(0);
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [startY, pullDistance, onRefresh]);

  return pullDistance;
}
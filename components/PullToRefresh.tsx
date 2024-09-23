"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePullToRefresh } from '@/app/hooks/usePullRefresh';
import Loading from './Loading';

interface PullToRefreshProps {
  children: React.ReactNode;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({ children }) => {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    // Simulate a delay to show the loading state
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000); // Adjust this delay as needed
  };

  const pullDistance = usePullToRefresh(handleRefresh);

  if (isRefreshing) {
    return <Loading />;
  }

  return (
    <div style={{ transform: `translateY(${Math.min(pullDistance / 2, 50)}px)` }}>
      {pullDistance > 50 && (
        <div className="text-center text-gray-500 py-2">
          Release to refresh
        </div>
      )}
      {children}
    </div>
  );
};

export default PullToRefresh;
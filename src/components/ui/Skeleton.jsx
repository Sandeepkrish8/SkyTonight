import React from 'react';

export default function Skeleton({ className = 'h-24 w-full' }) {
  return (
    <div className={`bg-white/5 animate-pulse rounded-2xl ${className}`}></div>
  );
}

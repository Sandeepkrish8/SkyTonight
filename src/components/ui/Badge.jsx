import React from 'react';

export function Badge({ children, variant = 'visible' }) {
  const styles = variant === 'visible'
    ? 'bg-[#4ADE80]/10 text-[#4ADE80] border-[#4ADE80]/30'
    : 'bg-white/10 text-muted border-white/10';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles}`}>
      {children}
    </span>
  );
}

export function Loader() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-8 h-8 border-2 border-t-[#7C5CFF] border-white/10 rounded-full animate-spin"></div>
    </div>
  );
}

export function Skeleton({ className = 'h-24 w-full' }) {
  return (
    <div className={`bg-white/5 animate-pulse rounded-2xl ${className}`}></div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="p-6 text-center rounded-2xl bg-red-500/10 border border-red-500/20 my-4">
      <p className="text-sm text-red-300 mb-3">{message || 'Something went wrong.'}</p>
      {onRetry && (
        <button onClick={onRetry} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-500/20 text-red-200 hover:bg-red-500/30 transition">
          Try Again
        </button>
      )}
    </div>
  );
}

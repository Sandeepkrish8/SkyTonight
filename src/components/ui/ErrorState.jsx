import React from 'react';

export default function ErrorState({ message, onRetry }) {
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

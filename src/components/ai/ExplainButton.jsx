import React from 'react';

export default function ExplainButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full mt-3 py-2 px-3 rounded-xl bg-[#7C5CFF]/10 hover:bg-[#7C5CFF]/20 text-[#7C5CFF] border border-[#7C5CFF]/30 font-medium text-xs transition flex items-center justify-center space-x-1.5"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      <span>Tell me more</span>
    </button>
  );
}

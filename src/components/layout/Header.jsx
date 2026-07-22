import React from 'react';
import Container from './Container';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-base/80 border-b border-white/10 transition-all">
      <Container className="py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7C5CFF] to-[#22D3EE] flex items-center justify-center shadow-lg shadow-[#7C5CFF]/20">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </div>
          <span className="font-display font-bold text-2xl tracking-tight bg-gradient-to-r from-[#7C5CFF] via-[#a78bfa] to-[#22D3EE] bg-clip-text text-transparent">
            SkyTonight
          </span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted font-medium bg-elevated/60 px-3 py-1.5 rounded-full border border-white/5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Live Stargazing Guide</span>
        </div>
      </Container>
    </header>
  );
}

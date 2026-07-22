import React from 'react';

export default function SkyGrid({ children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
      {children}
    </div>
  );
}

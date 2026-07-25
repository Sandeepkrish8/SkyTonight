import React from 'react';

export default function EquipmentBadge({ objectName }) {
  let label = "👁️ Naked Eye";
  let color = "bg-green-500/10 text-green-400 border-green-500/20";
  
  const lowerName = objectName.toLowerCase();
  
  if (lowerName.includes('andromeda') || lowerName.includes('nebula') || lowerName.includes('galaxy') || lowerName.includes('uranus') || lowerName.includes('neptune')) {
    label = "🔭 Telescope Required";
    color = "bg-purple-500/10 text-purple-400 border-purple-500/20";
  } else if (lowerName.includes('comet') || lowerName.includes('cluster')) {
    label = "🔭 Binoculars Recommended";
    color = "bg-blue-500/10 text-blue-400 border-blue-500/20";
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${color} shadow-lg`}>
      {label}
    </span>
  );
}

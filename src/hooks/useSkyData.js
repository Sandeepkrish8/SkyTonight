import { useState } from 'react';

export function useSkyData(lat, lon) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [planets, setPlanets] = useState([]);
  const [moon, setMoon] = useState(null);
  const [times, setTimes] = useState(null);

  return { loading, error, planets, moon, times };
}

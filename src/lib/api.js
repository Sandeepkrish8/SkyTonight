import * as Astronomy from 'astronomy-engine';

export function azimuthToDirection(az) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const normalized = ((az % 360) + 360) % 360;
  const index = Math.round(normalized / 45) % 8;
  return directions[index];
}

/**
 * Fetch visible planets from api.visibleplanets.dev/v3 with Astronomy Engine fallback
 */
export async function visiblePlanets(lat, lon) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const url = `https://api.visibleplanets.dev/v3?latitude=${lat}&longitude=${lon}`;
    
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`VisiblePlanets HTTP ${res.status}`);
    }

    const json = await res.json();
    const rawList = Array.isArray(json) ? json : (json.val || json.data || []);

    if (rawList && rawList.length > 0) {
      return rawList.map(item => {
        const name = item.name || item.attributes?.name || 'Celestial Object';
        const constellation = item.constellation || item.attributes?.constellation || 'Unknown';
        const rawAlt = item.altitudeRaw ?? item.altitude ?? item.attributes?.altitude ?? 0;
        const rawAz = item.azimuthRaw ?? item.azimuth ?? item.attributes?.azimuth ?? 0;

        const altNum = typeof rawAlt === 'number' ? rawAlt : parseFloat(rawAlt);
        const azNum = typeof rawAz === 'number' ? rawAz : parseFloat(rawAz);

        return {
          name,
          constellation,
          altitude: `${Math.round(altNum)}°`,
          azimuth: `${Math.round(azNum)}° ${azimuthToDirection(azNum)}`,
          rawAltitude: altNum,
          aboveHorizon: item.aboveHorizon ?? (altNum > 0)
        };
      });
    }
  } catch (err) {
    console.warn("api.visibleplanets.dev call unfulfilled, using Astronomy Engine calculations:", err.message);
  }

  return computePlanetsLocally(lat, lon);
}

/**
 * Local astronomy engine calculation for real planet positions
 */
function computePlanetsLocally(lat, lon) {
  const observer = new Astronomy.Observer(lat, lon, 0);
  const date = new Date();
  const planetNames = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

  return planetNames.map(name => {
    const equ = Astronomy.Equator(name, date, observer, true, true);
    const hor = Astronomy.Horizon(date, observer, equ.ra, equ.dec, 'normal');
    const constell = Astronomy.Constellation(equ.ra, equ.dec);

    const altNum = hor.altitude;
    const azNum = hor.azimuth;

    return {
      name,
      constellation: constell.name,
      altitude: `${Math.round(altNum)}°`,
      azimuth: `${Math.round(azNum)}° ${azimuthToDirection(azNum)}`,
      rawAltitude: altNum,
      aboveHorizon: altNum > 0
    };
  });
}

/**
 * Geocode city name to lat, lon, label using OpenStreetMap Nominatim
 */
export async function geocodeCity(name) {
  if (!name || !name.trim()) return [];
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(name.trim())}&format=json&limit=5`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'SkyTonight/1.0' }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.map(item => ({
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      label: item.display_name
    }));
  } catch (err) {
    console.error("Geocoding failed:", err);
    return [];
  }
}

/**
 * Reverse geocode lat, lon to human readable location string
 */
export async function reverseGeocode(lat, lon) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'SkyTonight/1.0' }
    });
    if (!res.ok) return null;
    const data = await res.json();
    const city = data.address?.city || data.address?.town || data.address?.village || data.address?.county;
    const country = data.address?.country;
    if (city && country) {
      return `${city}, ${country}`;
    }
    return data.display_name?.split(',').slice(0, 2).join(', ') || null;
  } catch (err) {
    console.error("Reverse geocoding failed:", err);
    return null;
  }
}

export async function explain(payload) {
  const { object, data } = payload;
  
  // Artificial delay to simulate AI generation
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (object === 'Moon') {
    return `Tonight, the Moon is in its ${data.phaseName} phase, illuminated at ${data.illumination}%. It is currently ${data.distance.toLocaleString()} km away from Earth. You can observe it at an altitude of ${data.altitude}° in the ${data.azimuth.split(' ')[1]} sky. Its current age is ${data.age} days into the lunar cycle.`;
  }
  if (object === 'ISS') {
    return `The International Space Station is currently flying at an altitude of ${Math.round(data.altitude)} km with a blistering velocity of ${Math.round(data.velocity).toLocaleString()} km/h. There are ${data.crewCount} crew members aboard. Keep an eye out for its next visible pass!`;
  }
  
  return `${object} is currently visible tonight in the constellation ${data.constellation}. It is positioned at an altitude of ${data.altitude} in the ${data.azimuth.split(' ')[1]} sky. A fantastic target for observation!`;
}

export async function issPass(lat, lon) {
  try {
    // 1. Fetch visual passes from our serverless proxy
    const passRes = await fetch(`/api/iss?lat=${lat}&lon=${lon}`);
    let passData = null;
    
    if (passRes.ok) {
      const data = await passRes.json();
      if (data.passes && data.passes.length > 0) {
        const nextPass = data.passes[0];
        const date = new Date(nextPass.startUTC * 1000);
        passData = {
          start: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          duration: `${Math.round(nextPass.duration / 60)}m ${nextPass.duration % 60}s`,
          maxElevation: `${Math.round(nextPass.maxEl)}°`,
          direction: azimuthToDirection(nextPass.startAz),
          brightness: `${nextPass.mag} mag`
        };
      }
    }

    // 2. Fetch live position (optional, direct)
    let currentPosition = null;
    try {
      const liveRes = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
      if (liveRes.ok) {
        const liveData = await liveRes.json();
        currentPosition = {
          lat: liveData.latitude.toFixed(2),
          lon: liveData.longitude.toFixed(2)
        };
      }
    } catch (e) {
      console.warn("Could not fetch live ISS position");
    }

    return {
      pass: passData,
      currentPosition: currentPosition
    };

  } catch (err) {
    console.error("ISS pass fetch failed:", err);
    return { pass: null, currentPosition: null };
  }
}

export async function apod() { return null; }

export async function getWeather(lat, lon) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=cloud_cover,weather_code&hourly=cloud_cover&forecast_days=1`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      cloudCover: data.current.cloud_cover,
      weatherCode: data.current.weather_code,
      hourlyCloudCover: data.hourly.cloud_cover
    };
  } catch (err) {
    console.error("Weather fetch failed:", err);
    return null;
  }
}

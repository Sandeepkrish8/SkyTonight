import SunCalc from 'suncalc';

const PHASES = ["New Moon","Waxing Crescent","First Quarter","Waxing Gibbous",
  "Full Moon","Waning Gibbous","Last Quarter","Waning Crescent"];

export function phaseName(phase) {
  return PHASES[Math.round(phase * 8) % 8];
}

export function moonInfo(date = new Date()) {
  const { fraction, phase } = SunCalc.getMoonIllumination(date);
  return { illumination: Math.round(fraction * 100), phase, name: phaseName(phase) };
}

export function sunMoonTimes(lat, lon, date = new Date()) {
  const sun = SunCalc.getTimes(date, lat, lon);
  const moon = SunCalc.getMoonTimes(date, lat, lon);
  return { sunrise: sun.sunrise, sunset: sun.sunset, moonrise: moon.rise, moonset: moon.set };
}

import * as SunCalc from 'suncalc';

export function phaseName(phase) {
  if (phase < 0.02 || phase > 0.98) return "New Moon";
  if (phase < 0.23) return "Waxing Crescent";
  if (phase < 0.27) return "First Quarter";
  if (phase < 0.48) return "Waxing Gibbous";
  if (phase < 0.52) return "Full Moon";
  if (phase < 0.73) return "Waning Gibbous";
  if (phase < 0.77) return "Last Quarter";
  return "Waning Crescent";
}

export function moonInfo(date = new Date()) {
  const { fraction, phase } = SunCalc.getMoonIllumination(date);
  return { illumination: Math.round(fraction * 100), phase, fraction, name: phaseName(phase) };
}

export function sunMoonTimes(lat, lon, date = new Date()) {
  const sun = SunCalc.getTimes(date, lat, lon);
  const moon = SunCalc.getMoonTimes(date, lat, lon);
  return { sunrise: sun.sunrise, sunset: sun.sunset, moonrise: moon.rise, moonset: moon.set };
}

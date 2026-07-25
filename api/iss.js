export default async function handler(req, res) {
  const { lat, lon, alt = 0 } = req.query;
  
  if (!lat || !lon) {
    return res.status(400).json({ error: 'lat and lon are required' });
  }

  // 25544 is the NORAD ID for the International Space Station
  // 5 days prediction, 300 seconds minimum visibility
  const url = `https://api.n2yo.com/rest/v1/satellite/visualpasses/25544/${lat}/${lon}/${alt}/5/300?apiKey=${process.env.N2YO_API_KEY}`;
  
  try {
    const r = await fetch(url);
    const data = await r.json();
    
    res.status(200).json(data);
  } catch (err) {
    console.error("N2YO API Error:", err);
    res.status(500).json({ error: 'ISS request failed' });
  }
}

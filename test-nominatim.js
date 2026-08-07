const lat = 13.21;
const lon = 80.11;

fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`, {
  headers: { 'User-Agent': 'SkyTonight/1.0' }
})
.then(res => res.json())
.then(data => {
  console.log("FULL DATA:", JSON.stringify(data, null, 2));
  
  const city = data.address?.city || data.address?.town || data.address?.village || data.address?.county;
  const country = data.address?.country;
  
  console.log("city:", city);
  console.log("country:", country);
  
  if (city && country) {
    console.log("RESULT (if branch):", `${city}, ${country}`);
  } else {
    console.log("RESULT (else branch):", data.display_name?.split(',').slice(0, 2).join(', '));
  }
});

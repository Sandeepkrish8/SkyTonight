const q = "Govt Hospital Alamathi";
fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&addressdetails=1`, {
  headers: { 'User-Agent': 'SkyTonight/1.0' }
})
.then(res => res.json())
.then(data => {
  console.log(JSON.stringify(data[0], null, 2));
});

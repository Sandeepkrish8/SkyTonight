export async function nasaImages(query) {
  try {
    const res = await fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`);
    const json = await res.json();
    const items = json.collection?.items || [];
    
    return items.slice(0, 4).map(item => {
      const thumb = item.links?.find(l => l.rel === 'preview')?.href || '';
      return {
        title: item.data?.[0]?.title || 'NASA Image',
        thumbnail: thumb,
        // NASA images API typically provides ~orig.jpg for original, ~thumb.jpg for thumbnail
        large: thumb.replace('~thumb', '~orig')
      };
    });
  } catch (err) {
    console.error("NASA image fetch failed:", err);
    return [];
  }
}

export async function nasaVideo(query) {
  try {
    const res = await fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=video`);
    const json = await res.json();
    const items = json.collection?.items || [];
    
    if (items.length > 0) {
      const item = items[0];
      try {
        const videoColRes = await fetch(item.href);
        const videoCol = await videoColRes.json();
        const videoUrl = videoCol.find(url => url.endsWith('.mp4'));
        
        if (videoUrl) {
          return {
            title: item.data?.[0]?.title || 'NASA Video',
            videoUrl
          };
        }
      } catch (e) {
        console.warn("Failed to fetch NASA video collection", e);
      }
    }
  } catch (err) {
    console.error("NASA video fetch failed:", err);
  }
  return null;
}

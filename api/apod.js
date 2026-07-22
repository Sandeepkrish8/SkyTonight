// Vercel serverless function stub for NASA APOD
export default async function handler(req, res) {
  res.status(200).json({ title: "NASA Astronomy Picture of the Day", url: "", media_type: "image" });
}

# 🌌 SkyTonight

**Real sky data, tuned to where you're standing — no sign-up.**

SkyTonight is a powerful, real-time astronomical dashboard and 3D telescope view built for web browsers. It dynamically calculates planetary positions, moon phases, and ISS flyovers tailored to your exact GPS coordinates or city search. 

![SkyTonight Demo](https://img.shields.io/badge/Demo-Live-brightgreen.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5-purple.svg)
![Three.js](https://img.shields.io/badge/Three.js-r3f-black.svg)

---

## 🚀 Features

* **3D Telescope View & AR Mode:** Explore the night sky in a fully interactive 3D environment using `react-three-fiber`. On mobile devices, enable **AR Mode** to pan your phone around and see the universe align with your actual surroundings!
* **Live ISS Tracking:** Secure, real-time predictions for the next International Space Station flyover visible from your exact location, plus live latitude/longitude tracking.
* **Constellation Mythologies:** Learn the ancient stories behind the stars with an integrated AI storyteller that explains constellations like Orion, Ursa Major, and Cassiopeia.
* **Live Community Feed:** See what other stargazers in your area are currently spotting in the night sky.
* **Dynamic Dashboard:** Real-time altitude and azimuth data for all 8 planets and the Moon, powered by SunCalc and the Astronomy Engine.
* **Object Details & Ephemeris:** Deep dives into celestial objects with live calculations customized to your location, never hardcoded.

## 🛠️ Built With

* **Frontend:** React, Vite, Tailwind CSS, Framer Motion
* **3D Engine:** Three.js, `@react-three/fiber`, `@react-three/drei`
* **Astronomy Data:** `astronomy-engine`, `suncalc`
* **Serverless Backend:** Vercel Serverless Functions (`/api` routes)

## 📡 Powered by Real Data

* **NASA:** Astronomy Picture of the Day & Image Library
* **Visible Planets API:** Live planetary positions
* **SunCalc:** Moon phase & sun/moon times
* **Open-Meteo:** Geocoding (city search)
* **N2YO:** ISS visual pass predictions
* **Solar System Scope:** Planet & moon textures (CC BY 4.0)

---

## 💻 Getting Started (Local Development)

To run SkyTonight locally, you need to set up your environment variables. 

> ⚠️ **IMPORTANT: API Keys**
> Your API keys live in Vercel (or your local `.env.local` file), **NOT** in the repository. Never commit your `.env.local` file.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sandeepkrish8/SkyTonight.git
   cd SkyTonight
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your N2YO API key (required for ISS tracking):
   ```env
   N2YO_API_KEY=your_n2yo_api_key_here
   ```
   *You can get a free API key by signing up at [N2YO.com](https://www.n2yo.com/api/).*

4. **Run the development server:**
   Because SkyTonight uses Vercel Serverless functions (for the secure ISS API proxy), you should use the Vercel CLI for local development to ensure the `/api` routes work correctly:
   ```bash
   npm i -g vercel
   vercel dev
   ```
   *(Alternatively, `npm run dev` will run the frontend, but the ISS prediction API will not function).*

## 🌍 Deployment

SkyTonight is optimized for deployment on [Vercel](https://vercel.com). 
When deploying, ensure you add the `N2YO_API_KEY` to your Vercel Project Environment Variables via the Vercel Dashboard.

## 📄 License

This project is open-source. Planetary and moon textures are provided by [Solar System Scope](https://www.solarsystemscope.com/textures/) under CC BY 4.0.

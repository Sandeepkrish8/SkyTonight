import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Compass, Moon, Orbit, Sparkles, ShieldCheck, ArrowRight, ChevronDown, MapPin, Code, Database } from 'lucide-react';
import Container from '../components/layout/Container';
import heroBg from '../assets/download (6).jpg';

export default function Landing() {
  const shouldReduceMotion = useReducedMotion();
  const [videoError, setVideoError] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const featureVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: shouldReduceMotion ? 0 : i * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const features = [
    {
      icon: Compass,
      title: 'Live Sky Map',
      description: 'Real-time calculated altitude, azimuth, and horizon visibility for all major planets in your night sky.'
    },
    {
      icon: Moon,
      title: 'Accurate Moon Phase',
      description: 'Derived live via SunCalc algorithms to give exact illumination percentages and 3D phase metrics for your location.'
    },
    {
      icon: Orbit,
      title: 'ISS Pass Predictions',
      description: 'Real-time orbit prediction for International Space Station flyovers above your exact coordinates.'
    },
    {
      icon: Sparkles,
      title: 'AI Sky Guide',
      description: 'Conversational Gemini AI assistant providing instant ephemeris explanations, constellation lore, and viewing tips.'
    }
  ];

  const metrics = [
    { value: '8 Planets + Moon', label: 'Calculated Live' },
    { value: 'Real-Time', label: 'Horizon & Azimuth' },
    { value: 'GPS & City Search', label: 'Tuned to Your Location' },
    { value: 'ISS Passes', label: 'Prediction Engine' }
  ];

  return (
    <div className="relative min-h-screen text-primary flex flex-col selection:bg-[#7C5CFF]/30">
      {/* Hero Section (Full Viewport Height with Animated Hero Video Background) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 py-24">
        {/* Animated Background Video */}
        {!shouldReduceMotion && !videoError ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={heroBg}
            onError={() => setVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover object-center -z-20 transform scale-[1.01]"
          >
            <source src="/background_video.mp4" type="video/mp4" />
          </video>
        ) : null}

        {/* Fallback Static High Definition Hero Image Background */}
        {(shouldReduceMotion || videoError) && (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-20 transform scale-[1.01]"
            style={{ backgroundImage: `url("${heroBg}")` }}
          />
        )}

        {/* Sleek Cinematic Vignette Overlay: Darkens top for header & fades bottom into page seamlessly */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080b15]/60 via-[#080b15]/25 to-base -z-10 pointer-events-none" />

        {/* Ambient Glowing Nebula Blobs behind content */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#7C5CFF]/20 to-[#22D3EE]/15 rounded-full blur-[130px] -z-10 pointer-events-none" />

        {/* Centered Hero Content */}
        <Container className="relative z-10 max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center gap-12">
            {/* Text Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center text-center flex-1"
            >
              {/* Eyebrow Pill */}
              <motion.div variants={itemVariants} className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-[#22D3EE] bg-elevated/80 border border-[#22D3EE]/30 uppercase backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                  <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
                  NIGHT SKY EXPLORER
                </span>
              </motion.div>

              {/* Headline with Drop Glow */}
              <motion.h1
                variants={itemVariants}
                className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1] drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]"
              >
                Your window to{' '}
                <span className="bg-gradient-to-r from-[#7C5CFF] via-[#a78bfa] to-[#22D3EE] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(124,92,255,0.4)]">
                  tonight's sky
                </span>
              </motion.h1>

              {/* Subhead */}
              <motion.p
                variants={itemVariants}
                className="text-slate-200 text-base sm:text-xl max-w-2xl font-normal leading-relaxed mb-10 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
              >
                Real-time planetary visibility, SunCalc-derived moon illumination, satellite pass predictions, and AI stargazing insights tuned to your exact location.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              >
                <Link
                  to="/app"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7C5CFF] to-[#22D3EE] text-white font-display font-semibold text-base shadow-[0_0_25px_rgba(124,92,255,0.4)] hover:shadow-[0_0_35px_rgba(124,92,255,0.65)] hover:scale-[1.04] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Open the Sky</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-elevated/80 hover:bg-elevated text-primary font-display font-medium text-base border border-white/15 hover:border-white/30 backdrop-blur-md shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>How it works</span>
                  <ChevronDown className="w-4 h-4 text-muted" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Metrics Band */}
      <section id="how-it-works" className="py-16 border-y border-white/10 bg-elevated/20 relative z-10 backdrop-blur-sm">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : idx * 0.1 }}
                className="p-4 rounded-2xl bg-elevated/40 border border-white/5"
              >
                <div className="font-display text-xl sm:text-3xl font-extrabold text-white mb-1 bg-gradient-to-r from-white via-slate-100 to-[#22D3EE] bg-clip-text text-transparent">
                  {metric.value}
                </div>
                <div className="text-xs sm:text-sm text-muted font-medium">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Feature Cards Section */}
      <section className="py-24 relative z-10">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7C5CFF]">Powerful Features</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2 mb-4">
              Everything you need for stargazing
            </h2>
            <p className="text-muted text-sm sm:text-base">
              No static stargazing charts. Real astronomical algorithms calculated dynamically for your coordinates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={idx}
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={featureVariants}
                  className="p-6 rounded-3xl bg-elevated/60 border border-white/10 hover:border-[#7C5CFF]/40 shadow-xl backdrop-blur-md transition-all flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7C5CFF]/20 to-[#22D3EE]/10 border border-[#7C5CFF]/20 flex items-center justify-center mb-5 text-[#22D3EE] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mb-2">{feat.title}</h3>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">{feat.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Trust Line */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-muted">
              <ShieldCheck className="w-4 h-4 text-[#22D3EE]" />
              <span>Powered by NASA APOD, Visible Planets API & SunCalc — free, no sign-up.</span>
            </div>
          </div>
        </Container>
      </section>

      {/* How SkyTonight Works Section */}
      <section className="py-24 bg-black/40 border-y border-white/10 relative z-10">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              How SkyTonight Works
            </h2>
            <p className="text-[#22D3EE] font-medium text-lg">
              Real sky data, tuned to where you're standing — no sign-up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center text-center p-6"
            >
              <div className="w-16 h-16 rounded-full bg-[#7C5CFF]/20 border border-[#7C5CFF]/30 flex items-center justify-center mb-6 text-[#7C5CFF]">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">1. We find your sky</h3>
              <p className="text-muted leading-relaxed">
                Geolocation (or city search) pinpoints your exact coordinates instantly.
              </p>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center text-center p-6"
            >
              <div className="w-16 h-16 rounded-full bg-[#22D3EE]/20 border border-[#22D3EE]/30 flex items-center justify-center mb-6 text-[#22D3EE]">
                <Orbit className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">2. We calculate what's up</h3>
              <p className="text-muted leading-relaxed">
                SunCalc computes moon phase and times locally; the Visible Planets API returns planets above your horizon.
              </p>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center text-center p-6"
            >
              <div className="w-16 h-16 rounded-full bg-pink-500/20 border border-pink-500/30 flex items-center justify-center mb-6 text-pink-400">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">3. You explore & understand</h3>
              <p className="text-muted leading-relaxed">
                An AI guide explains objects in plain language, alongside a 3D telescope view and observation journal.
              </p>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* Built With */}
            <div className="text-center">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6 flex items-center justify-center gap-2">
                <Code className="w-4 h-4" /> Built With
              </h4>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'react-three-fiber', 'SunCalc'].map((tech) => (
                  <span key={tech} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Powered By */}
            <div className="text-center">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6 flex items-center justify-center gap-2">
                <Database className="w-4 h-4" /> Powered By Real Data
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-slate-400">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="font-semibold text-white block mb-1">NASA</span>
                  Astronomy Picture of the Day & Image Library
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="font-semibold text-white block mb-1">Visible Planets API</span>
                  Live planetary positions
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="font-semibold text-white block mb-1">SunCalc</span>
                  Moon phase & sun/moon times
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="font-semibold text-white block mb-1">Open-Meteo</span>
                  Geocoding (city search)
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="font-semibold text-white block mb-1">Solar System Scope</span>
                  Planet & moon textures (CC BY 4.0)
                </div>
              </div>
            </div>
            
            {/* Trust Line */}
            <div className="pt-8 text-center">
              <div className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20 text-sm font-semibold text-[#22D3EE]">
                <ShieldCheck className="w-4 h-4" />
                Free · No sign-up · Calculated live for your location.
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA Band */}
      <section className="py-20 relative z-10">
        <Container>
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#121629] via-[#1a1738] to-[#11192e] border border-white/15 p-10 sm:p-16 text-center shadow-2xl backdrop-blur-xl"
          >
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#7C5CFF]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#22D3EE]/20 rounded-full blur-3xl pointer-events-none" />

            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Ready to look up?
            </h2>
            <p className="text-muted text-base sm:text-lg max-w-lg mx-auto mb-8 font-normal">
              Check tonight's visible planets, moon illumination, and stargazing predictions instantly.
            </p>
            <Link
              to="/app"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7C5CFF] to-[#22D3EE] text-white font-display font-semibold text-base shadow-xl shadow-[#7C5CFF]/30 hover:shadow-[#7C5CFF]/50 hover:scale-[1.03] active:scale-[0.98] transition-all group"
            >
              <span>Open the Sky</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}

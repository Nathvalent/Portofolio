import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';
import PatternWaves from './PatternWaves';

export const HomeSection: React.FC = () => {
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  };

  const scrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('about');
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative z-10 w-full min-h-screen flex flex-col justify-between pt-28 md:pt-36 pb-8 md:pb-12"
    >
      {/* PatternWaves dot-grid background */}
      <div className="absolute inset-0 w-full h-full">
        <PatternWaves preset="silk" color="#ffffff" backgroundColor="#080808" fade="edges" interactive cursorSize={60} cursorStrength={0.6} />
      </div>

      {/* Background radial gradient spotlight */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Container */}
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20 relative flex-1 flex flex-col justify-center">
        <div className="relative z-20 max-w-5xl flex flex-col justify-center items-start">
          {/* Category Marker Tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6 md:mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-neutral-300 shadow-[0_0_8px_#ffffff] animate-pulse"></span>
            <span className="font-mono-code text-xs md:text-[13px] tracking-[0.3em] uppercase text-neutral-400 font-medium">
              NATHANAEL VALENT PORTFOLIO
            </span>
          </motion.div>

          {/* Giant High-Impact Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-editorial-condensed text-[3.8rem] sm:text-[5.5rem] md:text-[6.8rem] lg:text-[8rem] xl:text-[8.8rem] font-bold text-white uppercase text-left mb-6 md:mb-8 drop-shadow-xl select-none leading-[0.88] tracking-[-0.04em] flex flex-col gap-0"
          >
            <span className="block">WELCOME</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
              TO VALENT'S
            </span>
            <span className="block">PROFILE</span>
          </motion.h1>

          {/* Sub-headline Manifesto */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono-code text-xs sm:text-[13px] md:text-sm tracking-[0.26em] text-neutral-300 uppercase font-normal max-w-xl mb-10 md:mb-14 leading-[2] border-l-2 border-neutral-500/80 pl-4 md:pl-5"
          >
            BRANDING. UI/UX. WEB DESIGN.
            <br />
            PIXEL PERFECT. PURPOSE DRIVEN.
          </motion.p>

          {/* Interactive CTA Link: VIEW MY WORK + Circular Arrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-5 group cursor-pointer select-none"
          >
            <button
              onClick={scrollToProjects}
              className="relative py-2 font-mono-code text-xs md:text-sm tracking-[0.24em] uppercase text-white font-semibold transition-colors focus:outline-none"
            >
              VIEW MY WORK
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-neutral-700 group-hover:bg-white group-hover:shadow-[0_0_10px_#ffffff] transition-all duration-300"></span>
            </button>

            <button
              onClick={scrollToProjects}
              aria-label="View Portfolio Work"
              className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white hover:bg-neutral-200 text-black flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] shadow-[0_0_12px_rgba(255,255,255,0.3)] focus:outline-none cursor-pointer"
            >
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>

            <button
              onClick={scrollToAbout}
              className="ml-4 flex items-center gap-2 font-mono-code text-[11px] tracking-[0.2em] text-neutral-500 hover:text-white transition-colors"
            >
              <span>EXPLORE PROFILE</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </motion.div>
        </div>

        {/* FAR RIGHT EDGE: Minimalist Vertical Gauge & Editorial Design Text (From Image 3, Pure Typography) */}
        <aside className="hidden xl:flex absolute right-12 md:right-16 top-1/2 -translate-y-1/2 flex-col justify-between items-end h-[360px] z-20 pointer-events-none select-none">
          {/* Top Vertical Gauge line with glowing white node */}
          <div className="flex flex-col items-center gap-0 w-6 relative pt-2">
            <div className="w-[1px] h-32 bg-neutral-800/80 relative flex items-center justify-center">
              <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
            </div>
          </div>

          {/* Clean Editorial Design Text at Bottom Right (Pure Non-Clickable Text) */}
          <div className="flex flex-col items-end gap-2.5 text-right font-mono-code text-[10px] md:text-[11px] tracking-[0.28em] text-neutral-400 font-normal uppercase leading-relaxed select-none">
            <span>DESIGN</span>
            <span>STRATEGY</span>
            <span>STORYTELLING</span>
            <span className="text-white font-bold tracking-[0.3em] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
              IMPACT
            </span>
          </div>
        </aside>
      </div>

    </section>
  );
};

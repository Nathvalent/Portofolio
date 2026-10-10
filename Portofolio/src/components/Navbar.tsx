import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import bgMusic from '../assets/Altare - Bye (Instrumental).mp3';

interface NavItem { id: string; label: string; }

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'tech-stack', label: 'TECH STACK' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'certificates', label: 'CERTIFICATES' },
  { id: 'contact', label: 'CONTACT' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(bgMusic);
    audio.loop = true;
    audio.volume = 1.0;
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ''; };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  const doScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const scrollToSection = (id: string) => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      setTimeout(() => doScroll(id), 300);
    } else {
      doScroll(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const scrollPosition = window.scrollY + 200;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080808]/90 backdrop-blur-xl border-b border-neutral-900/90 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-[#080808]/90 via-[#080808]/50 to-transparent py-7 md:py-9'
      }`}
    >
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20 flex items-center justify-between">
        <button
          onClick={() => scrollToSection('home')}
          style={{ touchAction: 'manipulation' }}
          className="flex items-center gap-2 group select-none cursor-pointer focus:outline-none"
        >
          <span className="font-sans font-extrabold text-xl md:text-2xl tracking-[0.2em] text-white group-hover:text-neutral-300 transition-colors">
            NVD<span className="text-neutral-400">.</span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-7 xl:gap-11 ml-auto font-mono-code text-[11px] xl:text-xs font-semibold tracking-[0.24em] uppercase">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative py-1.5 transition-all duration-300 cursor-pointer focus:outline-none ${
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-white rounded-full shadow-[0_0_8px_#ffffff,0_0_16px_#ffffff]"
                  />
                )}
              </button>
            );
          })}

          {/* Music toggle */}
          <button
            onClick={toggleMusic}
            style={{ touchAction: 'manipulation' }}
            aria-label={playing ? 'Mute music' : 'Play music'}
            className="relative flex items-center gap-1.5 py-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer focus:outline-none"
          >
            {playing ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            {playing && (
              <span className="flex gap-[2px] items-end h-3">
                {[1,2,3].map((i) => (
                  <span
                    key={i}
                    className="w-[2px] bg-white rounded-full animate-pulse"
                    style={{ height: `${6 + i * 3}px`, animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </span>
            )}
          </button>
        </nav>

        <div className="lg:hidden flex items-center gap-2 ml-auto">
          {/* Music toggle mobile */}
          <button
            onClick={toggleMusic}
            style={{ touchAction: 'manipulation' }}
            aria-label={playing ? 'Mute music' : 'Play music'}
            className="p-2 text-neutral-300 hover:text-white focus:outline-none flex items-center gap-1"
          >
            {playing ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            {playing && (
              <span className="flex gap-[2px] items-end h-3">
                {[1,2,3].map((i) => (
                  <span key={i} className="w-[2px] bg-white rounded-full animate-pulse" style={{ height: `${6 + i * 3}px`, animationDelay: `${i * 0.15}s` }} />
                ))}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ touchAction: 'manipulation' }}
            className="p-2 text-neutral-300 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
            className="lg:hidden bg-[#0a0a0a] border-b border-neutral-800 backdrop-blur-2xl"
          >
            <div className="px-6 py-2 flex flex-col font-mono-code text-xs tracking-[0.24em] uppercase">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    style={{ touchAction: 'manipulation' }}
                    className={`flex items-center justify-between py-4 w-full text-left border-b border-neutral-900/60 transition-colors ${
                      isActive ? 'text-white font-bold' : 'text-neutral-400'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

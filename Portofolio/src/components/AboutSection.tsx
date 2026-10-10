import React, { useEffect, useRef } from 'react';
import { Globe, Code2, GraduationCap, Compass, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import aboutPortrait from '../assets/images/Profile.png';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
}

const ParticleNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let animId: number;
    let mouse = { x: -9999, y: -9999 };
    const COUNT = 90;
    const CONNECT_DIST = 140;
    const MOUSE_DIST = 180;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      resize();
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.8,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.18 * (1 - dist / CONNECT_DIST)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // mouse connections
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < MOUSE_DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255,255,255,${0.55 * (1 - mdist / MOUSE_DIST)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(particles[i].x, particles[i].y, particles[i].r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.75)';
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouse = { x: -9999, y: -9999 }; };

    init();
    draw();
    window.addEventListener('resize', init);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', init);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative z-10 w-full min-h-screen flex flex-col justify-between pt-20 md:pt-28 pb-0 overflow-hidden"
    >
      {/* Particle Network Background */}
      <ParticleNetwork />

      {/* Background ambient lighting spotlight behind the subject */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.025] rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20 flex-1 flex flex-col justify-between">
        {/* Top Header Row with scroll entry animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex items-center justify-between pb-4 md:pb-6 text-neutral-400 font-mono-code text-[11px] md:text-xs tracking-[0.24em] uppercase border-b border-neutral-900/40 mb-6"
        >
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">FULLSTACK DEVELOPER</span>
            <span className="text-neutral-600">/</span>
            <span>DIGITAL CREATOR</span>
          </div>
          <div className="text-[10px] text-neutral-500 tracking-widest hidden sm:block">
            BIO IDENTIFIER // 02
          </div>
        </motion.div>

        {/* 3-Column Architectural Composition: Left Bio, Center Large Full-Height Portrait, Right Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-8 items-end flex-1">
          {/* Left Column: Hero Editorial Identity */}
          <div className="lg:col-span-4 flex flex-col justify-center pb-8 lg:pb-12 pt-4">
            {/* "Hello, I'm" handwritten cursive style */}
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-script text-2xl sm:text-3xl text-neutral-200 mb-1 select-none tracking-wide"
            >
              Hello, I'm
            </motion.p>

            {/* Giant Editorial Name */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-editorial-condensed text-[3.25rem] sm:text-[4rem] md:text-[4.75rem] lg:text-[4.2rem] xl:text-[5rem] font-bold text-white uppercase tracking-[-0.035em] leading-[0.88] mb-4 select-none"
            >
              <span className="block">NATHANAEL</span>
              <span className="block">VALENT D.</span>
            </motion.h2>

            {/* Sub-label: FULLSTACK DEVELOPER & UI/UX CREATOR */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-mono-code text-[11px] sm:text-xs tracking-[0.24em] text-neutral-300 uppercase font-semibold mb-4 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              <span>FULLSTACK DEVELOPER &amp; UI/UX CREATOR</span>
            </motion.div>

            {/* Narrative Paragraph */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-neutral-400 font-sans text-xs sm:text-sm leading-relaxed max-w-md mb-6"
            >
              Informatics student at{' '}
              <span className="text-white font-medium">Petra Christian University</span>{' '}
              blending full-stack software architecture with creative UI/UX design,
              videography, gaming, and music.
            </motion.p>

            {/* MBTI Replacement Tag (ISTP-T) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-6"
            >
              <div className="flex items-center gap-2 font-mono-code text-[11px] tracking-[0.16em]">
                <span className="text-neutral-500 font-bold">PERSONALITY //</span>
                <span className="px-3 py-1 bg-[#121212] border border-neutral-700/80 rounded-full text-white font-bold tracking-[0.2em] shadow-[0_0_12px_rgba(255,255,255,0.15)] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff] animate-pulse"></span>
                  MBTI: ISTP-T
                </span>
              </div>
            </motion.div>

            {/* AVAILABLE WORLDWIDE Pill Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-800 bg-[#121212]/80 font-mono-code text-[10px] tracking-[0.2em] uppercase text-neutral-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                <Globe className="w-3 h-3 text-neutral-400" />
                <span>AVAILABLE WORLDWIDE</span>
              </div>
            </motion.div>
          </div>

          {/* Center Column: LARGE Prominent Portrait Touching Bottom Border ("mentok ke border garis bawah") */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 flex flex-col items-center justify-end self-end relative z-20 pb-0"
          >
            {/* Ambient Radial Backlight Glow behind the subject */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[360px] sm:w-[460px] lg:w-[520px] h-[520px] bg-[radial-gradient(ellipse_at_50%_60%,rgba(255,255,255,0.12)_0%,transparent_70%)] pointer-events-none" />

            {/* The Large Photo Container flush with the bottom border */}
            <div
              className="relative w-full max-w-[360px] sm:max-w-[440px] lg:max-w-[490px] xl:max-w-[540px] flex flex-col items-center justify-end group/portrait"
            >
              <img
                src={aboutPortrait}
                alt="Nathanael Valent D. - Fullstack Developer"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[560px] sm:max-h-[640px] lg:max-h-[700px] xl:max-h-[760px] object-contain object-bottom block select-none drop-shadow-[0_25px_60px_rgba(0,0,0,1)] transition-transform duration-500 group-hover/portrait:scale-[1.01]"
              />

              {/* Minimalist tactical telemetry tag pinned above the bottom border */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-[#0c0c0c]/90 border border-neutral-800 rounded-full font-mono-code text-[9px] tracking-[0.25em] text-neutral-400 uppercase backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.8)] pointer-events-none select-none flex items-center gap-2 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]"></span>
                <span>NATHANAEL VALENT D. // FULLSTACK DEVELOPER</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Cyber Telemetry & Metrics */}
          <div className="lg:col-span-4 flex flex-col justify-center pb-8 lg:pb-12 pt-4">
            {/* Spec Matrix List */}
            <div className="space-y-4 font-mono-code">
              {/* Row 1: AGE / BASE */}
              <div className="flex items-center justify-between py-2 border-b border-neutral-900">
                <span className="text-[10px] sm:text-[11px] tracking-[0.24em] text-neutral-500 uppercase">
                  AGE / BASE
                </span>
                <span className="text-sm sm:text-base font-bold tracking-tight text-white">
                  20 <span className="text-neutral-500 font-normal">/</span> SURABAYA, ID
                </span>
              </div>

              {/* Row 2: GPA */}
              <div className="flex items-center justify-between py-2 border-b border-neutral-900">
                <span className="text-[10px] sm:text-[11px] tracking-[0.24em] text-neutral-500 uppercase flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-neutral-600" />
                  GPA
                </span>
                <span className="text-sm sm:text-base font-bold tracking-tight text-white">
                  3.78 <span className="text-neutral-500 font-normal">/</span> 4.00
                </span>
              </div>

              {/* Row 3: FOCUS */}
              <div className="flex items-center justify-between py-2 border-b border-neutral-900">
                <span className="text-[10px] sm:text-[11px] tracking-[0.24em] text-neutral-500 uppercase flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-neutral-600" />
                  FOCUS
                </span>
                <span className="text-xs sm:text-sm font-bold tracking-wider text-white uppercase">
                  FULLSTACK DEVELOPER
                </span>
              </div>

              {/* Row 4: INTERESTS - keeping 'WEB, EDITING, GAMING' as explicitly requested */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-neutral-900 gap-1">
                <span className="text-[10px] sm:text-[11px] tracking-[0.24em] text-neutral-500 uppercase flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-neutral-600" />
                  INTERESTS
                </span>
                <span className="text-xs sm:text-[13px] font-bold tracking-wider text-white uppercase">
                  WEB, EDITING, GAMING
                </span>
              </div>
            </div>

            {/* Design Philosophy Quote */}
            <div className="mt-6 p-3.5 rounded-lg border border-neutral-900 bg-[#0c0c0c]/80 text-neutral-400 text-[11px] font-mono-code leading-relaxed">
              <div className="flex items-center gap-2 text-neutral-500 text-[9px] tracking-widest uppercase mb-1">
                <Layers className="w-3 h-3 text-neutral-400" />
                <span>DESIGN PHILOSOPHY</span>
              </div>
              <p className="text-neutral-300">
                "Where strict architectural logic converges with fluid, visceral sensory design."
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

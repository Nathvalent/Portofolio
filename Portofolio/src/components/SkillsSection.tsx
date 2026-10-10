import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import GlobeStudy from './GlobeStudy';

interface Particle { x: number; y: number; vx: number; vy: number; r: number; }

const ParticleNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let animId: number;
    let mouse = { x: -9999, y: -9999 };
    const COUNT = 90, CONNECT_DIST = 140, MOUSE_DIST = 180;
    let particles: Particle[] = [];
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    const init = () => {
      resize();
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.8,
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < CONNECT_DIST) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.18*(1-dist/CONNECT_DIST)})`; ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
        const mdx = particles[i].x - mouse.x, mdy = particles[i].y - mouse.y;
        const mdist = Math.sqrt(mdx*mdx + mdy*mdy);
        if (mdist < MOUSE_DIST) {
          ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255,255,255,${0.55*(1-mdist/MOUSE_DIST)})`; ctx.lineWidth = 0.8; ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(particles[i].x, particles[i].y, particles[i].r, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    const onMouseMove = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const onMouseLeave = () => { mouse = { x: -9999, y: -9999 }; };
    init(); draw();
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

interface Trait { num: string; title: string; description: string; }

const LEFT_TRAITS: Trait[] = [
  {
    num: '01',
    title: 'Creative Visual & Artistic Direction',
    description: 'Combines strong creative expression with visual design sensibilities to craft compelling digital assets. Highlights the ability to design aesthetically pleasing user interfaces and immersive media layouts.',
  },
  {
    num: '02',
    title: 'Analytical Conscientiousness & Quality Assurance',
    description: 'Grounded in meticulous attention to detail and robust analytical reasoning during system development. Demonstrates a structured approach to problem-solving and a strict commitment to high technical standards.',
  },
  {
    num: '03',
    title: 'Interpersonal Collaboration & Empathy',
    description: 'Backed by strong social awareness and a considerate, people-oriented communication style. Showcases effective teamwork capabilities and deep user empathy essential for building collaborative products.',
  },
];

const RIGHT_TRAITS: Trait[] = [
  {
    num: '04',
    title: 'Pragmatic Hands-On Execution',
    description: 'Aligned with a practical, action-oriented learning style that prioritizes direct, real-world implementation. Emphasizes the capacity to rapidly prototype and turn conceptual ideas into fully functional applications.',
  },
  {
    num: '05',
    title: 'Systematic Problem-Solving & Logical Reasoning',
    description: 'Rooted in logical thinking and pattern analysis for tackling complex technical challenges. Ensures that system logic, architectural design, and development workflows are handled efficiently.',
  },
  {
    num: '06',
    title: 'Autonomous Drive & Reflective Growth',
    description: 'Reflects a strong capacity for independent pacing, self-reflection, and continuous self-improvement. Highlights the ability to set personal project milestones, adapt to evolving needs, and learn from every cycle.',
  },
];

const TraitCard: React.FC<{ trait: Trait; align: 'left' | 'right'; delay: number }> = ({ trait, align, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: align === 'left' ? -24 : 24 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.6, delay }}
    className="group"
  >
    <div className="flex items-start gap-3">
      <span className="font-mono-code text-[10px] tracking-[0.2em] text-neutral-700 mt-1 shrink-0">{trait.num}</span>
      <div>
        <h3 className="font-editorial text-base font-bold text-white mb-1.5 leading-snug">{trait.title}</h3>
        <p className="font-sans text-[11px] text-neutral-500 leading-relaxed">{trait.description}</p>
      </div>
    </div>
  </motion.div>
);

export const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="relative z-10 w-full min-h-screen flex flex-col justify-between pt-24 md:pt-32 pb-8 md:pb-12"
    >
      <ParticleNetwork />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.025] rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20 flex-1 flex flex-col relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 md:pb-12 border-b border-neutral-900/60 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
              <span className="font-mono-code text-xs tracking-[0.28em] text-neutral-400 uppercase">
                CAPABILITY MATRIX // 2025
              </span>
            </div>
            <h2 className="font-editorial-condensed text-4xl sm:text-6xl md:text-7xl font-bold uppercase text-white tracking-tight">
              SKILLS
            </h2>
          </div>
          <div className="font-mono-code text-xs text-neutral-500 tracking-[0.2em] uppercase mt-4 sm:mt-0">
            PERSONAL SKILLS
          </div>
        </motion.div>

        {/* 3-column layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-8 items-center">

          <div className="flex flex-col gap-5">
            {LEFT_TRAITS.map((t, i) => (
              <TraitCard key={t.num} trait={t} align="left" delay={i * 0.1} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative w-full lg:w-[420px] xl:w-[480px] aspect-square mx-auto"
          >
            <GlobeStudy
              background="transparent"
              baseColor="#E2E4E9"
              phrase="designcodecreatebuildinnovate"
              density={160}
              glyphSize={40}
              speed={80}
              hover={100}
              globe={{ radius: 95, drift: 180, letters: 5 }}
              pointer={{ zoom: 100, light: 100, pins: 5 }}
            />
          </motion.div>

          <div className="flex flex-col gap-5">
            {RIGHT_TRAITS.map((t, i) => (
              <TraitCard key={t.num} trait={t} align="right" delay={i * 0.1 + 0.15} />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20 pt-8 flex items-center justify-between font-mono-code text-[10px] text-neutral-500 tracking-[0.22em] uppercase relative">
        <span>ASSESSMENT METRIC: CONTINUOUS ITERATION</span>
        <span>READY TO THRIVE</span>
      </div>
    </section>
  );
};

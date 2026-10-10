import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Instagram, Copy, Check, ArrowUpRight } from 'lucide-react';

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
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.18 * (1 - dist / CONNECT_DIST)})`; ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
        const mdx = particles[i].x - mouse.x, mdy = particles[i].y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < MOUSE_DIST) {
          ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255,255,255,${0.55 * (1 - mdist / MOUSE_DIST)})`; ctx.lineWidth = 0.8; ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(particles[i].x, particles[i].y, particles[i].r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    const onMouseMove = (e: MouseEvent) => { const rect = canvas.getBoundingClientRect(); mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top }; };
    const onMouseLeave = () => { mouse = { x: -9999, y: -9999 }; };
    init(); draw();
    window.addEventListener('resize', init);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', init); canvas.removeEventListener('mousemove', onMouseMove); canvas.removeEventListener('mouseleave', onMouseLeave); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

const CONTACT_ITEMS = [
  { label: 'EMAIL', value: 'nathanael.valent@gmail.com', icon: Mail, href: 'mailto:nathanael.valent@gmail.com', copyable: true },
  { label: 'GITHUB', value: 'github.com/nathanaelvalent', icon: Github, href: 'https://github.com/Nathvalent', copyable: false },
  { label: 'LINKEDIN', value: 'linkedin.com/in/nathanael-valent', icon: Linkedin, href: 'https://www.linkedin.com/in/nathanael-valent-127995370/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B9u5%2F0B%2FSTIS%2BCrQHNRkwEQ%3D%3D', copyable: false },
  { label: 'INSTAGRAM', value: 'instagram.com/nathvallent', icon: Instagram, href: 'https://www.instagram.com/nathvallent/', copyable: false },
];

const SOCIAL_LINKS = [
  { icon: Mail, href: 'mailto:nathanael.valent@gmail.com' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/nathanael-valent-127995370/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B9u5%2F0B%2FSTIS%2BCrQHNRkwEQ%3D%3D' },
  { icon: Github, href: 'https://github.com/Nathvalent' },
  { icon: Instagram, href: 'https://www.instagram.com/nathvallent/' },
];

const CONNECT_LINKS = [
  { label: 'Direct Mail', href: 'mailto:nathanael.valent@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nathanael-valent-127995370/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B9u5%2F0B%2FSTIS%2BCrQHNRkwEQ%3D%3D' },
  { label: 'GitHub', href: 'https://github.com/Nathvalent' },
  { label: 'Instagram', href: 'https://www.instagram.com/nathvallent/' },
];

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="relative z-10 w-full overflow-hidden">
      <ParticleNetwork />

      {/* Contact Hero */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20 py-24 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <h2 className="font-editorial-condensed text-6xl sm:text-7xl md:text-8xl font-bold uppercase text-white leading-none mb-6">
              LET'S WORK<br />TOGETHER
            </h2>
            <div className="w-24 h-[2px] bg-white mb-8" />
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-10 max-w-md">
              Available for bespoke UI/UX systems, high-performance web development,
              brand direction, and creative multimedia commissions worldwide.
            </p>
          </motion.div>

          {/* Right — Contact Cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col gap-4"
          >
            {CONTACT_ITEMS.map(({ label, value, icon: Icon, href, copyable }) => (
              <div
                key={label}
                className="flex items-center justify-between px-5 py-5 bg-[#0f0f0f] border border-neutral-800 rounded-xl hover:border-neutral-600 transition-colors group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-neutral-900 rounded-lg border border-neutral-800">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono-code text-[10px] text-neutral-500 tracking-[0.22em] uppercase block mb-0.5">
                      {label}
                    </span>
                    <span className="font-mono-code text-xs sm:text-sm text-white truncate block">{value}</span>
                  </div>
                </div>
                {copyable ? (
                  <button
                    onClick={() => handleCopy(value)}
                    style={{ touchAction: 'manipulation' }}
                    className="ml-3 p-2 shrink-0 text-neutral-500 hover:text-white transition-colors cursor-pointer"
                    aria-label="Copy email"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                ) : (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ touchAction: 'manipulation' }}
                    className="ml-3 p-2 shrink-0 text-neutral-500 hover:text-white transition-colors"
                    aria-label={label}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-neutral-900">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20 py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-sans font-extrabold text-xl tracking-[0.2em] text-white mb-1">
              NVD<span className="text-neutral-400">.</span>
            </p>
            <p className="font-mono-code text-[10px] text-neutral-500 tracking-[0.22em] uppercase mb-4">
              WEB DESIGNER &amp; UI/UX CREATOR
            </p>
            <p className="text-neutral-500 text-xs leading-relaxed max-w-xs">
              Crafting obsidian cyber-editorial digital experiences with precision and intent.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono-code text-[10px] text-neutral-500 tracking-[0.22em] uppercase mb-5">NAVIGATION</p>
            <ul className="space-y-3">
              {['home', 'about', 'experience', 'projects', 'contact'].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => {
                      const el = document.getElementById(id);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{ touchAction: 'manipulation' }}
                    className="text-neutral-400 hover:text-white font-sans text-sm transition-colors capitalize cursor-pointer"
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Focus */}
          <div>
            <p className="font-mono-code text-[10px] text-neutral-500 tracking-[0.22em] uppercase mb-5">FOCUS</p>
            <ul className="space-y-3 text-neutral-400 text-sm">
              {['UI/UX Design', 'Web Development', 'Brand Direction', 'Motion & Video', 'Creative Systems'].map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="font-mono-code text-[10px] text-neutral-500 tracking-[0.22em] uppercase mb-5">CONNECT</p>
            <ul className="space-y-3 mb-6">
              {CONNECT_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ touchAction: 'manipulation' }}
                    className="text-neutral-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5"
                  >
                    {label}
                    {label !== 'Direct Mail' && <ArrowUpRight className="w-3 h-3" />}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 flex-wrap">
              {SOCIAL_LINKS.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ touchAction: 'manipulation' }}
                  className="w-10 h-10 flex items-center justify-center border border-neutral-800 text-neutral-500 hover:text-white hover:border-neutral-500 transition-colors rounded"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-900">
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono-code text-[10px] text-neutral-500 tracking-[0.18em] uppercase">
            <span>© 2026 NATHANAEL VALENT DANANTA . ALL RIGHTS RESERVED</span>
            <span>Surabaya, Indonesia • Fullstack Developer &amp; Web Design</span>
          </div>
        </div>
      </footer>
    </section>
  );
};

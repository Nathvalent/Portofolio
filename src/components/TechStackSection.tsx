import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface TechNode {
  id: string;
  name: string;
  badge: string;
  description: string;
  tags: string[];
  category: 'frontend' | 'backend' | 'other';
  icon: React.ReactNode;
}

const ICON = {
  python: <svg viewBox="0 0 128 128" className="w-5 h-5"><path fill="#387EB8" d="M63.7 3.5c-15.5 0-25.5 6.7-25.5 19.5v14.4h26.1v3.7H25.7C12.9 41.1 3.5 50.8 3.5 66.2c0 14.4 7.9 23.3 22.2 23.3h9.8v-13.8c0-14.8 12.3-25.3 26.5-25.3h25.4V36.7c0-12.7-10.4-20.9-23.7-20.9z" /><path fill="#FFE052" d="M64.3 124.5c15.5 0 25.5-6.7 25.5-19.5v-14.4H63.7v-3.7h38.6c12.8 0 22.2-9.7 22.2-25.1 0-14.4-7.9-23.3-22.2-23.3h-9.8v13.8c0 14.8-12.3 25.3-26.5 25.3H40.6v13.7c0 12.7 10.4 20.9 23.7 20.9z" /></svg>,
  typescript: <svg viewBox="0 0 128 128" className="w-5 h-5"><rect width="128" height="128" rx="16" fill="#3178C6" /><path fill="#FFF" d="M40.2 92.5V50.6H25.3v-9.4h39.7v9.4H50.1v41.9H40.2zm38.1.8c-7.8 0-13.8-2.6-17.7-7.4l6.7-6.2c3.2 3.6 7.2 5.5 11.9 5.5 4.9 0 7.7-2.3 7.7-5.5 0-3.1-2.4-4.8-8.7-6.7l-4.1-1.2c-8.9-2.7-13.4-7.5-13.4-14.1 0-8.6 6.9-14.7 17.5-14.7 6.8 0 12.1 2.1 15.8 5.9l-6.2 6.6c-2.9-2.9-6.3-4.4-10.2-4.4-4.7 0-7.3 2.1-7.3 5.1 0 2.9 2.2 4.4 7.5 6l4.2 1.3c9.7 3 14.5 7.8 14.5 14.8-.1 9.1-7.4 15-18.4 15z" /></svg>,
  javascript: <svg viewBox="0 0 128 128" className="w-5 h-5"><rect width="128" height="128" rx="16" fill="#F7DF1E" /><path fill="#000" d="M68.5 86.8c1.8 3 4.2 5.2 8.5 5.2 4.3 0 7-1.8 7-4.4 0-3-2.4-4.2-6.5-5.9l-2.2-.9c-6.5-2.7-10.8-6.1-10.8-13.5 0-6.7 5.2-11.8 13.4-11.8 5.8 0 10 2.1 13 7.3l-5.6 3.6c-1.6-2.6-3.4-3.7-6.7-3.7-3.3 0-5.5 1.7-5.5 3.9 0 2.5 1.7 3.5 5.7 5.2l2.2.9c7.6 3.2 11.9 6.6 11.9 14.2 0 8.1-6.4 12.6-15.3 12.6-8.5 0-14-3.9-16.7-9.4l7.6-3.3zm-38.3 1.3c1.4 2.5 3.3 4.6 6.7 4.6 3.5 0 5.7-1.4 5.7-6.9V55.9h8.3v29.9c0 9.8-5.8 14.3-14.3 14.3-6.4 0-10.9-3.3-13-8.2l6.6-3.8z" /></svg>,
  nextjs: <svg viewBox="0 0 128 128" className="w-5 h-5"><circle cx="64" cy="64" r="64" fill="#000" stroke="#333" strokeWidth="2" /><path fill="#FFF" d="M87.5 98.7L50.2 49.3v49.4H40V34.5h10.4l38.2 50.7V34.5h10.2v64.2z" /></svg>,
  react: <svg viewBox="0 0 128 128" className="w-5 h-5"><ellipse cx="64" cy="64" rx="14" ry="14" fill="#61DAFB" /><g stroke="#61DAFB" strokeWidth="4.5" fill="none"><ellipse cx="64" cy="64" rx="54" ry="20" /><ellipse cx="64" cy="64" rx="54" ry="20" transform="rotate(60 64 64)" /><ellipse cx="64" cy="64" rx="54" ry="20" transform="rotate(120 64 64)" /></g></svg>,
  tailwind: <svg viewBox="0 0 128 128" className="w-5 h-5"><path fill="#38BDF8" d="M64 24c-21.3 0-34.7 10.7-40 32 8-10.7 17.3-14.7 28-12 6.1 1.5 10.5 5.9 15.3 10.8C75.1 62.7 84 72 104 72c21.3 0 34.7-10.7 40-32-8 10.7-17.3 14.7-28 12-6.1-1.5-10.5-5.9-15.3-10.8C92.9 33.3 84 24 64 24zM24 72c-21.3 0-34.7 10.7-40 32 8-10.7 17.3-14.7 28-12 6.1 1.5 10.5 5.9 15.3 10.8C35.1 110.7 44 120 64 120c21.3 0 34.7-10.7 40-32-8 10.7-17.3 14.7-28 12-6.1-1.5-10.5-5.9-15.3-10.8C52.9 81.3 44 72 24 72z" /></svg>,
  nodejs: <svg viewBox="0 0 128 128" className="w-5 h-5"><path fill="#539E43" d="M64 10l48 27.7v55.4L64 120.8 16 93.1V37.7L64 10z" /><path fill="#FFF" d="M64 36l30 17.3v34.6L64 105.2 34 87.9V53.3L64 36z" /></svg>,
  postgresql: <svg viewBox="0 0 128 128" className="w-5 h-5"><path fill="#336791" d="M64 12c-28 0-48 20-48 48 0 20 12 36 30 44v12h36V96c18-8 30-24 30-44 0-28-20-48-48-48zm0 24c13.2 0 24 10.8 24 24S77.2 84 64 84 40 73.2 40 60s10.8-24 24-24z" /></svg>,
  webgl: <svg viewBox="0 0 128 128" className="w-5 h-5"><polygon points="64,12 116,108 12,108" fill="#FFF" /><polygon points="64,36 98,96 30,96" fill="#080808" /></svg>,
  claude: <svg viewBox="0 0 128 128" className="w-5 h-5"><rect width="128" height="128" rx="20" fill="#D97757" /><text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="52" fontWeight="bold" fill="#FFF" fontFamily="serif">C</text></svg>,
  chatgpt: <svg viewBox="0 0 128 128" className="w-5 h-5"><rect width="128" height="128" rx="20" fill="#10A37F" /><path fill="#FFF" d="M64 22c-11 0-20.5 6.5-24.5 16A22 22 0 0 0 22 60a22 22 0 0 0 4 12.8L22 86l13.5-3.5A26 26 0 0 0 64 90c14.4 0 26-11.6 26-26V54c0-17.7-11.6-32-26-32zm0 12c7.7 0 14 6.3 14 14v10c0 7.7-6.3 14-14 14s-14-6.3-14-14V48c0-7.7 6.3-14 14-14z" /></svg>,
  gemini: <svg viewBox="0 0 128 128" className="w-5 h-5"><defs><linearGradient id="gemGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#4285F4" /><stop offset="100%" stopColor="#A142F4" /></linearGradient></defs><rect width="128" height="128" rx="20" fill="url(#gemGrad)" /><path fill="#FFF" d="M64 16 C64 16 80 48 112 64 C80 80 64 112 64 112 C64 112 48 80 16 64 C48 48 64 16 64 16Z" /></svg>,
  antigravity: <svg viewBox="0 0 128 128" className="w-5 h-5"><rect width="128" height="128" rx="20" fill="#0A0A0A" stroke="#444" strokeWidth="2" /><circle cx="64" cy="64" r="28" fill="none" stroke="#FFF" strokeWidth="4" /><path d="M64 36 L64 20 M64 92 L64 108 M36 64 L20 64 M92 64 L108 64" stroke="#FFF" strokeWidth="4" strokeLinecap="round" /><circle cx="64" cy="64" r="8" fill="#FFF" /></svg>,
  amazonq: <svg viewBox="0 0 128 128" className="w-5 h-5"><rect width="128" height="128" rx="20" fill="#232F3E" /><path fill="#FF9900" d="M20 88 Q64 104 108 88" stroke="#FF9900" strokeWidth="5" fill="none" strokeLinecap="round" /><path fill="#FFF" d="M38 72V44h14c8 0 13 4 13 11 0 5-3 9-8 10.5L66 72H55l-8-15v15H38zm9-21v8h5c3 0 5-1.5 5-4s-2-4-5-4h-5z" /><path fill="#FF9900" d="M90 72l-14-28h10l9 19 9-19h10L100 72H90z" /></svg>,
  figma: <svg viewBox="0 0 128 128" className="w-5 h-5"><path fill="#F24E1E" d="M38 14h26v26H38z" /><path fill="#FF7262" d="M64 14h26a13 13 0 0 1 0 26H64z" /><path fill="#A259FF" d="M38 40h26v26H38z" /><path fill="#1ABCFE" d="M64 40a13 13 0 0 1 13 13 13 13 0 0 1-13 13z" /><path fill="#0ACF83" d="M38 66h26v13a13 13 0 0 1-26 0z" /></svg>,
  java: <svg viewBox="0 0 128 128" className="w-5 h-5"><path fill="#EA2D2E" d="M47.6 94.5s-4.2 2.4 3 3.2c8.7 1 13.2.9 22.8-.9 0 0 2.5 1.6 6 3-21.4 9.2-48.4-.5-31.8-5.3zm-2.6-11.9s-4.7 3.5 2.5 4.2c9.3.9 16.6 1 29.3-1.4 0 0 1.8 1.8 4.6 2.7-25.9 7.6-54.8.6-36.4-5.5z"/><path fill="#EA2D2E" d="M69.6 55.3c5.3 6.1-1.4 11.5-1.4 11.5s13.4-6.9 7.2-15.6c-5.7-8.1-10.1-12.1 13.7-26 0 0-37.4 9.3-19.5 30.1z"/><path fill="#EA2D2E" d="M98.3 102.6s3.1 2.6-3.4 4.6c-12.4 3.7-51.5 4.9-62.4.1-3.9-1.7 3.4-4 5.7-4.5 2.4-.5 3.7-.4 3.7-.4-4.3-3-27.6 5.9-11.8 8.5 42.9 6.9 78.2-3.1 68.2-8.3zM49.8 67.5s-19.7 4.7-7 6.4c5.4.7 16.1.6 26.1-.3 8.2-.7 16.4-2.3 16.4-2.3s-2.9 1.2-5 2.6c-20.1 5.3-58.9 2.8-47.7-2.5 9.4-4.5 17.2-3.9 17.2-3.9zm35.5 19.8c20.5-10.6 11-20.9 4.4-19.5-1.6.3-2.3.6-2.3.6s.6-1 1.7-1.4c12.8-4.5 22.6 13.3-4.2 20.3 0 0 .3-.3.4-1z"/><path fill="#EA2D2E" d="M75.5 3s11.2 11.2-10.7 28.5c-17.6 13.9-4 21.8 0 30.9-10.3-9.3-17.8-17.5-12.7-25.1C59.7 26.2 80.3 20.7 75.5 3z"/><path fill="#EA2D2E" d="M52 112.8c19.7 1.3 49.9-.7 50.6-10.1 0 0-1.4 3.5-16.3 6.3-16.8 3.1-37.5 2.8-49.8.8 0 0 2.5 2.1 15.5 3z"/></svg>,
  git: <svg viewBox="0 0 128 128" className="w-5 h-5"><path fill="#F05032" d="M123.6 57.4L70.6 4.4c-3.2-3.2-8.5-3.2-11.8 0L46 17.2l14.9 14.9c3.4-1.2 7.4-.4 10.1 2.3 2.7 2.7 3.5 6.7 2.3 10.1l14.4 14.4c3.4-1.2 7.4-.4 10.1 2.3 3.8 3.8 3.8 10 0 13.8-3.8 3.8-10 3.8-13.8 0-2.8-2.8-3.5-6.9-2.2-10.4L68.3 51v28.8c.8.4 1.5.9 2.2 1.6 3.8 3.8 3.8 10 0 13.8-3.8 3.8-10 3.8-13.8 0-3.8-3.8-3.8-10 0-13.8.9-.9 1.9-1.5 3-1.9V50.7c-1.1-.4-2.1-1-3-1.9-2.8-2.8-3.5-6.9-2.2-10.4L39.8 23.5 4.4 58.9c-3.2 3.2-3.2 8.5 0 11.8l53 53c3.2 3.2 8.5 3.2 11.8 0l54.4-54.4c3.3-3.3 3.3-8.6 0-11.9z" /></svg>,
};

const ALL_TECH: TechNode[] = [
  { id: 'nextjs', name: 'Next.js 15', badge: 'PRODUCTION WEB', category: 'frontend', description: 'Server components, streaming SSR, dynamic route handlers, middleware, and edge runtime deployments.', tags: ['RSC', 'APP ROUTER', 'EDGE DEPLOY'], icon: ICON.nextjs },
  { id: 'react', name: 'React 19', badge: 'CORE FRAMEWORK', category: 'frontend', description: 'Fiber architecture, concurrent rendering, custom hooks, transitions, and component state optimization.', tags: ['UI STATE', 'HOOKS', 'CONCURRENT'], icon: ICON.react },
  { id: 'typescript', name: 'TypeScript', badge: 'STRICT TYPES', category: 'frontend', description: 'Strict mathematical typing, complex generics, AST interfaces, and zero-runtime failure frontend & backend contracts.', tags: ['STATIC TYPING', 'ENTERPRISE', 'FULLSTACK'], icon: ICON.typescript },
  { id: 'javascript', name: 'JavaScript', badge: 'ASYNC ENGINE', category: 'frontend', description: 'Modern async/await paradigms, event loop mastery, Web APIs, and dynamic functional scripting.', tags: ['DOM', 'EVENT LOOP', 'V8 ENGINE'], icon: ICON.javascript },
  { id: 'tailwind', name: 'Tailwind CSS v4', badge: 'DESIGN TOKENS', category: 'frontend', description: 'Design token engineering, fluid typography clamps, strict spacing scales, and rapid zero-slop layout compilation.', tags: ['DESIGN SYSTEMS', 'TOKENS', 'RESPONSIVE'], icon: ICON.tailwind },
  { id: 'java', name: 'Java', badge: 'OOP & ENTERPRISE', category: 'backend', description: 'Object-oriented programming, data structures, algorithms, and enterprise-grade application development with Java SE.', tags: ['OOP', 'JVM', 'ALGORITHMS'], icon: ICON.java },
  { id: 'nodejs', name: 'Node.js & Express', badge: 'SERVICES / API', category: 'backend', description: 'Modular microservice routing, async proxy controllers, authentication tokens, and stream pipelines.', tags: ['EXPRESS', 'REST API', 'ASYNC'], icon: ICON.nodejs },
  { id: 'python', name: 'Python', badge: 'CORE STACK', category: 'backend', description: 'Primary language for algorithmic computing, data modeling, backend services, and automated data processing pipelines.', tags: ['AI / ML', 'BACKEND', 'DATA SCIENCE'], icon: ICON.python },
  { id: 'postgresql', name: 'PostgreSQL', badge: 'RELATIONAL DB', category: 'backend', description: 'Relational database architecture, strict foreign keys, indexing optimization, migrations, and ACID queries.', tags: ['SQL', 'RELATIONAL', 'INDEXING'], icon: ICON.postgresql },
  { id: 'git', name: 'Git & GitHub', badge: 'VERSION CONTROL', category: 'backend', description: 'Atomic commits, branching strategies, automated workflows, collaborative reviews, and Unix shell proficiency.', tags: ['CLI', 'VCS', 'WORKFLOW'], icon: ICON.git },
  { id: 'webgl', name: 'WebGL & GLSL', badge: 'INTERACTIVE VISUALS', category: 'other', description: 'Fragment shaders, Bayer matrix dithering, fluid particle veils, Raymarching, and real-time canvas mouse physics.', tags: ['SHADERS', 'GLSL', 'DITHERVEIL'], icon: ICON.webgl },
  { id: 'claude', name: 'Claude', badge: 'AI ASSISTANT', category: 'other', description: "Anthropic's frontier AI model used for code generation, architectural reasoning, and intelligent content drafting workflows.", tags: ['ANTHROPIC', 'LLM', 'CODE GEN'], icon: ICON.claude },
  { id: 'chatgpt', name: 'ChatGPT', badge: 'AI ASSISTANT', category: 'other', description: "OpenAI's GPT-4 model leveraged for rapid prototyping, debugging assistance, and natural language-driven development.", tags: ['OPENAI', 'GPT-4', 'PROMPTING'], icon: ICON.chatgpt },
  { id: 'gemini', name: 'Gemini', badge: 'AI ASSISTANT', category: 'other', description: "Google's multimodal AI model used for research synthesis, visual analysis, and cross-modal creative generation tasks.", tags: ['GOOGLE', 'MULTIMODAL', 'RESEARCH'], icon: ICON.gemini },
  { id: 'antigravity', name: 'Antigravity', badge: 'AI PLATFORM', category: 'other', description: 'AI-powered creative platform utilized for generative design exploration, concept ideation, and visual asset production.', tags: ['GENERATIVE', 'CREATIVE AI', 'DESIGN'], icon: ICON.antigravity },
  { id: 'amazonq', name: 'Amazon Q', badge: 'AI DEV TOOL', category: 'other', description: "AWS's AI-powered developer assistant used for intelligent code suggestions, cloud architecture guidance, and IDE-integrated productivity.", tags: ['AWS', 'IDE ASSIST', 'CLOUD AI'], icon: ICON.amazonq },
  { id: 'figma', name: 'Figma UI/UX', badge: 'PRODUCT DESIGN', category: 'other', description: 'Component libraries, variable tokens, auto-layout architectures, wireframes, and high-fidelity interaction prototypes.', tags: ['DESIGN SYSTEM', 'PROTOTYPING', 'TOKENS'], icon: ICON.figma },
  { id: 'capcut', name: 'CapCut', badge: 'VIDEO EDITING', category: 'other', description: 'Mobile and desktop video editing for social media content, reels, transitions, and cinematic short-form storytelling.', tags: ['VIDEO', 'SOCIAL MEDIA', 'EDITING'], icon: ICON.capcut },
  { id: 'canva', name: 'Canva', badge: 'VISUAL DESIGN', category: 'other', description: 'Rapid graphic design, social media assets, presentation decks, and branded visual content creation at scale.', tags: ['GRAPHICS', 'BRANDING', 'CONTENT'], icon: ICON.canva },
];

type Filter = 'all' | 'frontend' | 'backend' | 'other';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'ALL' },
  { key: 'frontend', label: 'FRONTEND' },
  { key: 'backend', label: 'BACKEND' },
  { key: 'other', label: 'OTHER' },
];

const CATEGORY_GROUPS = [
  { key: 'frontend' as Filter, label: 'FRONTEND & FRAMEWORKS' },
  { key: 'backend' as Filter, label: 'BACKEND & DEVOPS' },
  { key: 'other' as Filter, label: 'AI TOOLS & CREATIVE' },
];

function MarqueeRow({ items, reverse, label }: { items: TechNode[]; reverse: boolean; label: string; onSelect: (n: TechNode) => void; }) {
  // duplicate enough for seamless loop
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div className="relative">
      {/* Category label */}
      <div className="flex items-center gap-3 mb-3 px-6 md:px-16 lg:px-20">
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
        <span className="font-mono-code text-[10px] tracking-[0.28em] text-neutral-500 uppercase">{label}</span>
        <div className="flex-1 h-px bg-neutral-900" />
      </div>

      {/* Glowing line behind marquee */}
      <div className="relative">
        <div
          className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[2px] pointer-events-none z-0"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 10%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.12) 90%, transparent 100%)',
            boxShadow: '0 0 10px 2px rgba(255,255,255,0.3), 0 0 30px 4px rgba(255,255,255,0.12)',
          }}
        />

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden py-5">
          <div
            className="flex gap-4 w-max"
            style={{ animation: `ts-marquee-${reverse ? 'rev' : 'fwd'} ${items.length * 6}s linear infinite` }}
          >
            {repeated.map((node, i) => (
              <NodeChip key={`${node.id}-${i}`} node={node} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NodeChip({ node }: { node: TechNode }) {
  const [, forceUpdate] = useState(0);
  return (
    <button
      onClick={() => {
        // dispatch custom event to open modal
        window.dispatchEvent(new CustomEvent('technode:select', { detail: node }));
        forceUpdate(n => n + 1);
      }}
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#0f0f0f] border border-neutral-800 hover:border-white hover:shadow-[0_0_18px_rgba(255,255,255,0.35)] transition-all duration-300 cursor-pointer whitespace-nowrap group relative z-20"
    >
      <div className="w-5 h-5 flex items-center justify-center shrink-0">{node.icon}</div>
      <span className="font-mono-code text-xs font-semibold text-neutral-300 group-hover:text-white tracking-wider">
        {node.name}
      </span>
    </button>
  );
}

export const TechStackSection: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<TechNode | null>(null);

  React.useEffect(() => {
    const handler = (e: Event) => setSelected((e as CustomEvent).detail);
    window.addEventListener('technode:select', handler);
    return () => window.removeEventListener('technode:select', handler);
  }, []);

  const visibleGroups = CATEGORY_GROUPS;

  return (
    <section id="tech-stack" className="relative z-10 w-full min-h-screen flex flex-col justify-center pt-24 md:pt-32 pb-16 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/[0.012] rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 md:pb-10 border-b border-neutral-900/60 mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
              <span className="font-mono-code text-xs tracking-[0.28em] text-neutral-400 uppercase">SYSTEMS &amp; TOOLING ARCHITECTURE</span>
            </div>
            <h2 className="font-editorial-condensed text-4xl sm:text-6xl md:text-7xl font-bold uppercase text-white tracking-tight">TECH STACK</h2>
          </div>
          <div className="font-mono-code text-xs text-neutral-400 tracking-[0.2em] uppercase mt-4 sm:mt-0 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_6px_#ffffff] animate-pulse" />
            <span>PROGRAMMING LANGUAGE</span>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-3 mb-12 flex-wrap">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2 font-mono-code text-xs tracking-[0.22em] uppercase border transition-all duration-200 cursor-pointer rounded-full ${
                filter === f.key
                  ? 'bg-white text-black border-white shadow-[0_0_16px_rgba(255,255,255,0.4)]'
                  : 'bg-transparent text-neutral-400 border-neutral-700 hover:border-neutral-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Marquee Rows */}
      <div className="space-y-10">
          {visibleGroups.map((group, idx) => {
            const items = ALL_TECH.filter(t => t.category === group.key);
            const dimmed = filter !== 'all' && filter !== group.key;
            return (
              <div
                key={group.key}
                className="transition-all duration-500"
                style={{ opacity: dimmed ? 0.2 : 1, filter: dimmed ? 'grayscale(0.5)' : 'none' }}
              >
                <MarqueeRow
                  items={items}
                  reverse={idx % 2 !== 0}
                  label={group.label}
                  onSelect={setSelected}
                />
              </div>
            );
          })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md bg-[#111111] border border-neutral-700 rounded-2xl p-6 shadow-[0_30px_80px_rgba(0,0,0,0.9)]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 p-1.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                    {selected.icon}
                  </div>
                  <div>
                    <h3 className="font-editorial text-xl font-bold text-white">{selected.name}</h3>
                    <span className="font-mono-code text-[9px] text-neutral-400 tracking-[0.2em] uppercase">{selected.badge}</span>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="text-neutral-500 hover:text-white transition-colors cursor-pointer p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-neutral-300 font-sans leading-relaxed mb-5">{selected.description}</p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-800">
                {selected.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 text-[10px] font-mono-code bg-black/60 border border-neutral-800 text-neutral-400 rounded tracking-wider">{tag}</span>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes ts-marquee-fwd {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes ts-marquee-rev {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

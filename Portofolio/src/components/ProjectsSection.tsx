import React from 'react';
import { motion } from 'motion/react';
import BusFlowImg from '../assets/images/BusFlow.jpeg';
import EliteMotionImg from '../assets/images/EliteMotion.jpeg';
import GalacticHeroImg from '../assets/images/GalacticHero.jpeg';
import FitLifeImg from '../assets/images/FitLife.jpeg';

interface Project {
  id: string;
  index: string;
  title: string;
  role: string;
  category: string;
  year: string;
  tagline: string;
  stack: string[];
  image: string;
}

const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    index: 'REC_001',
    title: 'BUSFLOW',
    role: 'UI DESIGNER & FRONTEND DEV',
    category: 'TRANSIT OPTIMIZATION PLATFORM',
    year: '2025',
    tagline: 'Modern shuttle bus route optimization website with real-time scheduling and clean UI.',
    stack: ['React', 'Tailwind CSS', 'Figma', 'TypeScript', 'Mapbox GL'],
    image: BusFlowImg,
  },
  {
    id: 'proj-2',
    index: 'REC_002',
    title: 'ELITEMOTION',
    role: 'UI DESIGNER & FRONTEND DEV',
    category: 'LUXURY SPORTSCAR RENTAL',
    year: '2025',
    tagline: 'Premium sportscar rental platform with modern scheduling UI and high-end visual identity.',
    stack: ['React', 'Tailwind CSS', 'Figma', 'Motion', 'TypeScript'],
    image: EliteMotionImg,
  },
  {
    id: 'proj-3',
    index: 'REC_003',
    title: 'GALACTIC HERO',
    role: 'ASSETS MAKER',
    category: '2D PIXEL ARCADE GAME',
    year: '2025',
    tagline: 'Classic top-down 2D pixel arcade game inspired by 90s arcade cabinet aesthetics.',
    stack: ['Pixel Art', 'Aseprite', 'Unity', 'C#', 'Sprite Animation'],
    image: GalacticHeroImg,
  },
  {
    id: 'proj-4',
    index: 'REC_004',
    title: 'FITLIFE',
    role: 'PROJECT MANAGER',
    category: 'HEALTH & FITNESS APP',
    year: '2025',
    tagline: 'AI-powered healthy lifestyle app covering fitness, diet, bulking, and wellness routines.',
    stack: ['React Native', 'Figma', 'AI Integration', 'Node.js', 'Firebase'],
    image: FitLifeImg,
  },
];

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="relative z-10 w-full min-h-screen flex flex-col justify-between pt-24 md:pt-32 pb-8 md:pb-12"
    >
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20 flex-1 flex flex-col justify-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 md:pb-12 border-b border-neutral-900/60 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]"></span>
              <span className="font-mono-code text-xs tracking-[0.28em] text-neutral-400 uppercase">
                SELECTED WORKS // ARCHIVE
              </span>
            </div>
            <h2 className="font-editorial-condensed text-4xl sm:text-6xl md:text-7xl font-bold uppercase text-white tracking-tight">
              PROJECTS
            </h2>
          </div>

          <div className="font-mono-code text-xs text-neutral-400 tracking-[0.2em] uppercase mt-4 sm:mt-0 flex items-center gap-2">
            <span>[TOTAL: 04 INDEXED]</span>
            <span className="text-neutral-700">•</span>
            <span className="text-white">2025</span>
          </div>
        </motion.div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#0b0b0b] border border-neutral-800/90 hover:border-neutral-500 transition-all duration-300 relative group flex flex-col overflow-hidden"
              style={{ boxShadow: '0 0 0 1px transparent' }}
              whileHover={{
                boxShadow: '0 0 32px 4px rgba(255,255,255,0.06), 0 0 0 1px rgba(255,255,255,0.1)',
              }}
            >
              {/* Corner crosshairs */}
              <span className="absolute -top-2.5 -left-2 text-neutral-600 text-xs font-mono-code select-none pointer-events-none z-10">+</span>
              <span className="absolute -top-2.5 -right-2 text-neutral-600 text-xs font-mono-code select-none pointer-events-none z-10">+</span>
              <span className="absolute -bottom-2.5 -left-2 text-neutral-600 text-xs font-mono-code select-none pointer-events-none z-10">+</span>
              <span className="absolute -bottom-2.5 -right-2 text-neutral-600 text-xs font-mono-code select-none pointer-events-none z-10">+</span>

              {/* Project Image */}
              <div className="relative w-full h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-75 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0b0b0b]" />
                <span className="absolute top-3 right-3 font-mono-code text-[10px] tracking-[0.2em] text-neutral-300 bg-black/60 backdrop-blur-sm px-2.5 py-1 border border-neutral-700">
                  {project.year}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-7 sm:p-8 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4 font-mono-code text-xs">
                  <span className="text-neutral-500 tracking-[0.2em]">{project.index}</span>
                  <span className="text-neutral-400 tracking-[0.16em] uppercase text-[10px]">{project.category}</span>
                </div>

                <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-white group-hover:text-neutral-200 transition-colors mb-2">
                  {project.title}
                </h3>

                <p className="font-mono-code text-[11px] text-neutral-500 tracking-[0.2em] uppercase mb-4">
                  {project.role}
                </p>

                <p className="text-neutral-400 text-sm leading-relaxed font-sans flex-1">
                  {project.tagline}
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-[11px] font-mono-code bg-[#141414] border border-neutral-800 text-neutral-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Telemetry bottom */}
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20 pt-8 flex items-center justify-between font-mono-code text-[10px] text-neutral-500 tracking-[0.22em] uppercase">
        <span>CURATED ARCHIVE 2025</span>
        <span>ALL ARTIFACTS VERIFIED</span>
      </div>
    </section>
  );
};

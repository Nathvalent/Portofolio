import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Trophy, BookOpen, Calendar, MapPin } from 'lucide-react';
import petraCampusImage from '../assets/images/UKP.jpeg';
import esportsArenaImage from '../assets/images/MLBB.jpeg';
import classroomImage from '../assets/images/Teaching.jpeg';
import PatternWaves from './PatternWaves';

interface ExperienceItem {
  id: string;
  num: string;
  total: string;
  badge: string;
  category: string;
  period: string;
  title: string;
  organization: string;
  location: string;
  image: string;
  bullets: string[];
}

const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: 'exp-1',
    num: '01',
    total: '03',
    badge: 'ACADEMIC DEGREE',
    category: 'ACADEMIC FOUNDATION',
    period: '2024 — PRESENT',
    title: 'Undergraduate Informatics Engineering College Students',
    organization: 'Petra Christian University',
    location: 'Surabaya, Indonesia',
    image: petraCampusImage,
    bullets: [
      'Maintaining a 3.78 / 4.00 cumulative GPA with honors distinction across core algorithms and software engineering.',
      'Built a wide network of meaningful relationships with fellow students, lecturers, and campus communities across various disciplines.',
      'Consistently delivers assignments on time and demonstrates strong collaborative teamwork across group projects and coursework.',
    ],
  },
  {
    id: 'exp-2',
    num: '02',
    total: '03',
    badge: 'ESPORTS COMPETITION',
    category: 'COMPETITIVE GAMING',
    period: '2020 — 2025',
    title: 'Mobile Legends Competitive Tournament Circuit',
    organization: 'Esports Championship Division & Regional Circuits',
    location: 'Surabaya & Regional Tournaments',
    image: esportsArenaImage,
    bullets: [
      '1st Place Champion — Stella Maris Cup Esports Tournament (Grade 10 / High School)',
      '2nd Place Runner-Up — IGX (Informatics Games Expo) Esports Competition (Collegiate)',
      '3rd Place Winner — Universitas Ciputra (UC) Esports Tournament (Collegiate)',
      'Core Starting Roster — Bagian tim inti esports MLBB kampus selama Semester 1 & 2',
      '3rd Place Regional Winner — Surabaya & Sidoarjo Regional Tournament Championship (Grade 8 / Junior High)',
    ],
  },
  {
    id: 'exp-3',
    num: '03',
    total: '03',
    badge: 'EDUCATIONAL INSTRUCTION',
    category: 'PEDAGOGY & MENTORSHIP',
    period: '2025',
    title: 'Technology Instructor & Academic Mentor',
    organization: 'SMA Katolik St. Louis 1 & SD Kristen Gloria',
    location: 'Surabaya, Indonesia',
    image: classroomImage,
    bullets: [
      'Instructed high school scholars at SMA Katolik St. Louis 1 Surabaya (ranked among Indonesia’s top-tier academic secondary schools) in digital logic, programming fundamentals, and technology innovation.',
      'Conducted engaging creative computing and digital literacy workshops for young learners at SD Kristen Gloria Surabaya.',
      'Authored structured interactive curricula that transformed abstract programming concepts into practical, inspiring creative projects.',
    ],
  },
];

export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="relative z-10 w-full min-h-screen flex flex-col justify-between pt-24 md:pt-32 pb-16 overflow-hidden"
    >
      {/* PatternWaves background — static, no mouse interaction */}
      <div className="absolute inset-0 w-full h-full">
        <PatternWaves preset="silk" color="#ffffff" backgroundColor="#080808" fade="edges" interactive={false} speed={0.2} />
      </div>

      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/[0.015] rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 lg:px-16 flex-1 flex flex-col justify-center relative">
        {/* Section Header with scroll entry animation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 md:pb-12 border-b border-neutral-900/60 mb-14 md:mb-20"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]"></span>
              <span className="font-mono-code text-xs tracking-[0.28em] text-neutral-400 uppercase">
                TRAJECTORY &amp; COMPETENCIES
              </span>
            </div>
            <h2 className="font-editorial-condensed text-4xl sm:text-6xl md:text-7xl font-bold uppercase text-white tracking-tight">
              EXPERIENCE
            </h2>
            <p className="font-script text-2xl sm:text-3xl text-neutral-400 mt-2 tracking-wide select-none">
              Explore. Dream. Discover.
            </p>
          </div>

          <div className="font-mono-code text-xs text-neutral-500 tracking-[0.2em] uppercase mt-4 sm:mt-0 flex items-center gap-2">
            <span>[TIMELINE // 03 STAGES]</span>
            <span className="text-neutral-700">•</span>
          </div>
        </motion.div>

        {/* Zigzag Timeline Flow Container */}
        <div className="relative w-full space-y-16 md:space-y-24">
          {/* Continuous Glowing Ribbon Flow Lines behind cards (Desktop) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <svg
              className="w-full h-full overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.25))' }}
            >
              <defs>
                <linearGradient id="ribbonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
                  <stop offset="50%" stopColor="rgba(255, 255, 255, 0.25)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.6)" />
                </linearGradient>
              </defs>

              {/* Path 1: Card 1 (Left) -> Node -> Card 2 (Right) */}
              <path
                d="M 28% 18% C 50% 22%, 50% 38%, 72% 45%"
                fill="none"
                stroke="url(#ribbonGlow)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.7"
              />

              {/* Path 2: Card 2 (Right) -> Node -> Card 3 (Left) */}
              <path
                d="M 72% 52% C 50% 60%, 50% 75%, 28% 82%"
                fill="none"
                stroke="url(#ribbonGlow)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.7"
              />
            </svg>
          </div>

          {EXPERIENCES_DATA.map((exp, index) => {
            const isEven = index % 2 === 1; // 0: Left, 1: Right, 2: Left
            const Icon =
              index === 0 ? GraduationCap : index === 1 ? Trophy : BookOpen;

            return (
              <div
                key={exp.id}
                className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* The Card */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className={`lg:col-span-7 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  } bg-[#0c0c0c]/90 border border-neutral-800 hover:border-neutral-500 rounded-2xl p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.8)] relative group`}
                >
                  {/* Top Header Badge Row */}
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-900 mb-5 font-mono-code text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-white font-bold">
                        {exp.num}
                      </span>
                      <span className="px-2.5 py-0.5 rounded bg-[#161616] text-neutral-300 border border-neutral-800 tracking-wider">
                        {exp.badge}
                      </span>
                      <span className="text-neutral-500 hidden sm:inline-flex items-center gap-1.5 ml-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                    </div>

                    <div className="p-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-white">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Title & Organization */}
                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white mb-1.5 group-hover:text-neutral-100">
                    {exp.title}
                  </h3>

                  <p className="font-mono-code text-xs text-neutral-400 tracking-wider uppercase flex items-center gap-1.5 mb-5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{exp.organization}</span>
                  </p>

                  {/* Photo Showcase Area */}
                  <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-neutral-800/80 mb-6 group/img bg-[#111111]">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                    />

                    {/* Subtle dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Bullet Highlights */}
                  <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0 shadow-[0_0_6px_#ffffff]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                </motion.div>

                {/* Metadata Column on the opposite side */}
                <div
                  className={`lg:col-span-5 ${
                    isEven
                      ? 'lg:order-1 items-end text-right pr-6'
                      : 'lg:order-2 items-start text-left pl-6'
                  } hidden lg:flex flex-col justify-center`}
                >
                  <div
                    className={`flex items-center gap-3 mb-2 font-mono-code text-[11px] tracking-[0.24em] text-neutral-500 uppercase ${
                      isEven ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#ffffff] animate-pulse"></span>
                    <span>
                      {exp.num} / {exp.total} — {exp.category}
                    </span>
                  </div>
                  <h4 className="font-editorial text-2xl font-bold text-white mb-1">
                    {exp.title}
                  </h4>
                  <p className="font-mono-code text-xs text-neutral-400">
                    {exp.organization} • {exp.location}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer telemetry */}
      <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 lg:px-16 pt-12 flex items-center justify-between font-mono-code text-[10px] text-neutral-500 tracking-[0.22em] uppercase">
        <span>TIMELINE PERSISTENCE VERIFIED</span>
        <span>PETRA • MLBB ESPORTS • ST. LOUIS 1 &amp; GLORIA</span>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, Award } from 'lucide-react';
import AWSImg from '../assets/certificate/AWS.png';
import HubSpotImg from '../assets/certificate/Coursera HubSpot.png';

interface Certificate {
  id: string;
  index: string;
  title: string;
  source: string;
  category: string;
  year: string;
  image: string | null;
}

const CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    index: 'CERT_001',
    title: 'AWS Academy Graduate - Cloud Foundations',
    source: 'AWS',
    category: 'CLOUD',
    year: '2026',
    image: AWSImg,
  },
  {
    id: 'cert-2',
    index: 'CERT_002',
    title: 'Introduction to CRM with HubSpot',
    source: 'Coursera · HubSpot',
    category: 'MARKETING',
    year: '2026',
    image: HubSpotImg,
  },
];

export const CertificateSection: React.FC = () => {
  const [preview, setPreview] = useState<Certificate | null>(null);

  return (
    <section
      id="certificates"
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
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
              <span className="font-mono-code text-xs tracking-[0.28em] text-neutral-400 uppercase">
                VERIFIED CREDENTIALS // ARCHIVE
              </span>
            </div>
            <h2 className="font-editorial-condensed text-4xl sm:text-6xl md:text-7xl font-bold uppercase text-white tracking-tight">
              CERTIFICATES
            </h2>
          </div>

          <div className="font-mono-code text-xs text-neutral-400 tracking-[0.2em] uppercase mt-4 sm:mt-0 flex items-center gap-2">
            <span>[TOTAL: 02 INDEXED]</span>
            <span className="text-neutral-700">•</span>
            <span className="text-white">2026</span>
          </div>
        </motion.div>

        {/* Certificate List */}
        <div className="flex flex-col gap-0">
          {CERTIFICATES.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative flex items-center gap-6 px-6 sm:px-8 py-7 bg-[#0b0b0b] border border-neutral-800/80 hover:border-neutral-600 transition-all duration-300 mb-3"
              style={{ boxShadow: '0 0 0 1px transparent' }}
              whileHover={{
                boxShadow: '0 0 28px 3px rgba(255,255,255,0.05), 0 0 0 1px rgba(255,255,255,0.09)',
              }}
            >
              {/* Corner crosshairs */}
              <span className="absolute -top-2 -left-1.5 text-neutral-700 text-xs font-mono-code select-none pointer-events-none">+</span>
              <span className="absolute -top-2 -right-1.5 text-neutral-700 text-xs font-mono-code select-none pointer-events-none">+</span>
              <span className="absolute -bottom-2 -left-1.5 text-neutral-700 text-xs font-mono-code select-none pointer-events-none">+</span>
              <span className="absolute -bottom-2 -right-1.5 text-neutral-700 text-xs font-mono-code select-none pointer-events-none">+</span>

              {/* Category badge */}
              <span className="hidden sm:flex shrink-0 items-center justify-center font-mono-code text-[10px] tracking-[0.18em] uppercase text-neutral-300 bg-neutral-900 border border-neutral-700 px-3 py-1.5 min-w-[100px] text-center">
                {cert.category}
              </span>

              {/* Index + Icon */}
              <div className="flex items-center gap-3 shrink-0 sm:hidden">
                <Award className="w-4 h-4 text-neutral-500" />
              </div>

              {/* Main info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white group-hover:text-neutral-200 transition-colors truncate">
                  {cert.title}
                </h3>
                <div className="flex items-center gap-3 mt-1.5 font-mono-code text-[11px] text-neutral-500 tracking-[0.18em] uppercase">
                  <Award className="w-3 h-3 shrink-0" />
                  <span>{cert.source}</span>
                  <span className="text-neutral-700">·</span>
                  <span>{cert.year}</span>
                </div>
              </div>

              {/* Arrow button */}
              {cert.image && (
                <button
                  onClick={() => setPreview(cert)}
                  aria-label={`View certificate: ${cert.title}`}
                  className="shrink-0 w-10 h-10 rounded-full border border-neutral-700 bg-neutral-900 hover:bg-white hover:text-black text-neutral-300 flex items-center justify-center transition-all duration-200 cursor-pointer hover:border-white hover:shadow-[0_0_12px_rgba(255,255,255,0.3)]"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Image Modal */}
      <AnimatePresence>
        {preview && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl"
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 16 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-3xl w-full bg-[#0d0d0d] border border-neutral-700 shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPreview(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={preview.image!}
                alt={preview.title}
                className="w-full h-auto object-contain"
              />

              <div className="px-6 py-4 border-t border-neutral-800 flex items-center justify-between font-mono-code text-xs text-neutral-400 tracking-[0.18em] uppercase">
                <span>{preview.title}</span>
                <span>{preview.source} · {preview.year}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Telemetry bottom */}
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20 pt-8 flex items-center justify-between font-mono-code text-[10px] text-neutral-500 tracking-[0.22em] uppercase">
        <span>CREDENTIALS ARCHIVE 2026</span>
        <span>ALL VERIFIED</span>
      </div>
    </section>
  );
};

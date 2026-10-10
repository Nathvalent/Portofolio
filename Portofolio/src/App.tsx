/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { TechStackSection } from './components/TechStackSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { CertificateSection } from './components/CertificateSection';
import { ContactSection } from './components/ContactSection';
import { PageDivider } from './components/PageDivider';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#080808] text-white selection:bg-white selection:text-black">
      {/* Subtle Film Grain Texture Overlay */}
      <div className="pointer-events-none fixed inset-0 z-[2] bg-grain opacity-35" />

      {/* Atmospheric Vignette Gradients */}
      <div className="pointer-events-none fixed inset-0 z-[3] bg-gradient-to-r from-[#080808]/90 via-[#080808]/40 to-transparent" />
      <div className="pointer-events-none fixed inset-0 z-[3] bg-gradient-to-b from-[#080808]/85 via-transparent to-[#080808]/90" />

      <Navbar />

      <main className="relative z-10 w-full overflow-hidden flex flex-col">
        <HomeSection />
        <PageDivider />
        <AboutSection />
        <PageDivider reversed />
        <ExperienceSection />
        <PageDivider />
        <TechStackSection />
        <PageDivider reversed />
        <ProjectsSection />
        <PageDivider />
        <SkillsSection />
        <PageDivider />
        <CertificateSection />
        <PageDivider reversed />
        <ContactSection />
      </main>
    </div>
  );
}

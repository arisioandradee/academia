
import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { Benefits } from './components/Benefits';
import { Plans } from './components/Plans';
import { Structure } from './components/Structure';
import { Team } from './components/Team';
import { Location } from './components/Location';
import { CTA } from './components/CTA';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans selection:bg-brand-cyan selection:text-black overflow-x-hidden bg-background-dark">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <Benefits />
        <Structure />
        <Plans />
        <Team />
        <Location />
        <CTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default App;

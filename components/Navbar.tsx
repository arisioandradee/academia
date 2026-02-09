import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Estrutura', href: '#estrutura' },
    { name: 'Planos', href: '#planos' },
    { name: 'Equipe', href: '#equipe' },
    { name: 'Localização', href: '#localizacao' },
  ];

  return (
    <header className="fixed top-6 left-0 right-0 z-50 transition-all duration-500 px-4">
      <div className={`max-w-7xl mx-auto px-6 md:px-8 py-3 rounded-full flex justify-between items-center transition-all duration-300 ${isScrolled ? 'glass-nav shadow-2xl shadow-black/40 border border-white/10' : 'bg-black/20 backdrop-blur-sm border border-white/5'
        }`}>

        {/* Brand/Logo on Left */}
        <div className="flex items-center gap-3">
          <img src="/img/logoSemFundo.png" alt="Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
          <h2 className="text-sm md:text-base font-black tracking-tighter italic text-white uppercase whitespace-nowrap">
            Academia <span className="text-brand-cyan">Físico & Forma</span>
          </h2>
        </div>

        {/* Navigation Links and CTA */}
        <nav className="hidden xl:flex items-center gap-4 lg:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white text-[9px] font-bold uppercase tracking-[0.2em] hover:text-brand-cyan transition-colors"
            >
              {link.name}
            </a>
          ))}

          <a
            href="#planos"
            className="bg-brand-cyan hover:bg-cyan-400 text-black px-5 py-2 rounded-full text-[9px] font-black uppercase italic tracking-[0.15em] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-brand-cyan/20"
          >
            Matricule-se
          </a>
        </nav>

        {/* Mobile Toggle */}
        <div className="xl:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-1 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-3xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 bg-background-dark/95 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl xl:hidden z-40"
          >
            <nav className="flex flex-col gap-6 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white text-sm font-black uppercase tracking-[0.3em] italic hover:text-brand-cyan transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#planos"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center bg-brand-cyan text-black py-4 rounded-2xl text-xs font-black uppercase italic tracking-[0.2em] shadow-xl shadow-brand-cyan/20 mt-4"
              >
                Matricule-se
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

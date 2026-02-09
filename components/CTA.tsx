import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { DarkGradientBg } from './ui/ElegantDarkPattern';

export const CTA: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-16 px-4 overflow-hidden">
      <DarkGradientBg className="absolute inset-0 z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50, filter: 'blur(20px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1 }}
          className="relative overflow-hidden rounded-[3rem] bg-black/90 backdrop-blur-xl border border-white/5 p-12 md:p-20 flex flex-col items-center text-center shadow-3xl shadow-black/50"
        >
          {/* Efeitos de Fundo */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-orange/10 to-transparent skew-x-12 transform translate-x-1/4 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-brand-cyan/10 to-transparent -skew-x-12 transform -translate-x-1/4 pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl">
            <span className="text-brand-cyan text-xs font-black tracking-[0.5em] uppercase italic mb-6 block animate-pulse">O TEMPO NÃO ESPERA</span>
            <h2 className="text-4xl md:text-7xl font-black text-white mb-10 tracking-tighter italic uppercase leading-[0.9] drop-shadow-2xl">
              Sua melhor versão <br />
              <span className="text-brand-orange">começa hoje.</span>
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-12 font-medium drop-shadow-lg">
              Não deixe para segunda-feira o que você pode conquistar agora. Junte-se à elite do fitness em São Paulo.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="#planos"
                className="bg-brand-cyan hover:bg-white text-black px-12 py-5 rounded-2xl font-black italic uppercase tracking-widest text-sm transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-2xl shadow-brand-cyan/20"
              >
                ESCOLHER MEU PLANO <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

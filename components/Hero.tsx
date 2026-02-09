import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DarkGradientBg } from './ui/ElegantDarkPattern';

export const Hero: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const blurValue = useTransform(scrollYProgress, [0, 0.2], [0, 10]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);

  return (
    <section id="inicio" className="relative min-h-[95vh] flex items-center pt-32 pb-32 lg:pt-40 lg:pb-12 overflow-hidden">
      <DarkGradientBg className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
      </DarkGradientBg>

      <motion.div
        style={{ filter: `blur(${blurValue}px)`, opacity: opacityValue }}
        className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-32 items-center relative z-10"
      >
        {/* Lado Esquerdo: Conteúdo */}
        <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
              <span className="w-12 h-[2px] bg-brand-cyan"></span>
              <span className="text-brand-cyan font-black text-xs tracking-[0.4em] uppercase italic">
                A Melhor de Morada Nova
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.85] italic uppercase tracking-tighter mb-8 drop-shadow-2xl">
              TREINE <br />
              <span className="text-transparent stroke-text drop-shadow-md">COMO UM</span> <br />
              <span className="text-brand-cyan">CAMPEÃO.</span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl font-medium max-w-lg mb-10 leading-relaxed italic drop-shadow-md">
              A estrutura mais completa da região com profissionais dedicados ao seu resultado real.
            </p>

            <a
              href="#planos"
              className="inline-flex items-center gap-4 bg-white text-black px-10 py-5 rounded-2xl font-black uppercase italic tracking-widest hover:bg-brand-cyan transition-all transform hover:scale-105 shadow-2xl shadow-white/10 group mb-4 lg:mb-0"
            >
              Começar Agora
              <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </a>

            {/* Ícones Sociais */}
            <div className="w-full flex items-center justify-center lg:justify-start gap-10 mt-8 lg:mt-12 mb-4 lg:mb-0 lg:pl-1">
              <a
                href="https://www.instagram.com/Fisicoeforma_moradanova"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-brand-orange transition-all transform hover:-translate-y-1 hover:scale-110"
              >
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4.162 4.162 0 110-8.324 4.162 4.162 0 010 8.324zM18.406 3.506a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
                </svg>
              </a>
              <a
                href="https://wa.me/5588921502906"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-brand-green transition-all transform hover:-translate-y-1 hover:scale-110"
              >
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Lado Direito: Imagem do Ambiente */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full aspect-video lg:aspect-[4/5] max-w-2xl bg-[#111] rounded-[40px] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.9)] border border-white/5 group"
          >
            <img
              src="/img/estrutura4.webp"
              alt="Ambiente Físico & Forma"
              className="w-full h-full object-cover brightness-[0.85] group-hover:brightness-100 group-hover:scale-105 transition-all duration-[2000ms] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent pointer-events-none"></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};


'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from "lucide-react";

export const AboutSection: React.FC = () => {
  const contentRef = useRef(null);
  const isContentInView = useInView(contentRef, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="py-24 px-4 bg-white overflow-hidden relative">
      {/* Decorative Background Text */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 pointer-events-none select-none">
        <span className="text-[15rem] font-black text-gray-50/80 leading-none tracking-tighter uppercase italic">
          FORMA
        </span>
      </div>
      <div className="absolute top-1/3 right-0 -translate-y-1/2 pointer-events-none select-none">
        <span className="text-[12rem] font-black text-gray-50/50 leading-none tracking-tighter uppercase italic">
          FISICO
        </span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="relative mb-20">
          {/* Header Minimalista */}
          <div className="flex items-center gap-2">
            <span className="text-brand-cyan animate-pulse">✱</span>
            <span className="text-[10px] font-black text-gray-400 tracking-[0.4em] uppercase italic">
              SOBRE NÓS
            </span>
          </div>
        </div>

        {/* Conteúdo Focado no "Treino Sério" */}
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={isContentInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1 }}
          className="grid md:grid-cols-3 gap-16 lg:gap-24 items-start"
        >
          <div className="md:col-span-2">
            <h1 className="text-5xl md:text-7xl lg:text-[84px] !leading-[0.9] font-black text-accent-dark mb-16 italic uppercase tracking-tighter">
              TREINO SÉRIO PARA <br />
              <span className="text-brand-cyan">RESULTADOS</span> REAIS.
            </h1>

            <div className="grid md:grid-cols-2 gap-12 text-gray-500 relative">
              <div className="relative">
                <span className="absolute -top-8 -left-2 text-4xl font-black text-gray-100 italic pointer-events-none">01</span>
                <p className="leading-relaxed text-justify text-sm lg:text-base border-l-2 border-brand-cyan pl-6 relative z-10">
                  Acreditamos que a evolução física é fruto de disciplina e o ambiente certo.
                  Nossa estrutura foi desenhada para quem não aceita desculpas e busca performance de elite.
                </p>
              </div>
              <div className="relative">
                <span className="absolute -top-8 -left-2 text-4xl font-black text-gray-100 italic pointer-events-none">02</span>
                <p className="leading-relaxed text-justify text-sm lg:text-base relative z-10">
                  Aqui, ciência e força caminham juntas. Oferecemos o suporte técnico necessário para que
                  cada movimento conte e cada treino te leve mais perto do seu objetivo máximo.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 border border-gray-100 p-8 md:p-10 rounded-[2.5rem] bg-gray-50/30 backdrop-blur-sm self-center">
            <div className="text-left">
              <div className="flex gap-4 mb-6">
                <div className="h-1 w-8 bg-brand-cyan rounded-full"></div>
                <div className="h-1 w-2 bg-brand-orange rounded-full"></div>
              </div>
              <h4 className="text-accent-dark font-black text-2xl mb-8 leading-[1.1] italic uppercase tracking-tighter">
                PRONTO PARA<br />O PRÓXIMO NÍVEL?
              </h4>

              <a
                href="#planos"
                className="bg-accent-dark hover:bg-black text-white w-full py-6 rounded-2xl font-black italic uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all hover:gap-5 shadow-2xl shadow-black/20 group"
              >
                COMEÇAR AGORA
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

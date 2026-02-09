import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { DarkGradientBg } from './ui/ElegantDarkPattern';

const benefitList = [
  {
    icon: 'fitness_center',
    title: 'Equipamentos Elite',
    color: 'text-brand-cyan',
    bgColor: 'bg-brand-cyan/10',
    description: 'Aparelhos de última geração para máxima ativação muscular e ergonomia superior.'
  },
  {
    icon: 'speed',
    title: 'Alta Performance',
    color: 'text-brand-orange',
    bgColor: 'bg-brand-orange/10',
    description: 'Metodologias exclusivas focadas em resultados rápidos e sustentáveis a longo prazo.'
  },
  {
    icon: 'ac_unit',
    title: 'Ambiente Climatizado',
    color: 'text-brand-green',
    bgColor: 'bg-brand-green/10',
    description: 'Espaço projetado com climatização completa para seu total conforto e foco no treino.'
  }
];

export const Benefits: React.FC = () => {
  return (
    <section id="beneficios" className="relative py-32 overflow-hidden">
      <DarkGradientBg className="absolute inset-0 z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="text-brand-green text-[10px] font-black tracking-[0.5em] uppercase italic mb-4 block">DNA DE ALTA PERFORMANCE</span>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic uppercase leading-[0.85]">
              A EVOLUÇÃO <br />
              <span className="text-brand-green underline decoration-brand-green/20 decoration-4 underline-offset-8">DO SEU TREINO</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefitList.map((benefit, idx) => {
            const itemRef = useRef(null);
            const isInView = useInView(itemRef, { once: true, margin: "-100px" });


            return (
              <motion.div
                key={idx}
                ref={itemRef}
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="group p-12 bg-neutral-900/90 backdrop-blur-sm rounded-[3rem] border border-white/5 transition-all hover:bg-neutral-800/90 hover:border-brand-cyan/20 cursor-default shadow-2xl shadow-black/50"
              >
                <div className={`w-24 h-24 ${benefit.bgColor} rounded-3xl flex items-center justify-center ${benefit.color} mb-10 group-hover:scale-110 transition-transform duration-500 shadow-2xl`}>
                  <span className="material-symbols-outlined text-6xl">{benefit.icon}</span>
                </div>
                <h3 className="text-3xl font-black mb-6 text-white uppercase italic tracking-tighter">{benefit.title}</h3>
                <p className="text-white/50 leading-relaxed font-medium">
                  {benefit.description}
                </p>
                <div className={`mt-8 w-12 h-1 ${benefit.color.replace('text', 'bg')} opacity-20 group-hover:w-full transition-all duration-700`}></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

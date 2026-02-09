
'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const PricingWrapper: React.FC<{ children: React.ReactNode; className?: string; color: string }> = ({ children, className = '', color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden p-10 rounded-[3rem] flex flex-col h-full transition-all duration-500 hover:shadow-[0_40px_100px_rgba(0,0,0,0.5)] bg-accent-dark border border-white/5 group ${className}`}
    >
      {/* Glow de fundo correspondente à cor */}
      <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 ${color}`}></div>

      <div className="relative z-10 w-full flex flex-col h-full">
        {children}
        <a
          href="https://wa.me/5588921502906"
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-10 w-full font-black py-5 rounded-2xl uppercase tracking-[0.2em] italic transition-all transform hover:scale-105 shadow-xl flex items-center justify-center ${color.includes('cyan') ? 'bg-brand-cyan text-black hover:bg-white' :
              color.includes('orange') ? 'bg-brand-orange text-white hover:bg-white hover:text-black' :
                'bg-brand-green text-black hover:bg-white'
            }`}
        >
          Assinar Agora
        </a>
      </div>
    </motion.div>
  );
};

interface PlanOption {
  duration: string;
  price: string;
  description: string;
  color: string;
  features: string[];
}

const plansWithTreadmill: PlanOption[] = [
  { duration: 'MENSAL', price: '84,99', description: 'O primeiro passo para o topo.', color: 'bg-brand-orange', features: ['Acesso Musculação', 'Área de Cardio', 'Avaliação Inicial'] },
  { duration: 'TRIMESTRAL', price: '219,99', description: 'Comprometimento estratégico.', color: 'bg-brand-cyan', features: ['Treino Personalizado', 'Área de Cardio', 'Acesso VIP'] },
  { duration: 'SEMESTRAL', price: '433,99', description: 'Domine sua fisiologia.', color: 'bg-brand-orange', features: ['Avaliação de Bioimpedância', 'Recuperação Ativa', 'Acesso 24/7'] },
  { duration: 'ANUAL', price: '799,99', description: 'Transformação absoluta.', color: 'bg-brand-green', features: ['Gestão de Carreira Fitness', 'Área Elite', 'Bônus Nutrição'] },
];

const plansWithoutTreadmill: PlanOption[] = [
  { duration: 'MENSAL', price: '79,99', description: 'Foco total em força.', color: 'bg-brand-orange', features: ['Musculação Bruta', 'Área de Pesos Livres'] },
  { duration: 'TRIMESTRAL', price: '214,99', description: 'Consistência e vigor.', color: 'bg-brand-cyan', features: ['Plano de Força', 'Personal Trainer'] },
  { duration: 'SEMESTRAL', price: '407,99', description: 'Alta resistência.', color: 'bg-brand-orange', features: ['Biohacking Básico', '6 meses de foco'] },
  { duration: 'ANUAL', price: '759,99', description: 'Legado de aço.', color: 'bg-brand-green', features: ['Tudo Incluso', 'Máximo Desconto'] },
];

export const Plans: React.FC = () => {
  const [withTreadmill, setWithTreadmill] = useState(true);
  const activePlans = withTreadmill ? plansWithTreadmill : plansWithoutTreadmill;

  return (
    <section id="planos" className="py-32 bg-background-dark relative">
      {/* Grid decorativo */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="text-brand-orange text-[10px] font-black tracking-[0.6em] uppercase italic mb-6 block animate-pulse">INVESTIMENTO NO SEU LEGADO</span>
          <h2 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase mb-12 leading-[0.85]">
            DOMINE O SEU <br />
            <span className="text-brand-cyan">DESTINO.</span>
          </h2>

          <div className="inline-flex bg-white/5 p-2 rounded-3xl border border-white/10">
            <button
              onClick={() => setWithTreadmill(true)}
              className={`px-10 py-4 rounded-2xl font-black italic uppercase tracking-widest transition-all text-[10px] ${withTreadmill
                  ? 'bg-brand-cyan text-black shadow-2xl shadow-brand-cyan/20 scale-105'
                  : 'text-white/40 hover:text-white'
                }`}
            >
              Com esteira
            </button>
            <button
              onClick={() => setWithTreadmill(false)}
              className={`px-10 py-4 rounded-2xl font-black italic uppercase tracking-widest transition-all text-[10px] ${!withTreadmill
                  ? 'bg-brand-cyan text-black shadow-2xl shadow-brand-cyan/20 scale-105'
                  : 'text-white/40 hover:text-white'
                }`}
            >
              Sem esteira
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="wait">
            {activePlans.map((plan, idx) => (
              <PricingWrapper
                key={`${withTreadmill}-${idx}`}
                color={plan.color}
              >
                <div className="mb-10">
                  <span className={`text-[10px] font-black tracking-[0.4em] uppercase italic opacity-50 block mb-4 ${plan.color.replace('bg', 'text')}`}>
                    PLANO {plan.duration}
                  </span>
                  <div className="text-white text-5xl font-black italic tracking-tighter mb-2">
                    <span className="text-xl align-top mr-1">R$</span>
                    {plan.price}
                  </div>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest italic">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.color.replace('bg', 'bg-opacity-20')} border border-white/10`}>
                        <Check size={12} className={plan.color.replace('bg', 'text')} strokeWidth={4} />
                      </div>
                      <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">{feature}</span>
                    </div>
                  ))}
                </div>
              </PricingWrapper>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

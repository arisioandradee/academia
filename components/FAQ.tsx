
'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqData = [
  {
    question: "A ACADEMIA POSSUI ESTACIONAMENTO PRÓPRIO?",
    answer: "Não, mas é fácil de estacionar."
  },
  {
    question: "QUAIS OS HORÁRIOS DE MAIOR MOVIMENTO?",
    answer: "Nossos picos ocorrem entre 07:00-09:00 e 18:00-20:30. Fora desses horários, a experiência é exclusiva."
  },
  {
    question: "VOCÊS ACEITAM GYMPASS OU TOTALPASS?",
    answer: "Não. Focamos em planos próprios para garantir a qualidade superior e o acompanhamento de elite."
  },
  {
    question: "COMO FUNCIONA A AVALIAÇÃO INICIAL?",
    answer: "É um protocolo de bioimpedância e análise biomecânica completa inclusa em todos os planos."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-brand-orange text-[10px] font-black tracking-[0.5em] uppercase italic mb-4 block">ESCLARECIMENTOS</span>
          <h2 className="text-5xl font-black text-accent-dark tracking-tighter italic uppercase">
            FAQ <span className="text-brand-cyan">ELITE</span>
          </h2>
        </div>

        <div className="space-y-6">
          {faqData.map((item, idx) => (
            <div
              key={idx}
              className={`border-b border-gray-100 transition-all ${openIndex === idx ? 'pb-8' : 'pb-6'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex justify-between items-center group text-left"
              >
                <span className={`text-sm md:text-lg font-black italic uppercase tracking-tight transition-all ${openIndex === idx ? 'text-brand-cyan translate-x-2' : 'text-accent-dark'}`}>
                  {item.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === idx ? 'bg-brand-cyan text-black rotate-180' : 'bg-gray-50 text-gray-300 group-hover:bg-accent-dark group-hover:text-white'}`}>
                  {openIndex === idx ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pt-6 text-gray-400 font-medium leading-relaxed max-w-2xl italic">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

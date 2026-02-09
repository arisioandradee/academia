'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const structureImages = [
  {
    src: '/img/estrutura1.webp',
    title: 'STRENGTH ZONE',
    span: 'md:col-span-2 md:row-span-2',
    label: 'Elite Machinery'
  },
  {
    src: '/img/estrutura2.webp',
    title: 'CARDIO ELITE',
    span: '',
    label: 'Hi-Tech Performance'
  },
  {
    src: '/img/estrutura3.webp',
    title: 'RECOVERY',
    span: '',
    label: 'Zen Flow'
  },
  {
    src: '/img/estrutura4.webp',
    title: 'FUNCTIONAL AREA',
    span: 'md:col-span-2',
    label: 'Natural Movement'
  }
];

export const Structure: React.FC = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="estrutura" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={isHeaderInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <span className="text-brand-cyan text-[10px] font-black tracking-[0.5em] uppercase italic mb-4 block">INFRAESTRUTURA DE ELITE</span>
          <h2 className="text-5xl md:text-7xl font-black text-accent-dark tracking-tighter italic uppercase mb-6 leading-none">
            AMBIENTE PROJETADO <br />
            <span className="text-gray-300 italic font-black">PARA SUPERAÇÃO</span>
          </h2>
          <div className="w-24 h-1 bg-brand-cyan mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
          {structureImages.map((img, idx) => {
            const itemRef = useRef(null);
            const isItemInView = useInView(itemRef, { once: true, margin: "-100px" });

            return (
              <motion.div
                key={idx}
                ref={itemRef}
                initial={{ opacity: 0, y: 50, filter: 'blur(15px)' }}
                animate={isItemInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className={`${img.span} rounded-[2.5rem] overflow-hidden relative group cursor-crosshair border border-gray-100 shadow-2xl shadow-black/5`}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

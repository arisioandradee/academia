
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, MessageCircle } from 'lucide-react';

const teamMembers = [
  {
    name: 'Ricardo Silva',
    role: 'Personal trainer',
    img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop'
  },
  {
    name: 'Juliana Mendes',
    role: 'Personal trainer',
    img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1974&auto=format&fit=crop'
  },
  {
    name: 'Marcos Antunes',
    role: 'Personal trainer',
    img: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1974&auto=format&fit=crop'
  },
  {
    name: 'Carla Viegas',
    role: 'Personal trainer',
    img: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1974&auto=format&fit=crop'
  }
];

export const Team: React.FC = () => {
  return (
    <section id="equipe" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-brand-cyan text-[10px] font-black tracking-[0.5em] uppercase italic mb-4 block">OS MELHORES DO MERCADO</span>
          <h2 className="text-5xl md:text-7xl font-black text-accent-dark tracking-tighter italic uppercase mb-6">
            MENTES QUE <span className="text-gray-300">GUIAM SEU CORPO</span>
          </h2>
          <div className="w-24 h-1 bg-brand-cyan mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl shadow-black/5 relative bg-accent-dark">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                  <div className="flex gap-4">
                    <a href="https://www.instagram.com/Fisicoeforma_moradanova" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-cyan/20 border border-brand-cyan/20 backdrop-blur-md flex items-center justify-center text-brand-cyan hover:bg-brand-cyan hover:text-black transition-all">
                      <Instagram size={18} />
                    </a>
                    <a href="https://wa.me/5588921502906" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-orange/20 border border-brand-orange/20 backdrop-blur-md flex items-center justify-center text-brand-orange hover:bg-brand-orange hover:text-white transition-all">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-black text-accent-dark mb-1 uppercase italic tracking-tight">{member.name}</h3>
              <p className="text-brand-orange font-black text-[10px] tracking-[0.3em] uppercase italic">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-accent-dark text-white pt-20 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-black mb-6 tracking-tighter italic uppercase italic">
              Academia <span className="text-brand-cyan">Físico & Forma</span>
            </h2>
            <p className="text-gray-400 max-w-sm font-medium leading-relaxed">
              Onde a alta performance encontra o luxo. Treinamento de elite focado em resultados reais e longevidade.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-6">Navegação</h4>
            <ul className="space-y-4">
              <li><a href="#sobre" className="text-gray-400 hover:text-brand-cyan transition-colors text-sm font-bold uppercase tracking-widest italic">Sobre Nós</a></li>
              <li><a href="#planos" className="text-gray-400 hover:text-brand-orange transition-colors text-sm font-bold uppercase tracking-widest italic">Nossos Planos</a></li>
              <li><a href="#estrutura" className="text-gray-400 hover:text-brand-green transition-colors text-sm font-bold uppercase tracking-widest italic">Equipamentos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-6">Social</h4>
            <ul className="space-y-4">
              <li><a href="https://www.instagram.com/Fisicoeforma_moradanova" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-cyan transition-colors text-sm font-bold uppercase tracking-widest italic">Instagram</a></li>
              <li><a href="https://wa.me/5588921502906" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-orange transition-colors text-sm font-bold uppercase tracking-widest italic">WhatsApp</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
            © 2024 Academia Físico & Forma. Todos os direitos reservados.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};


import React from 'react';

export const Location: React.FC = () => {
  return (
    <section id="localizacao" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-brand-orange text-xs font-black tracking-[0.4em] uppercase italic mb-4 block">LOCALIZAÇÃO ESTRATÉGICA</span>
            <h2 className="text-4xl md:text-5xl font-black text-accent-dark mb-8 tracking-tighter italic uppercase">
              NO CORAÇÃO DE <span className="text-brand-cyan">MORADA NOVA</span>
            </h2>

            <div className="space-y-10">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-accent-dark flex items-center justify-center text-brand-cyan shadow-lg transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-3xl">location_on</span>
                </div>
                <div>
                  <h4 className="font-black text-xl text-accent-dark italic uppercase mb-1">Nosso Endereço</h4>
                  <p className="text-gray-500 leading-relaxed font-medium">Morada Nova CE</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-accent-dark flex items-center justify-center text-brand-orange shadow-lg transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-3xl">schedule</span>
                </div>
                <div>
                  <h4 className="font-black text-xl text-accent-dark italic uppercase mb-1">Horários de Treino</h4>
                  <p className="text-gray-500 leading-relaxed font-medium">Seg-Sex: 05h às 22h | Sáb: 08h às 14h<br />Dom: 08h às 12h</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-accent-dark flex items-center justify-center text-brand-green shadow-lg transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-3xl">directions_car</span>
                </div>
                <div>
                  <h4 className="font-black text-xl text-accent-dark italic uppercase mb-1">Localização</h4>
                  <p className="text-gray-500 leading-relaxed font-medium">Fácil acesso e excelente localização.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2.5rem] overflow-hidden border-8 border-background-light shadow-[0_40px_100px_rgba(0,0,0,0.1)] relative h-[500px] lg:h-[600px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.982592795524!2d-38.3765898!3d-5.106505799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7bbe7b51b5d7fcd%3A0x60c6b8221452d545!2sAcademia%20F%C3%ADsico%20%26%20Forma!5e0!3m2!1spt-BR!2sbr!4v1770651652530!5m2!1spt-BR!2sbr"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              title="Studio Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

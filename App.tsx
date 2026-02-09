import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CatalogPage from './components/CatalogPage';
import AdminDashboard from './components/AdminDashboard';
import SellerLogin from './components/SellerLogin';
import { IMAGES, CONTACT_INFO, VEHICLES } from './constants';
import { Vehicle, Seller } from './types';
import { vehicleService, sellerService } from './services/supabase';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'catalog' | 'seller'>('landing');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isSellerSelectionOpen, setIsSellerSelectionOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeStore, setActiveStore] = useState<'motors' | 'motos'>('motors');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const initData = async () => {
      try {
        const data = await vehicleService.getVehicles();
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    const fetchSellers = async () => {
      try {
        const data = await sellerService.getSellers();
        setSellers(data.filter(s => s.active && !s.isAdmin));
      } catch (error) {
        console.error('Error fetching sellers:', error);
      }
    };

    initData();
    fetchSellers();

    const auth = localStorage.getItem('rainerio_auth');
    if (auth === 'true') {
      setIsLoggedIn(true);
    }

    const handleReveal = () => {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add('reveal-visible');
        }
      });
    };

    window.addEventListener('scroll', handleReveal);
    handleReveal();
    return () => window.removeEventListener('scroll', handleReveal);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const handleLogin = (sellerData: any) => {
    setIsLoggedIn(true);
    localStorage.setItem('rainerio_auth', 'true');
    localStorage.setItem('rainerio_seller_name', sellerData.name);
    // Use snake_case image_url from Supabase object
    localStorage.setItem('rainerio_seller_photo', sellerData.image_url || '');
    setIsLoginOpen(false);
    setCurrentPage('seller');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('rainerio_auth');
    localStorage.removeItem('rainerio_seller_name');
    localStorage.removeItem('rainerio_seller_photo');
    setCurrentPage('landing');
  };

  const handleUpdateVehicles = async (newVehicles: Vehicle[]) => {
    try {
      await vehicleService.syncAll(newVehicles);
      setVehicles(newVehicles);
    } catch (error) {
      console.error('Error syncing vehicles:', error);
      throw error; // Rethrow to let the UI handle the error
    }
  };

  const scrollToSection = (id: string) => {
    if (currentPage !== 'landing') {
      setCurrentPage('landing');
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const getAllFeatured = () => {
    const featured = vehicles.filter(v => v.featured);
    if (featured.length >= 3) return featured.slice(0, 3);
    const nonFeatured = vehicles.filter(v => !v.featured);
    return [...featured, ...nonFeatured].slice(0, 3);
  };

  const featuredVehicles = getAllFeatured();

  const renderNavbar = () => (
    <Navbar
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      onLoginClick={() => setIsLoginOpen(true)}
      isLoggedIn={isLoggedIn}
      onLogout={handleLogout}
      scrollToSection={scrollToSection}
    />
  );

  return (
    <div className="relative min-h-screen bg-background-dark selection:bg-primary selection:text-background-dark">
      {renderNavbar()}

      {/* Main Content Areas */}
      <main>
        {currentPage === 'seller' ? (
          <div className="pt-32 pb-20 bg-background-dark min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
              <AdminDashboard
                vehicles={vehicles}
                onUpdateVehicles={handleUpdateVehicles}
                onLogout={handleLogout}
                onClose={() => setCurrentPage('landing')}
              />
            </div>
          </div>
        ) : currentPage === 'catalog' ? (
          <CatalogPage vehicles={vehicles} sellers={sellers} />
        ) : (
          <>
            {/* Landing Page Content */}
            <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden bg-background-dark">
              <div className="absolute inset-0 z-0">
                <img src={IMAGES.hero} alt="Hero" className="w-full h-full object-cover scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-black/40 z-10"></div>
              </div>
              <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full relative z-20 pt-24">
                <div className="flex flex-col items-start text-left max-w-4xl animate-[fade-in-up_1s_ease-out]">
                  <div className="mb-8 flex items-center gap-4">
                    <span className="h-[1px] w-12 bg-primary/50"></span>
                    <span className="text-primary tracking-[0.5em] uppercase text-[10px] font-black italic">Excelência em Morada Nova</span>
                  </div>
                  <h1 className="serif-title text-6xl md:text-8xl lg:text-9xl text-white font-medium leading-[1] mb-8">
                    Onde o <span className="italic font-light text-primary">Sonho</span> <br /> encontra a <span className="italic font-light text-primary">Realidade</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mb-12 leading-relaxed">
                    Sua melhor escolha em veículos de qualidade. O maior e mais completo estoque de <span className="text-white font-bold">Morada Nova e região</span>.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-6 w-full animate-[fade-in-up_1.2s_ease-out]">
                    <button onClick={() => setCurrentPage('catalog')} className="w-full sm:w-auto min-w-[260px] bg-primary text-background-dark px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl hover:scale-105 hover:bg-white active:scale-95">Explorar Catálogo</button>
                    <button onClick={() => document.getElementById('loja')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto min-w-[200px] border border-white/20 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest bg-white/10 backdrop-blur-xl transition-all hover:bg-white/20">Nossa Loja</button>
                  </div>
                </div>
              </div>
            </section>

            <section id="loja" className="py-32 bg-background-light overflow-hidden reveal">
              <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-24">
                  <div className="relative group overflow-hidden rounded-[40px] bg-neutral-900 shadow-2xl">
                    <img src={IMAGES.showroom} alt="Showroom" className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" />
                  </div>
                  <div className="flex flex-col gap-8 reveal slide-right">
                    <h2 className="serif-title text-5xl md:text-7xl text-background-dark font-medium leading-tight">Tradição e Transparência <br /><span className="italic font-light text-primary">em cada negócio</span></h2>
                    <p className="text-background-dark/70 text-lg leading-relaxed font-light">
                      Na Rainério Motors, acreditamos que a compra de um carro vai muito além de uma transação comercial — é a realização de um objetivo.
                      Por isso, oferecemos um atendimento humano e personalizado, focado em entender sua necessidade real e entregar a melhor solução.
                      Trabalhamos apenas com veículos rigorosamente selecionados, garantindo a você a segurança de um excelente negócio.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { title: "Procedência Garantida", desc: "Veículos com histórico verificado e laudo cautelar aprovado para sua segurança.", icon: "verified" },
                    { title: "Atendimento Humano", desc: "Consultores especializados prontos para tirar todas as suas dúvidas com transparência.", icon: "support_agent" },
                    { title: "Facilidade de Crédito", desc: "Parceria com os principais bancos para garantir as melhores taxas e aprovação rápida.", icon: "payments" },
                    { title: "Pós-Venda Dedicado", desc: "Suporte completo após a compra para garantir que sua experiência continue sendo excelente.", icon: "auto_awesome" }
                  ].map((benefit, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[30px] border border-black/5 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all reveal scale-up" style={{ transitionDelay: `${idx * 0.1}s` }}>
                      <span className="material-symbols-outlined text-primary text-3xl mb-4">{benefit.icon}</span>
                      <h4 className="text-background-dark font-bold text-lg mb-2">{benefit.title}</h4>
                      <p className="text-background-dark/50 text-sm leading-relaxed">{benefit.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="preview-catalogo" className="py-32 bg-background-dark">
              <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="flex flex-col md:flex-row justify-between mb-16 gap-6">
                  <div>
                    <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block reveal">Destaques do Mês</span>
                    <h2 className="serif-title text-4xl md:text-5xl text-white font-medium reveal">Nossa Coleção de Elite</h2>
                  </div>
                  <button onClick={() => setCurrentPage('catalog')} className="w-fit h-fit border border-white/20 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all">Ver Todos</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {featuredVehicles.map((car, idx) => (
                    <div key={idx} className="group bg-carbon-soft rounded-3xl overflow-hidden border border-white/5 transition-all hover:border-primary/40 shadow-2xl reveal scale-up" style={{ transitionDelay: `${idx * 0.1}s` }}>
                      <div className="aspect-video overflow-hidden relative">
                        <img src={car.image} alt={car.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <h3 className="text-white text-2xl font-bold tracking-tight mb-1">{car.name}</h3>
                          <p className="text-primary/90 text-[10px] font-black uppercase tracking-widest">{car.year} • {car.km}</p>
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="flex items-center justify-between">
                          <p className="text-white font-black text-xl">{car.hidePrice ? 'Sob consulta' : (car.price.startsWith('R$') ? car.price : `R$ ${car.price}`)}</p>
                          <button onClick={() => { setSelectedVehicle(car); setCurrentImageIndex(0); }} className="bg-primary/10 hover:bg-primary text-primary hover:text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all">Detalhes</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="especialistas" className="py-32 bg-background-light reveal">
              <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="text-center mb-16">
                  <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Nossa Equipe</span>
                  <h2 className="serif-title text-4xl md:text-5xl text-background-dark font-medium leading-tight italic">Fale com nossos <br /><span className="text-background-dark not-italic font-bold">Experts</span></h2>
                </div>
                <div className="flex flex-wrap justify-center gap-10">
                  {sellers.map((specialist, idx) => (
                    <div key={idx} className="group bg-white border border-black/5 shadow-xl shadow-black/5 p-8 rounded-[40px] text-center hover:border-primary/50 transition-all reveal scale-up w-full sm:w-[calc(50%-20px)] lg:w-[calc(25%-30px)] min-w-[260px] max-w-[300px]" style={{ transitionDelay: `${idx * 0.1}s` }}>
                      <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors">
                        <img src={specialist.imageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'} alt={specialist.name} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="text-background-dark font-bold text-xl mb-1">{specialist.name}</h4>
                      <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">{specialist.role}</p>
                      <div className="flex justify-center gap-4">
                        <a href={`https://wa.me/55${specialist.whatsapp?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black/40 hover:bg-[#25D366] hover:text-white transition-all">
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                        </a>
                        <a href={`https://instagram.com/${specialist.instagram?.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black/40 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white transition-all">
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5a4.25 4.25 0 0 0-4.25 4.25v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" /></svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="localizacao" className="py-32 bg-background-dark reveal overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
                  <div className="lg:col-span-2 flex flex-col justify-center gap-12">
                    <div className="space-y-4">
                      <span className="text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">Onde Estamos</span>
                      <h2 className="serif-title text-4xl md:text-6xl text-white font-medium leading-tight italic">Visite nossas <br /><span className="text-white not-italic font-bold">Lojas</span></h2>
                    </div>

                    <div className="flex flex-col gap-4">
                      {/* Schedule Highlight */}
                      <div className="flex items-start gap-4 p-6 bg-primary/5 rounded-3xl border border-primary/20 shadow-[0_0_20px_rgba(236,182,19,0.05)] mb-2">
                        <span className="material-symbols-outlined text-primary text-2xl">schedule</span>
                        <div>
                          <h4 className="text-primary font-bold text-sm uppercase tracking-widest mb-1">Horário de Atendimento</h4>
                          <p className="text-white/80 text-xs leading-relaxed font-light">Segunda à Sexta: 08:00h às 18:00h<br />Sábado: 08:00h às 12:00h</p>
                        </div>
                      </div>

                      {/* Store Switcher */}
                      <button
                        onClick={() => setActiveStore('motors')}
                        className={`flex items-start gap-4 p-6 rounded-3xl border transition-all text-left ${activeStore === 'motors' ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(236,182,19,0.1)]' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                      >
                        <span className={`material-symbols-outlined text-2xl ${activeStore === 'motors' ? 'text-primary' : 'text-white/40'}`}>location_on</span>
                        <div>
                          <h4 className={`font-bold text-sm uppercase tracking-widest mb-1 ${activeStore === 'motors' ? 'text-primary' : 'text-white'}`}>Rainério Motors</h4>
                          <p className="text-white/60 text-xs leading-relaxed font-light">Rua Martinho Lutero, 2301 - Morada Nova, CE</p>
                        </div>
                      </button>

                      <button
                        onClick={() => setActiveStore('motos')}
                        className={`flex items-start gap-4 p-6 rounded-3xl border transition-all text-left ${activeStore === 'motos' ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(236,182,19,0.1)]' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                      >
                        <span className={`material-symbols-outlined text-2xl ${activeStore === 'motos' ? 'text-primary' : 'text-white/40'}`}>motorcycle</span>
                        <div>
                          <h4 className={`font-bold text-sm uppercase tracking-widest mb-1 ${activeStore === 'motos' ? 'text-primary' : 'text-white'}`}>Rainério Motos</h4>
                          <p className="text-white/60 text-xs leading-relaxed font-light">Rua Cipriano Maia, 477 - Centro, Morada Nova, CE</p>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-3 h-[500px] relative reveal scale-up">
                    <div className="absolute inset-0 bg-neutral-900 rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
                      <iframe
                        src={activeStore === 'motors'
                          ? "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15896.291796493255!2d-38.372877751342784!3d-5.09190685073752!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7bea104e62c6f0d%3A0xc1c0b58696f8d71d!2sRAIN%C3%89RIO%20MOTORS%20%E2%9C%94%20%7C%20Carros%2C%20Usados%2C%20Novos%2C%20Carta%20de%20cr%C3%A9dito%2C%20Financiamento%2C%20Nacionais%2C%20Importados%20%2C%20Caminh%C3%B5es.!5e0!3m2!1spt-BR!2sus!4v1770589697316!5m2!1spt-BR!2sus"
                          : "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13579.176356131658!2d-38.37216359888393!3d-5.101509585749386!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7bbe6c89e72512f%3A0x7c0eccdb7af5288c!2sRainerio%20Motos!5e0!3m2!1spt-BR!2sus!4v1770589726233!5m2!1spt-BR!2sus"
                        }
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="grayscale hover:grayscale-0 transition-all duration-700"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="py-24 bg-background-light overflow-hidden reveal">
              <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="bg-white border border-black/5 rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden group shadow-2xl shadow-black/5">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div>
                  <div className="relative z-10 flex flex-col items-center gap-8">
                    <h2 className="serif-title text-4xl md:text-6xl text-background-dark font-medium leading-[1.1]">
                      Não perca tempo, fale com um <br />
                      <span className="text-primary not-italic font-black">vendedor da Rainério Motors</span>
                    </h2>
                    <p className="text-background-dark/40 text-lg max-w-2xl font-light">
                      Nossa equipe de especialistas está pronta para ajudar você a conquistar seu próximo carro premium com as melhores condições do mercado.
                    </p>
                    <button
                      onClick={() => scrollToSection('especialistas')}
                      className="mt-4 bg-primary text-background-dark px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_50px_rgba(236,182,19,0.2)] active:scale-95 flex items-center gap-4"
                    >
                      <span className="material-symbols-outlined text-lg">chat</span>
                      Falar com Consultor
                    </button>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-all duration-700"></div>
                  <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-all duration-700"></div>
                </div>
              </div>
            </section>

            <section id="faq" className="py-32 bg-background-dark reveal overflow-hidden">
              <div className="max-w-4xl mx-auto px-6 lg:px-10">
                <div className="text-center mb-16">
                  <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Dúvidas Frequentes</span>
                  <h2 className="serif-title text-4xl md:text-5xl text-white font-medium">Perguntas Comuns</h2>
                </div>
                <div className="space-y-6">
                  {[
                    { q: "Quais as formas de pagamento?", a: "Aceitamos financiamento por todos os bancos, cartões de crédito em até 21x e recebemos seu usado na troca com a melhor avaliação do mercado." },
                    { q: "Os veículos possuem garantia?", a: "Sim, todos os nossos veículos passam por uma rigorosa inspeção técnica de mais de 100 itens e possuem garantia completa de motor e câmbio." },
                    { q: "Vocês entregam em outras cidades?", a: "Sim, entregamos em todo o estado do Ceará e estados vizinhos com frete grátis ou subsidiado, garantindo segurança e agilidade." },
                    { q: "Como faço para agendar um test-drive?", a: "É simples! Basta clicar no botão de WhatsApp de um de nossos consultores na seção Equipe ou visitar nossa loja em Morada Nova." }
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`p-8 bg-white/5 border rounded-[30px] transition-all cursor-pointer group ${openFaq === i ? 'border-primary/50' : 'border-white/10 hover:border-white/20'}`}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-primary font-bold text-lg flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] text-primary">0{i + 1}</span>
                          {item.q}
                        </h4>
                        <span className={`material-symbols-outlined text-primary transition-transform duration-500 ${openFaq === i ? 'rotate-180' : ''}`}>expand_more</span>
                      </div>
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <p className="text-white/60 text-base leading-relaxed pl-9">{item.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Persistent Modals & Components */}
      {
        currentPage !== 'seller' && (
          <Footer onAdminOpen={() => setIsLoginOpen(true)} onNavigate={setCurrentPage} scrollToSection={scrollToSection} />
        )
      }

      {isLoginOpen && <SellerLogin onLogin={handleLogin} onClose={() => setIsLoginOpen(false)} />}

      {
        selectedVehicle && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedVehicle(null)}></div>
            <div className="relative w-full max-w-5xl bg-background-dark border border-white/10 rounded-[40px] overflow-hidden shadow-2xl animate-[scale-up_0.4s_ease-out]">
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full max-h-[90vh] overflow-y-auto lg:overflow-visible">
                <div className="relative h-[400px] lg:h-full bg-neutral-900 group">
                  <img src={selectedVehicle.gallery && selectedVehicle.gallery.length > 0 ? selectedVehicle.gallery[currentImageIndex] : selectedVehicle.image} alt={selectedVehicle.name} className="w-full h-full object-cover" />
                  {selectedVehicle.gallery && selectedVehicle.gallery.length > 1 && (
                    <>
                      <button onClick={() => setCurrentImageIndex(prev => prev === 0 ? selectedVehicle.gallery!.length - 1 : prev - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-primary transition-all opacity-0 group-hover:opacity-100"><span className="material-symbols-outlined">chevron_left</span></button>
                      <button onClick={() => setCurrentImageIndex(prev => (prev + 1) % selectedVehicle.gallery!.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-primary transition-all opacity-0 group-hover:opacity-100"><span className="material-symbols-outlined">chevron_right</span></button>
                    </>
                  )}
                </div>
                <div className="p-8 lg:p-12 flex flex-col">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <span className="text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-2 block">{selectedVehicle.brand} • {selectedVehicle.year}</span>
                      <h2 className="text-white text-4xl lg:text-5xl font-bold tracking-tight">{selectedVehicle.name}</h2>
                    </div>
                    <button onClick={() => setSelectedVehicle(null)} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all"><span className="material-symbols-outlined">close</span></button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5"><p className="text-white/30 text-[9px] uppercase font-black mb-1">KM</p><p className="text-white font-bold">{selectedVehicle.km}</p></div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5"><p className="text-white/30 text-[9px] uppercase font-black mb-1">Câmbio</p><p className="text-white font-bold uppercase">{selectedVehicle.transmission || 'Auto'}</p></div>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed mb-10 italic">{selectedVehicle.description || 'Veículo impecável, disponível para visitação.'}</p>
                  <div className="mt-auto flex flex-col sm:flex-row gap-4">
                    <button onClick={() => setIsSellerSelectionOpen(true)} className="flex-1 bg-primary text-background-dark py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white transition-all shadow-xl active:scale-95"><span className="material-symbols-outlined text-lg">chat</span>Falar com Vendedor</button>
                    <button onClick={() => setSelectedVehicle(null)} className="sm:w-32 h-[60px] rounded-2xl bg-red-500/10 text-red-500 font-black text-[10px] uppercase transition-all hover:bg-red-500 hover:text-white">Voltar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }

      {
        isSellerSelectionOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setIsSellerSelectionOpen(false)}></div>
            <div className="relative w-full max-w-sm bg-background-dark border border-white/10 rounded-[40px] p-8 animate-[scale-up_0.3s_ease-out]">
              <h3 className="text-white text-xl font-bold mb-8 text-center uppercase tracking-tight">Falar com um Consultor</h3>
              <div className="space-y-4">
                {sellers.length > 0 ? (
                  sellers.map(seller => (
                    <button
                      key={seller.id}
                      onClick={() => {
                        const message = encodeURIComponent(`Olá ${seller.name}, tenho interesse no veículo ${selectedVehicle?.name} que vi no site.`);
                        window.open(`https://wa.me/55${seller.whatsapp?.replace(/\D/g, '')}?text=${message}`, '_blank');
                        setIsSellerSelectionOpen(false);
                      }}
                      className="w-full flex items-center gap-5 p-4 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/50 hover:bg-white/10 transition-all group"
                    >
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors">
                        <img src={seller.imageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'} className="w-full h-full object-cover" alt={seller.name} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-white font-bold text-sm">{seller.name}</p>
                        <p className="text-primary text-[9px] font-black uppercase tracking-widest">{seller.role || 'ESPECIALISTA'}</p>
                      </div>
                      <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">send</span>
                    </button>
                  ))
                ) : (
                  <p className="text-white/40 text-center text-xs">Nenhum consultor online.</p>
                )}
              </div>
              <button onClick={() => setIsSellerSelectionOpen(false)} className="w-full mt-6 text-white/20 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Fechar</button>
            </div>
          </div>
        )
      }

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fade-in-up { 
          from { opacity: 0; transform: translateY(30px); filter: blur(10px); } 
          to { opacity: 1; transform: translateY(0); filter: blur(0); } 
        }
        @keyframes scale-up { 
          from { opacity: 0; transform: scale(0.95); filter: blur(10px); } 
          to { opacity: 1; transform: scale(1); filter: blur(0); } 
        }
        .reveal { 
          opacity: 0; 
          transform: translateY(40px); 
          filter: blur(10px);
          transition: all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1); 
          will-change: transform, opacity, filter;
        }
        .reveal-visible { 
          opacity: 1; 
          transform: translateY(0); 
          filter: blur(0);
        }
        .serif-title { font-family: 'Playfair Display', serif; }
        .text-gradient-gold { background: linear-gradient(to right, #ecb613, #fff, #ecb613); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      `}} />
    </div>
  );
};

const Footer: React.FC<{ onAdminOpen: () => void, onNavigate: (p: any) => void, scrollToSection: (id: string) => void }> = ({ onAdminOpen, onNavigate, scrollToSection }) => (
  <footer className="bg-background-dark border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col gap-12">
        {/* Top Row: Logo & Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img src="/img/logo.png" alt="Logo" className="h-8 w-fit object-contain" />
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              {[
                { label: 'Início', onClick: () => { onNavigate('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
                { label: 'Sobre', onClick: () => scrollToSection('loja') },
                { label: 'Catálogo', onClick: () => onNavigate('catalog') },
                { label: 'Equipe', onClick: () => scrollToSection('especialistas') },
                { label: 'Localização', onClick: () => scrollToSection('localizacao') },
              ].map(item => (
                <button key={item.label} onClick={item.onClick} className="text-white/30 hover:text-primary text-[10px] font-black uppercase tracking-widest transition-colors">{item.label}</button>
              ))}
            </nav>
          </div>

          <div className="flex flex-col items-center md:items-end text-center md:text-right gap-2">
            <h4 className="text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-1">Localização</h4>
            <p className="text-white font-light text-sm">{CONTACT_INFO.address}</p>
            <a href={`tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`} className="text-white/60 hover:text-primary transition-colors text-base font-light mt-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">phone</span>
              {CONTACT_INFO.phone}
            </a>
          </div>
        </div>

        {/* Bottom Row: Credits */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest">
          <div className="flex flex-col md:flex-row items-center gap-4 text-white/10 italic">
            <p>&copy; {new Date().getFullYear()} <span className="text-white/20 not-italic">Rainério Motors.</span> Todos os direitos reservados.</p>
            <span className="hidden md:block w-4 h-[1px] bg-white/5"></span>
            <div className="flex items-center gap-2">
              <span>Feito por</span>
              <span className="text-primary/40 not-italic font-black flex items-center gap-1">
                Vortexa.PH
                <span className="material-symbols-outlined text-[10px]">rocket_launch</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default App;

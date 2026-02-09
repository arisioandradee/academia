import React, { useState } from 'react';

interface NavbarProps {
  onNavigate: (page: 'landing' | 'catalog' | 'seller') => void;
  currentPage: 'landing' | 'catalog' | 'seller';
  onLoginClick: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  scrollToSection: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onLoginClick, isLoggedIn, onLogout, scrollToSection }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sellerPhoto = localStorage.getItem('rainerio_seller_photo') || '';
  const sellerName = localStorage.getItem('rainerio_seller_name') || 'Vendedor';

  const menuItems = [
    { label: 'Início', onClick: () => { onNavigate('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMenuOpen(false); }, active: currentPage === 'landing' },
    { label: 'Sobre', onClick: () => scrollToSection('loja'), active: false },
    { label: 'Catálogo', onClick: () => { onNavigate('catalog'); setIsMenuOpen(false); }, active: currentPage === 'catalog' },
    { label: 'Equipe', onClick: () => scrollToSection('especialistas'), active: false },
    { label: 'Localização', onClick: () => scrollToSection('localizacao'), active: false },
  ];

  if (isLoggedIn) {
    menuItems.push({ label: 'Painel', onClick: () => { onNavigate('seller'); setIsMenuOpen(false); }, active: currentPage === 'seller' });
  }

  return (
    <>
      <header className={`fixed top-4 md:top-6 left-0 right-0 z-[100] px-4 md:px-6 flex justify-center transition-all duration-300 pointer-events-none ${isMenuOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
        <div className="max-w-5xl w-full flex items-center justify-between pointer-events-auto bg-black/70 backdrop-blur-3xl border border-white/10 rounded-full px-6 md:px-8 py-2 md:py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { onNavigate('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <img src="/img/logoSideNav.png" alt="Rainério Motors" className="h-6 md:h-8 cursor-pointer object-contain" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 ${item.active ? 'text-primary' : 'text-white/70 hover:text-white'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => onNavigate('catalog')}
                className="bg-gradient-to-r from-primary via-[#ffd700] to-primary text-background-dark px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-primary/40 transform hover:-translate-y-0.5"
              >
                Comprar agora
              </button>

              {isLoggedIn ? (
                <button
                  onClick={() => onNavigate('seller')}
                  className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 text-primary"
                  title="Painel Master"
                >
                  <span className="material-symbols-outlined text-lg leading-none">person</span>
                </button>
              ) : (
                <button
                  onClick={onLoginClick}
                  className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 text-white/30 hover:text-white"
                  title="Acesso Vendedor"
                >
                  <span className="material-symbols-outlined text-lg leading-none">person</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white transition-all active:scale-90"
            >
              <span className="material-symbols-outlined text-2xl leading-none">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[150] lg:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          onClick={() => setIsMenuOpen(false)}
        ></div>

        <div className={`absolute inset-y-0 right-0 w-[80%] max-w-sm bg-background-dark/50 backdrop-blur-2xl border-l border-white/10 flex flex-col p-10 transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-center mb-16">
            <img src="/img/logoSideNav.png" alt="Rainério Motors" className="h-10 object-contain" />
          </div>

          <nav className="flex flex-col gap-8">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className={`text-left text-lg font-bold tracking-[0.2em] uppercase transition-all ${item.active ? 'text-primary' : 'text-white/40'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-6">
            <button
              onClick={() => { onNavigate('catalog'); setIsMenuOpen(false); }}
              className="w-full bg-gradient-to-r from-primary via-[#ffd700] to-primary text-background-dark py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20"
            >
              Comprar agora
            </button>

            {!isLoggedIn ? (
              <button
                onClick={() => { onLoginClick(); setIsMenuOpen(false); }}
                className="w-full bg-white/5 text-white/40 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-white/10"
              >
                Painel do Vendedor
              </button>
            ) : (
              <button
                onClick={() => { onNavigate('seller'); setIsMenuOpen(false); }}
                className="w-full bg-primary/10 text-primary py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20"
              >
                Meu Painel Master
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};


export default Navbar;

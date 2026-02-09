
import React, { useState, useMemo } from 'react';
import { Vehicle, Seller } from '../types';

interface CatalogPageProps {
  vehicles: Vehicle[];
  sellers: Seller[];
}

const CatalogPage: React.FC<CatalogPageProps> = ({ vehicles, sellers }) => {
  const [filterType, setFilterType] = useState<string>('Todos');
  const [filterBrand, setFilterBrand] = useState<string>('Todas');
  const [filterColor, setFilterColor] = useState<string>('Todas');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isSellerSelectionOpen, setIsSellerSelectionOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const types = useMemo(() => ['Todos', ...Array.from(new Set(vehicles.map(v => v.type)))].sort(), [vehicles]);
  const brands = useMemo(() => ['Todas', ...Array.from(new Set(vehicles.map(v => v.brand)))], [vehicles]);
  const colors = useMemo(() => ['Todas', ...Array.from(new Set(vehicles.map(v => v.color)))], [vehicles]);

  const filteredVehicles = useMemo(() => {
    let result = [...vehicles].filter(v => {
      const matchType = filterType === 'Todos' || v.type === filterType;
      const matchBrand = filterBrand === 'Todas' || v.brand === filterBrand;
      const matchColor = filterColor === 'Todas' || v.color === filterColor;
      return matchType && matchBrand && matchColor;
    });

    if (sortBy === 'price-asc') result.sort((a, b) => a.priceNumeric - b.priceNumeric);
    if (sortBy === 'price-desc') result.sort((a, b) => b.priceNumeric - a.priceNumeric);
    if (sortBy === 'year-desc') result.sort((a, b) => b.year - a.year);

    return result;
  }, [vehicles, filterType, filterBrand, filterColor, sortBy]);

  return (
    <div className="pt-32 pb-24 bg-background-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-12">
          <h1 className="serif-title text-4xl md:text-6xl text-white mb-4">Catálogo Completo</h1>
          <p className="text-white/40 max-w-2xl font-light">Explore nosso estoque exclusivo de veículos premium, motos de alta cilindrada e blindados de elite.</p>
        </div>

        {/* Filters Bar */}
        <div className="bg-carbon-soft p-6 rounded-3xl border border-white/5 mb-12 flex flex-wrap gap-6 items-end">
          <div className="flex-1 min-w-[150px]">
            <label className="block text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-2">Tipo</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full bg-white/5 border-white/10 text-white rounded-xl text-sm focus:border-primary focus:ring-primary"
            >
              {types.map(t => <option key={t} value={t} className="bg-background-dark">{t}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-2">Marca</label>
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="w-full bg-white/5 border-white/10 text-white rounded-xl text-sm focus:border-primary focus:ring-primary"
            >
              {brands.map(b => <option key={b} value={b} className="bg-background-dark">{b}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-2">Cor</label>
            <select
              value={filterColor}
              onChange={(e) => setFilterColor(e.target.value)}
              className="w-full bg-white/5 border-white/10 text-white rounded-xl text-sm focus:border-primary focus:ring-primary"
            >
              {colors.map(c => <option key={c} value={c} className="bg-background-dark">{c}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-2">Ordenar por</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-white/5 border-white/10 text-white rounded-xl text-sm focus:border-primary focus:ring-primary"
            >
              <option value="featured" className="bg-background-dark">Destaques</option>
              <option value="price-asc" className="bg-background-dark">Preço: Menor para Maior</option>
              <option value="price-desc" className="bg-background-dark">Preço: Maior para Menor</option>
              <option value="year-desc" className="bg-background-dark">Mais novos</option>
            </select>
          </div>
          <button
            onClick={() => { setFilterType('Todos'); setFilterBrand('Todas'); setFilterColor('Todas'); setSortBy('featured'); }}
            className="h-[42px] px-6 text-[10px] font-black uppercase text-white/40 hover:text-white transition-colors"
          >
            Limpar
          </button>
        </div>

        {/* Results Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((v) => (
              <div key={v.id} className="group bg-carbon-soft rounded-3xl overflow-hidden border border-white/5 transition-all hover:border-primary/40 shadow-xl flex flex-col h-full">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={v.image} alt={v.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{v.type}</span>
                    {v.featured && <span className="bg-primary text-background-dark text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Destaque</span>}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white text-2xl font-bold tracking-tight">{v.name}</h3>
                  </div>
                  <p className="text-primary text-xs font-black uppercase tracking-widest mb-4">{v.brand}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <p className="text-white/30 text-[9px] uppercase font-bold mb-1">Ano</p>
                      <p className="text-white text-sm font-bold">{v.year}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <p className="text-white/30 text-[9px] uppercase font-bold mb-1">Quilometragem</p>
                      <p className="text-white text-sm font-bold">{v.km}</p>
                    </div>
                  </div>

                  {v.description && (
                    <div className="mb-8">
                      <p className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-2 italic">Diferenciais</p>
                      <p className="text-white/60 text-xs font-light leading-relaxed line-clamp-3">
                        {v.description}
                      </p>
                    </div>
                  )}

                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-white/20 text-[9px] font-black uppercase tracking-widest mb-1">Preço Especial</p>
                      <p className="text-primary font-black text-2xl">{v.hidePrice ? 'Sob consulta' : (v.price.startsWith('R$') ? v.price : `R$ ${v.price}`)}</p>
                    </div>
                    <button
                      onClick={() => setSelectedVehicle(v)}
                      className="bg-primary hover:bg-white text-background-dark px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg hover:shadow-primary/30"
                    >
                      Mais Detalhes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <span className="material-symbols-outlined text-6xl text-white/10 mb-4">search_off</span>
            <p className="text-white/40 font-light text-xl">Nenhum veículo encontrado com os filtros selecionados.</p>
          </div>
        )}

        {/* Vehicle Details Modal */}
        {selectedVehicle && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedVehicle(null)}></div>
            <div className="relative w-full max-w-5xl bg-background-dark border border-white/10 rounded-[40px] overflow-hidden shadow-2xl animate-[scale-up_0.4s_ease-out]">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-red-800 to-red-600 py-6 px-10 text-center border-b border-white/10">
                <h2 className="text-white font-black text-2xl uppercase tracking-[0.3em] drop-shadow-lg">
                  {selectedVehicle.brand} {selectedVehicle.name}
                </h2>
              </div>

              <div className="flex flex-col lg:flex-row">
                {/* Image Section */}
                <div className="lg:w-1/2 p-8 lg:p-12 bg-white/5 flex flex-col justify-center items-center relative">
                  <div className="absolute top-8 left-8 z-10">
                    <span className="bg-primary text-background-dark text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Disponível</span>
                  </div>
                  <div className="relative w-full aspect-[3/4] lg:aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl group bg-black/20">
                    <img
                      src={selectedVehicle.gallery && selectedVehicle.gallery.length > 0 ? selectedVehicle.gallery[currentImageIndex] : selectedVehicle.image}
                      alt={selectedVehicle.name}
                      className="w-full h-full object-cover animate-[fade-in_0.5s_ease-out]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                    {/* Navigation Arrows if gallery exists */}
                    {selectedVehicle.gallery && selectedVehicle.gallery.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentImageIndex(prev => prev === 0 ? selectedVehicle.gallery!.length - 1 : prev - 1)}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-primary hover:text-background-dark transition-all"
                        >
                          <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex(prev => prev === selectedVehicle.gallery!.length - 1 ? 0 : prev + 1)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-primary hover:text-background-dark transition-all"
                        >
                          <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Gallery Thumbnails */}
                  {selectedVehicle.gallery && selectedVehicle.gallery.length > 1 && (
                    <div className="flex gap-3 mt-6 w-full overflow-x-auto pb-2 side-scrollbar">
                      {selectedVehicle.gallery.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`flex-shrink-0 w-20 aspect-square rounded-xl overflow-hidden border-2 transition-all ${currentImageIndex === idx ? 'border-primary' : 'border-white/10 opacity-40 hover:opacity-100'}`}
                        >
                          <img src={img} className="w-full h-full object-cover" alt={`Thumb ${idx}`} />
                        </button>
                      ))}
                    </div>
                  )}
                  {/* Small Info Over Image (Style of the reference) */}
                  <div className="mt-8 flex gap-6 w-full justify-center">
                    <div className="text-center border-r border-white/10 pr-6">
                      <p className="text-white/20 text-[8px] uppercase font-black mb-1">Ano</p>
                      <p className="text-white font-bold text-xs">{selectedVehicle.year}</p>
                    </div>
                    <div className="text-center border-r border-white/10 pr-6">
                      <p className="text-white/20 text-[8px] uppercase font-black mb-1">Câmbio</p>
                      <p className="text-white font-bold text-xs uppercase">{selectedVehicle.transmission || 'Automático'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/20 text-[8px] uppercase font-black mb-1">Motor</p>
                      <p className="text-white font-bold text-xs uppercase">{selectedVehicle.engine || 'Consultar'}</p>
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col">
                  <div className="mb-8">
                    <h3 className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-2">Valor do Investimento</h3>
                    <p className="text-primary text-5xl font-black drop-shadow-[0_0_20px_rgba(236,182,19,0.2)]">
                      {selectedVehicle.hidePrice ? 'Sob consulta' : (selectedVehicle.price.startsWith('R$') ? selectedVehicle.price : `R$ ${selectedVehicle.price}`)}
                    </p>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 bg-white/[0.03] rounded-[32px] p-8 border border-white/5 mb-8">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-white/30 text-[9px] uppercase font-black">KM:</span>
                      <span className="text-white text-xs font-bold">{selectedVehicle.km}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-white/30 text-[9px] uppercase font-black">Cor:</span>
                      <span className="text-white text-xs font-bold">{selectedVehicle.color || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-white/30 text-[9px] uppercase font-black">Pneus:</span>
                      <span className="text-white text-xs font-bold">{selectedVehicle.tires || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-white/30 text-[9px] uppercase font-black">Bancos:</span>
                      <span className="text-white text-xs font-bold">{selectedVehicle.seats || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-white/30 text-[9px] uppercase font-black">Manual:</span>
                      <span className="text-white text-xs font-bold">{selectedVehicle.manualProp || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-white/30 text-[9px] uppercase font-black">Chave:</span>
                      <span className="text-white text-xs font-bold">{selectedVehicle.spareKey || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="mb-10">
                    <h4 className="text-white/40 text-[10px] uppercase font-black mb-3">Outras Informações</h4>
                    <p className="text-white/70 text-sm leading-relaxed font-light italic border-l-2 border-primary pl-4 max-h-24 overflow-y-auto">
                      {selectedVehicle.description || 'Sem informações adicionais.'}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <button
                      onClick={() => setIsSellerSelectionOpen(true)}
                      className="flex-1 bg-primary text-background-dark py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white transition-all shadow-xl shadow-primary/20 active:scale-95"
                    >
                      <span className="material-symbols-outlined text-lg">chat</span>
                      Falar com Vendedor
                    </button>
                    <button
                      onClick={() => setSelectedVehicle(null)}
                      className="sm:w-32 h-[60px] rounded-2xl bg-red-500/10 text-red-500 font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                    >
                      Voltar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Seller Selection Modal */}
        {isSellerSelectionOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setIsSellerSelectionOpen(false)}></div>
            <div className="relative w-full max-w-sm bg-background-dark border border-white/10 rounded-[32px] p-6 animate-[scale-up_0.3s_ease-out]">
              <h3 className="text-white text-lg font-bold mb-6 text-center">Falar com um Especialista</h3>
              <div className="space-y-3">
                {sellers.length > 0 ? (
                  sellers.map(seller => (
                    <button
                      key={seller.id}
                      onClick={() => {
                        const message = encodeURIComponent(`Olá ${seller.name}, tenho interesse no veículo ${selectedVehicle?.name} (${selectedVehicle?.brand} ${selectedVehicle?.year}) que vi no site Rainério Motors.`);
                        window.open(`https://wa.me/55${seller.whatsapp?.replace(/\D/g, '')}?text=${message}`, '_blank');
                        setIsSellerSelectionOpen(false);
                      }}
                      className="w-full flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-white/10 transition-all group text-left"
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/20">
                        <img src={seller.imageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'} className="w-full h-full object-cover" alt={seller.name} />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-bold text-xs">{seller.name}</p>
                        <p className="text-primary text-[8px] font-black uppercase tracking-widest">{seller.role || 'ESPECIALISTA'}</p>
                      </div>
                      <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">send</span>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Nenhum especialista online</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;

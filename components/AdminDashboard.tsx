
import React, { useState, useMemo } from 'react';
import { Vehicle, Seller } from '../types';
import { vehicleService, sellerService } from '../services/supabase';

interface AdminDashboardProps {
  vehicles: Vehicle[];
  onUpdateVehicles: (vehicles: Vehicle[]) => Promise<void>;
  onClose: () => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ vehicles, onUpdateVehicles, onClose, onLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [newType, setNewType] = useState('');
  const [isAddingNewType, setIsAddingNewType] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'vehicles' | 'sellers'>('vehicles');
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [editingSellerId, setEditingSellerId] = useState<string | null>(null);
  const [sellerToDelete, setSellerToDelete] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isOpen: boolean;
  }>({ message: '', type: 'info', isOpen: false });

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotification({ message, type, isOpen: true });
    setTimeout(() => setNotification(prev => ({ ...prev, isOpen: false })), 4000);
  };

  const [sellerFormData, setSellerFormData] = useState<Partial<Seller>>({
    name: '',
    role: 'VENDEDOR',
    imageUrl: '',
    whatsapp: '',
    instagram: '',
    email: '',
    username: '',
    password: '',
    active: true,
    isAdmin: false
  });

  React.useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const data = await sellerService.getSellers();
      setSellers(data);
    } catch (error) {
      console.error('Error fetching sellers:', error);
    }
  };

  const handleSellerFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await vehicleService.uploadVehicleImage(file);
      setSellerFormData(prev => ({ ...prev, imageUrl: url }));
    } catch (error) {
      showNotification('Erro ao subir imagem.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSellerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const defaultLogo = '/img/logo.png';

      await sellerService.saveSeller({
        ...sellerFormData,
        imageUrl: sellerFormData.imageUrl || defaultLogo,
        id: editingSellerId || undefined
      });
      fetchSellers();
      showNotification('Especialista salvo com sucesso!', 'success');
      setIsSellerModalOpen(false);
      setEditingSellerId(null);
      setSellerFormData({
        name: '', role: 'VENDEDOR', imageUrl: '', whatsapp: '', instagram: '', email: '', username: '', password: '', active: true, isAdmin: false
      });
    } catch (error: any) {
      console.error('Detailed error saving seller:', error);
      if (error.message?.includes('violates not-null constraint') && error.message?.includes('password')) {
        showNotification('Por favor, defina uma senha para o novo especialista.', 'error');
      } else {
        showNotification(`Erro ao salvar vendedor: ${error.message || 'Erro desconhecido'}`, 'error');
      }
    }
  };

  const handleEditSeller = (seller: Seller) => {
    setEditingSellerId(seller.id);
    setSellerFormData({ ...seller });
    setIsSellerModalOpen(true);
  };

  const handleDeleteSeller = (id: string) => {
    setSellerToDelete(id);
  };

  const confirmDeleteSeller = async () => {
    if (sellerToDelete) {
      await sellerService.deleteSeller(sellerToDelete);
      fetchSellers();
      setSellerToDelete(null);
      showNotification('Especialista removido com sucesso!', 'success');
    }
  };

  const currentSellerName = localStorage.getItem('rainerio_seller_name') || 'Vendedor';

  const [formData, setFormData] = useState<Partial<Vehicle>>({
    type: 'Carro',
    brand: '',
    name: '',
    year: 2024,
    price: '',
    km: '0km',
    color: '',
    featured: false,
    sellerName: '',
    hidePrice: false,
    description: '',
    image: '',
    engine: '',
    transmission: '',
    seats: '',
    tires: '',
    manualProp: '',
    spareKey: '',
    steering: '',
    review: '',
    gallery: []
  });

  // Get unique types from existing vehicles for the selector
  const availableTypes = useMemo(() => {
    const types = Array.from(new Set(vehicles.map(v => v.type)));
    // Ensure default ones are there
    if (!types.includes('Carro')) types.push('Carro');
    if (!types.includes('Moto')) types.push('Moto');
    if (!types.includes('Blindado')) types.push('Blindado');
    return types.sort();
  }, [vehicles]);

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      type: 'Carro',
      brand: '',
      name: '',
      year: 2024,
      price: '',
      km: '0km',
      color: '',
      featured: false,
      sellerName: '',
      hidePrice: false,
      description: '',
      image: '',
      engine: '',
      transmission: '',
      seats: '',
      tires: '',
      manualProp: '',
      spareKey: '',
      steering: '',
      review: '',
      gallery: []
    });
    setNewType('');
    setIsAddingNewType(false);
    setIsModalOpen(false);
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingId(vehicle.id);
    setFormData({
      name: vehicle.name,
      brand: vehicle.brand,
      type: vehicle.type,
      price: vehicle.price,
      year: vehicle.year,
      km: vehicle.km,
      color: vehicle.color,
      image: vehicle.image,
      featured: vehicle.featured || false,
      sellerName: vehicle.sellerName || '',
      hidePrice: vehicle.hidePrice || false,
      description: vehicle.description || '',
      engine: vehicle.engine || '',
      transmission: vehicle.transmission || '',
      seats: vehicle.seats || '',
      tires: vehicle.tires || '',
      manualProp: vehicle.manualProp || '',
      spareKey: vehicle.spareKey || '',
      steering: vehicle.steering || '',
      review: vehicle.review || '',
      gallery: vehicle.gallery || []
    });
    setIsModalOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      if (isGallery) {
        const uploadedUrls: string[] = [];
        for (let i = 0; i < files.length; i++) {
          const url = await vehicleService.uploadVehicleImage(files[i]);
          uploadedUrls.push(url);
        }
        setFormData(prev => ({
          ...prev,
          gallery: [...(prev.gallery || []), ...uploadedUrls]
        }));
      } else {
        const publicUrl = await vehicleService.uploadVehicleImage(files[0]);
        setFormData(prev => ({ ...prev, image: publicUrl }));
      }
    } catch (error) {
      showNotification('Erro ao subir imagem.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const removeFromGallery = (url: string) => {
    setFormData(prev => ({
      ...prev,
      gallery: (prev.gallery || []).filter(img => img !== url)
    }));
  };

  const setAsCover = (url: string) => {
    setFormData(prev => ({ ...prev, image: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const defaultImage = 'https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=2070&auto=format&fit=crop';

    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
    };

    const formatKM = (amount: number) => {
      return new Intl.NumberFormat('pt-BR').format(amount);
    };

    const parseCurrency = (val: string | undefined): number => {
      if (!val) return 0;
      // Remove thousands separators (dots in BRL)
      let cleaned = val.toString().replace(/\./g, '');
      // Replace decimal separator (comma in BRL) with dot
      cleaned = cleaned.replace(',', '.');
      // Remove anything else that isn't a digit or a dot
      cleaned = cleaned.replace(/[^\d.]/g, '');
      return parseFloat(cleaned) || 0;
    };

    const cleanPrice = parseCurrency(formData.price?.toString());
    const cleanKM = parseInt(formData.km?.toString().replace(/\D/g, '') || '0');

    const finalData = {
      ...formData,
      brand: (formData.brand || '').toUpperCase(),
      name: (formData.name || '').toUpperCase(),
      type: (isAddingNewType ? newType : formData.type || '').toUpperCase(),
      image: formData.image || defaultImage,
      price: formatCurrency(cleanPrice),
      priceNumeric: cleanPrice,
      km: `${formatKM(cleanKM)} KM`,
      kmNumeric: cleanKM,
      color: (formData.color || '').toUpperCase(),
      sellerName: formData.sellerName || currentSellerName,
      description: (formData.description || '').toUpperCase(),
      // Technical details standardized
      engine: (formData.engine || 'N/A').toUpperCase(),
      transmission: (formData.transmission || 'N/A').toUpperCase(),
      seats: (formData.seats || 'N/A').toUpperCase(),
      tires: (formData.tires || 'N/A').toUpperCase(),
      manualProp: (formData.manualProp || 'N/A').toUpperCase(),
      spareKey: (formData.spareKey || 'N/A').toUpperCase(),
      steering: (formData.steering || 'N/A').toUpperCase(),
      review: (formData.review || 'N/A').toUpperCase(),
    };

    let updatedVehicles: Vehicle[];
    if (editingId) {
      updatedVehicles = vehicles.map(v =>
        v.id === editingId ? { ...v, ...finalData } as Vehicle : v
      );
    } else {
      const vehicleToAdd: Vehicle = {
        ...finalData as Vehicle,
        id: Date.now().toString(),
      };
      updatedVehicles = [vehicleToAdd, ...vehicles];
    }

    try {
      setIsUploading(true);
      await onUpdateVehicles(updatedVehicles);
      showNotification('Veículo salvo com sucesso!', 'success');
      resetForm();
    } catch (error) {
      console.error('Error saving vehicle:', error);
      showNotification('Erro ao sincronizar com o banco de dados.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (id: string) => {
    setVehicleToDelete(id);
  };

  const confirmDelete = async () => {
    if (vehicleToDelete) {
      try {
        setIsUploading(true);
        await onUpdateVehicles(vehicles.filter(v => v.id !== vehicleToDelete));
        if (editingId === vehicleToDelete) resetForm();
        setVehicleToDelete(null);
        showNotification('Veículo removido com sucesso!', 'success');
      } catch (error) {
        console.error('Error deleting vehicle:', error);
        showNotification('Erro ao remover veículo do banco de dados.', 'error');
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <>
      <div className="w-full animate-[fade-in-up_0.5s_ease-out]">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div>
              <h3 className="text-white text-3xl font-bold flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-4xl">inventory_2</span>
                Gestão Master
              </h3>
              <p className="text-white/40 text-sm font-medium mt-1">Gestão de ativos e equipe Rainério Motors</p>
            </div>

            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
              <button
                onClick={() => setActiveTab('vehicles')}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'vehicles' ? 'bg-primary text-background-dark shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                Estoque
              </button>
              <button
                onClick={() => setActiveTab('sellers')}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'sellers' ? 'bg-primary text-background-dark shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                Equipe
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => activeTab === 'vehicles' ? (resetForm(), setIsModalOpen(true)) : (setEditingSellerId(null), setSellerFormData({ name: '', role: 'VENDEDOR', imageUrl: '', whatsapp: '', instagram: '', email: '', username: '', password: '', active: true, isAdmin: false }), setIsSellerModalOpen(true))}
                className="bg-primary text-background-dark px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:bg-white transition-all flex items-center gap-2 active:scale-95"
              >
                <span className="material-symbols-outlined text-lg">add_circle</span>
                {activeTab === 'vehicles' ? 'Novo Veículo' : 'Novo Especialista'}
              </button>
              <button
                onClick={onLogout}
                className="w-14 h-14 bg-white/5 text-red-500/50 hover:bg-red-500 hover:text-white rounded-2xl flex items-center justify-center transition-all border border-white/5"
                title="Sair do Painel"
              >
                <span className="material-symbols-outlined">logout</span>
              </button>
            </div>
          </div>

          {/* List Section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
                {activeTab === 'vehicles' ? 'Histórico Geral de Vendas' : 'Equipe de Especialistas'}
              </h4>
            </div>

            <div className="grid grid-cols-1 gap-4 text-left">
              {activeTab === 'vehicles' ? (
                vehicles.map(v => (
                  <div key={v.id} className={`group bg-white/5 border p-4 rounded-[24px] flex items-center gap-5 transition-all hover:bg-white/[0.08] ${editingId === v.id ? 'border-primary bg-primary/5' : 'border-white/5'}`}>
                    <div className="w-24 h-20 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-white/10">
                      <img src={v.image} className="w-full h-full object-cover grayscale transition-all group-hover:grayscale-0" alt={v.name} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[7px] font-black uppercase tracking-[0.2em] px-1.5 py-0.5 rounded bg-white/10 text-white/40">
                          {v.type}
                        </span>
                        <span className="text-[7px] font-black uppercase tracking-[0.2em] px-1.5 py-0.5 rounded bg-primary/10 text-primary flex items-center gap-1">
                          <span className="material-symbols-outlined text-[9px]">person</span>
                          {v.sellerName || 'Sistema'}
                        </span>
                        {v.featured && (
                          <span className="text-[7px] font-black uppercase tracking-[0.2em] px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-500">
                            Destaque
                          </span>
                        )}
                      </div>
                      <h4 className="text-white font-bold text-base truncate group-hover:text-primary transition-colors">{v.name}</h4>
                      <p className="text-white/40 text-[9px] uppercase font-black tracking-widest mt-0.5">
                        {v.brand} • {v.year} • {v.price} • {v.km}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(v)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${editingId === v.id ? 'bg-primary text-background-dark' : 'bg-white/5 text-white/40 hover:bg-white/20 hover:text-white'}`}
                        title="Editar"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="w-10 h-10 rounded-xl bg-white/5 text-red-500/30 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all"
                        title="Excluir"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                sellers.map(s => (
                  <div key={s.id} className="group bg-white/5 border border-white/5 p-4 rounded-[24px] flex items-center gap-5 transition-all hover:bg-white/[0.08]">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-black flex-shrink-0 border border-primary/20">
                      <img src={s.imageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'} className="w-full h-full object-cover" alt={s.name} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-bold text-base truncate">{s.name}</h4>
                      <p className="text-primary text-[9px] uppercase font-black tracking-widest">{s.role} • {s.email}</p>
                      <div className="flex gap-3 mt-1.5">
                        <span className="text-white/30 text-[8px] flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">chat</span> {s.whatsapp}</span>
                        <span className="text-white/30 text-[8px] flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">alternate_email</span> @{s.instagram}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEditSeller(s)} className="w-10 h-10 rounded-xl bg-white/5 text-white/40 hover:bg-primary hover:text-background-dark flex items-center justify-center transition-all"><span className="material-symbols-outlined text-lg">edit</span></button>
                      <button onClick={() => handleDeleteSeller(s.id)} className="w-10 h-10 rounded-xl bg-white/5 text-red-500/30 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all"><span className="material-symbols-outlined text-lg">delete</span></button>
                    </div>
                  </div>
                ))
              )}

              {((activeTab === 'vehicles' && vehicles.length === 0) || (activeTab === 'sellers' && sellers.length === 0)) && (
                <div className="py-24 text-center bg-white/5 rounded-[40px] border border-dashed border-white/10">
                  <span className="material-symbols-outlined text-white/20 text-7xl mb-4 animate-pulse">
                    {activeTab === 'vehicles' ? 'no_crash' : 'person_off'}
                  </span>
                  <p className="text-white/30 font-black uppercase tracking-[0.3em] text-[10px]">
                    {activeTab === 'vehicles' ? 'Estoque Vazio' : 'Nenhum Especialista'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals outside transform containers */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={resetForm}></div>
          <div className="relative w-full max-w-xl bg-background-dark border border-white/10 rounded-[40px] shadow-2xl p-6 md:p-10 overflow-y-auto max-h-[90vh] side-scrollbar animate-[scale-up_0.3s_ease-out]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl text-white font-bold flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">
                  {editingId ? 'edit_note' : 'add_circle'}
                </span>
                {editingId ? 'Editar Veículo' : 'Cadastrar Ativo'}
              </h3>
              <button onClick={resetForm} className="text-white/20 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Compact Image Upload Area */}
              <div className="relative group w-full aspect-[21/9] rounded-2xl overflow-hidden bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center transition-all hover:border-primary/40">
                {formData.image ? (
                  <>
                    <img src={formData.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                    <label className="relative z-10 bg-primary/20 backdrop-blur-sm border border-primary text-primary px-4 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest cursor-pointer hover:bg-primary hover:text-background-dark transition-all">
                      Trocar Foto
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, false)} />
                    </label>
                  </>
                ) : (
                  <label className="flex flex-col items-center gap-2 cursor-pointer p-10 w-full group">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-primary text-3xl">add_photo_alternate</span>
                    </div>
                    <span className="text-white/40 text-[10px] font-black uppercase tracking-widest mt-2">{isUploading ? 'Subindo...' : 'Carregar Foto de Capa'}</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, false)} />
                  </label>
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20">
                    <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin mb-2"></div>
                    <span className="text-primary text-[8px] font-black uppercase tracking-widest">Enviando...</span>
                  </div>
                )}
              </div>

              {/* Gallery Management Area */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[9px] font-black text-white/40 uppercase tracking-widest">Galeria de Fotos</label>
                  <label className="bg-primary/10 hover:bg-primary text-primary hover:text-background-dark px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest cursor-pointer transition-all border border-primary/20">
                    Adicionar Fotos
                    <input type="file" className="hidden" accept="image/*" multiple onChange={(e) => handleFileChange(e, true)} />
                  </label>
                </div>

                <div className="grid grid-cols-4 gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                  {formData.gallery && formData.gallery.length > 0 ? (
                    formData.gallery.map((url, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group/item border border-white/10">
                        <img src={url} className="w-full h-full object-cover" alt={`Gallery ${idx}`} />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/item:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => setAsCover(url)}
                            className={`p-1.5 rounded-lg text-[8px] font-black uppercase transition-all ${formData.image === url ? 'bg-primary text-background-dark' : 'bg-white/20 text-white hover:bg-primary hover:text-background-dark'}`}
                          >
                            {formData.image === url ? 'Capa' : 'Set Capa'}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromGallery(url)}
                            className="p-1.5 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                          >
                            <span className="material-symbols-outlined text-xs">delete</span>
                          </button>
                        </div>
                        {formData.image === url && (
                          <div className="absolute top-1 right-1 bg-primary text-background-dark text-[6px] font-black px-1.5 py-0.5 rounded-md uppercase">Capa</div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="col-span-4 py-8 text-center text-white/20 text-[9px] uppercase font-bold italic tracking-widest">Nenhuma foto adicional</div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-[9px] font-black text-white/40 uppercase mb-1.5 block tracking-widest">Tipo de Veículo</label>
                  <div className="flex gap-2">
                    <select
                      value={isAddingNewType ? 'new' : formData.type}
                      onChange={(e) => {
                        if (e.target.value === 'new') {
                          setIsAddingNewType(true);
                        } else {
                          setIsAddingNewType(false);
                          setFormData({ ...formData, type: e.target.value as any });
                        }
                      }}
                      className="flex-1 bg-white/5 border-white/10 text-white rounded-xl p-3.5 text-xs outline-none focus:border-primary border hover:border-white/20 transition-all font-bold"
                    >
                      {availableTypes.map(t => (
                        <option key={t} value={t} className="bg-background-dark">{t}</option>
                      ))}
                      <option value="new" className="bg-background-dark text-primary font-black">+ Adicionar Novo Tipo...</option>
                    </select>
                    {isAddingNewType && (
                      <input
                        type="text"
                        value={newType}
                        onChange={(e) => setNewType(e.target.value)}
                        placeholder="Ex: Caminhonete"
                        className="flex-[1.5] bg-white/5 border-primary text-white rounded-xl p-3.5 text-xs outline-none border focus:ring-1 focus:ring-primary animate-[fade-in-right_0.3s_ease-out]"
                        autoFocus
                        required
                      />
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-black text-white/40 uppercase mb-1.5 block tracking-widest">Marca</label>
                  <input type="text" value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} className="w-full bg-white/5 border-white/10 text-white rounded-xl p-3.5 text-xs outline-none focus:border-primary border hover:border-white/20 transition-all" placeholder="Porsche" required />
                </div>
                <div>
                  <label className="text-[9px] font-black text-white/40 uppercase mb-1.5 block tracking-widest">Modelo</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-white/5 border-white/10 text-white rounded-xl p-3.5 text-xs outline-none focus:border-primary border hover:border-white/20 transition-all" placeholder="911 Turbo S" required />
                </div>
                <div>
                  <label className="text-[9px] font-black text-white/40 uppercase mb-1.5 block tracking-widest">Ano</label>
                  <input type="number" value={formData.year} onChange={e => setFormData({ ...formData, year: parseInt(e.target.value) })} className="w-full bg-white/5 border-white/10 text-white rounded-xl p-3.5 text-xs outline-none focus:border-primary border hover:border-white/20 transition-all" required />
                </div>
                <div>
                  <label className="text-[9px] font-black text-white/40 uppercase mb-1.5 block tracking-widest">KM</label>
                  <input type="text" value={formData.km} onChange={e => setFormData({ ...formData, km: e.target.value })} className="w-full bg-white/5 border-white/10 text-white rounded-xl p-3.5 text-xs outline-none focus:border-primary border hover:border-white/20 transition-all" placeholder="0km" required />
                </div>

                <div className="col-span-2">
                  <label className="text-[9px] font-black text-white/40 uppercase mb-1.5 block tracking-widest">Valor & Visibilidade</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full bg-white/5 border-white/10 text-white rounded-xl p-3.5 text-xs outline-none focus:border-primary border hover:border-white/20 transition-all" placeholder="R$ 0,00" required />
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, hidePrice: !formData.hidePrice })}
                        className={`flex-1 py-3 px-2 rounded-xl border transition-all flex flex-col items-center justify-center gap-1 text-[8px] font-black uppercase tracking-widest ${formData.hidePrice ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-green-500/10 border-green-500/50 text-green-500'}`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {formData.hidePrice ? 'visibility_off' : 'visibility'}
                        </span>
                        {formData.hidePrice ? 'Oculto' : 'Visível'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                        className={`flex-1 py-3 px-2 rounded-xl border transition-all flex flex-col items-center justify-center gap-1 text-[8px] font-black uppercase tracking-widest ${formData.featured ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/10 text-white/40'}`}
                      >
                        <span className="material-symbols-outlined text-sm">star</span>
                        {formData.featured ? 'Destaque' : 'Normal'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-[9px] font-black text-white/40 uppercase mb-3 block tracking-widest border-b border-white/5 pb-2">Informações Técnicas (Opcional)</label>
                </div>
                <div>
                  <label className="text-[9px] font-black text-white/40 uppercase mb-1.5 block tracking-widest">Motor</label>
                  <input type="text" value={formData.engine} onChange={e => setFormData({ ...formData, engine: e.target.value })} className="w-full bg-white/5 border-white/10 text-white rounded-xl p-3.5 text-xs outline-none focus:border-primary border hover:border-white/20 transition-all" placeholder="Ex: 4.0 Flat-Six" />
                </div>
                <div>
                  <label className="text-[9px] font-black text-white/40 uppercase mb-1.5 block tracking-widest">Câmbio</label>
                  <input type="text" value={formData.transmission} onChange={e => setFormData({ ...formData, transmission: e.target.value })} className="w-full bg-white/5 border-white/10 text-white rounded-xl p-3.5 text-xs outline-none focus:border-primary border hover:border-white/20 transition-all" placeholder="Ex: PDK 7 vel." />
                </div>
                <div>
                  <label className="text-[9px] font-black text-white/40 uppercase mb-1.5 block tracking-widest">Cor</label>
                  <input type="text" value={formData.color} onChange={e => setFormData({ ...formData, color: e.target.value })} className="w-full bg-white/5 border-white/10 text-white rounded-xl p-3.5 text-xs outline-none focus:border-primary border hover:border-white/20 transition-all" placeholder="Ex: Cinza" />
                </div>
                <div>
                  <label className="text-[9px] font-black text-white/40 uppercase mb-1.5 block tracking-widest">Bancos</label>
                  <input type="text" value={formData.seats} onChange={e => setFormData({ ...formData, seats: e.target.value })} className="w-full bg-white/5 border-white/10 text-white rounded-xl p-3.5 text-xs outline-none focus:border-primary border hover:border-white/20 transition-all" placeholder="Ex: Concha em Carbono" />
                </div>
                <div>
                  <label className="text-[9px] font-black text-white/40 uppercase mb-1.5 block tracking-widest">Pneus</label>
                  <input type="text" value={formData.tires} onChange={e => setFormData({ ...formData, tires: e.target.value })} className="w-full bg-white/5 border-white/10 text-white rounded-xl p-3.5 text-xs outline-none focus:border-primary border hover:border-white/20 transition-all" placeholder="Ex: Novos" />
                </div>
                <div>
                  <label className="text-[9px] font-black text-white/40 uppercase mb-1.5 block tracking-widest">Manual / Chave Reserva</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, manualProp: formData.manualProp === 'Sim' ? 'Não' : 'Sim' })}
                      className={`flex-1 py-3.5 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${formData.manualProp === 'Sim' ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 text-white/40 border-white/5'}`}
                    >
                      Manual: {formData.manualProp || 'Não'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, spareKey: formData.spareKey === 'Sim' ? 'Não' : 'Sim' })}
                      className={`flex-1 py-3.5 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${formData.spareKey === 'Sim' ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 text-white/40 border-white/5'}`}
                    >
                      Chave: {formData.spareKey || 'Não'}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-black text-white/40 uppercase mb-1.5 block tracking-widest">Direção</label>
                  <input type="text" value={formData.steering} onChange={e => setFormData({ ...formData, steering: e.target.value })} className="w-full bg-white/5 border-white/10 text-white rounded-xl p-3.5 text-xs outline-none focus:border-primary border hover:border-white/20 transition-all" placeholder="Ex: Elétrica" />
                </div>
                <div>
                  <label className="text-[9px] font-black text-white/40 uppercase mb-1.5 block tracking-widest">Revisão</label>
                  <input type="text" value={formData.review} onChange={e => setFormData({ ...formData, review: e.target.value })} className="w-full bg-white/5 border-white/10 text-white rounded-xl p-3.5 text-xs outline-none focus:border-primary border hover:border-white/20 transition-all" placeholder="Ex: Em dia" />
                </div>
              </div>

              <div>
                <label className="text-[9px] font-black text-white/40 uppercase mb-1.5 block tracking-widest">Breve Descrição / Diferenciais</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white/5 border-white/10 text-white rounded-xl p-4 text-xs outline-none focus:border-primary border hover:border-white/20 transition-all resize-none h-24"
                  placeholder="Ex: Teto panorâmico, Som Burmester, Único dono..."
                />
              </div>

              <button type="submit" disabled={isUploading} className="w-full bg-primary text-background-dark py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-primary/20 disabled:opacity-50 active:scale-95">
                {editingId ? 'Salvar Alterações' : 'Concluir Cadastro'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Seller Form Modal */}
      {isSellerModalOpen && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setIsSellerModalOpen(false)}></div>
          <div className="relative w-full max-w-xl bg-background-dark border border-white/10 rounded-[40px] shadow-2xl p-6 md:p-10 overflow-y-auto max-h-[90vh] side-scrollbar animate-[scale-up_0.3s_ease-out]">
            <h3 className="text-xl text-white font-bold flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-primary text-2xl">
                {editingSellerId ? 'edit' : 'person_add'}
              </span>
              {editingSellerId ? 'Editar Especialista' : 'Novo Especialista'}
            </h3>

            <form onSubmit={handleSellerSubmit} className="space-y-6">
              <div className="flex flex-col items-center gap-6 mb-8">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary/20 bg-white/5">
                  {sellerFormData.imageUrl ? (
                    <img src={sellerFormData.imageUrl} className="w-full h-full object-cover" alt="Profile" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/10">
                      <span className="material-symbols-outlined text-5xl">person</span>
                    </div>
                  )}
                  <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="material-symbols-outlined text-white">camera_alt</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleSellerFileChange} />
                  </label>
                </div>
                <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Foto de Perfil</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-[9px] font-black text-white/40 uppercase mb-1.5 block tracking-widest">Nome Completo</label>
                  <input type="text" value={sellerFormData.name || ''} onChange={e => setSellerFormData({ ...sellerFormData, name: e.target.value })} className="w-full bg-white/5 border border-white/10 text-white rounded-xl p-3.5 text-xs outline-none focus:border-primary transition-all" required />
                </div>
                <div>
                  <label className="text-[9px] font-black text-white/40 uppercase mb-1.5 block tracking-widest">E-mail de Acesso</label>
                  <input type="email" value={sellerFormData.email || ''} onChange={e => setSellerFormData({ ...sellerFormData, email: e.target.value })} className="w-full bg-white/5 border border-white/10 text-white rounded-xl p-3.5 text-xs outline-none focus:border-primary transition-all" required />
                </div>
                <div>
                  <label className="text-[9px] font-black text-white/40 uppercase mb-1.5 block tracking-widest">Usuário (Username)</label>
                  <input type="text" value={sellerFormData.username || ''} onChange={e => setSellerFormData({ ...sellerFormData, username: e.target.value })} className="w-full bg-white/5 border border-white/10 text-white rounded-xl p-3.5 text-xs outline-none focus:border-primary transition-all" placeholder="vendedor.premium" required />
                </div>
                <div>
                  <label className="text-[9px] font-black text-white/40 uppercase mb-1.5 block tracking-widest">Senha Provisória</label>
                  <input type="password" value={sellerFormData.password || ''} onChange={e => setSellerFormData({ ...sellerFormData, password: e.target.value })} className="w-full bg-white/5 border border-white/10 text-white rounded-xl p-3.5 text-xs outline-none focus:border-primary transition-all" placeholder="••••••••" required={!editingSellerId} />
                </div>
                <div>
                  <label className="text-[9px] font-black text-white/40 uppercase mb-1.5 block tracking-widest">WhatsApp (DDD + Número)</label>
                  <input type="text" value={sellerFormData.whatsapp || ''} onChange={e => setSellerFormData({ ...sellerFormData, whatsapp: e.target.value })} className="w-full bg-white/5 border border-white/10 text-white rounded-xl p-3.5 text-xs outline-none focus:border-primary transition-all" placeholder="88 99871-9704" required />
                </div>
                <div>
                  <label className="text-[9px] font-black text-white/40 uppercase mb-1.5 block tracking-widest">Instagram (apenas o @)</label>
                  <input type="text" value={sellerFormData.instagram || ''} onChange={e => setSellerFormData({ ...sellerFormData, instagram: e.target.value })} className="w-full bg-white/5 border border-white/10 text-white rounded-xl p-3.5 text-xs outline-none focus:border-primary transition-all" placeholder="raineriomotors" />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-black text-white/40 uppercase mb-1.5 block tracking-widest">Cargo</label>
                  <select
                    value={sellerFormData.role || 'VENDEDOR'}
                    onChange={e => {
                      const newRole = e.target.value;
                      setSellerFormData({
                        ...sellerFormData,
                        role: newRole,
                        isAdmin: newRole === 'ADMINISTRADOR'
                      });
                    }}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl p-3.5 text-xs outline-none focus:border-primary transition-all font-bold"
                  >
                    <option value="VENDEDOR" className="bg-background-dark text-white">VENDEDOR</option>
                    <option value="ADMINISTRADOR" className="bg-background-dark text-white">ADMINISTRADOR</option>
                  </select>
                  <p className="text-[8px] text-white/20 mt-2 italic">* Administradores não aparecem no catálogo público nem na seleção de WhatsApp.</p>
                </div>
              </div>

              <button type="submit" disabled={isUploading} className="w-full bg-primary text-background-dark py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-xl active:scale-95 disabled:opacity-50">
                {editingSellerId ? 'Salvar Alterações' : 'Cadastrar Especialista'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {vehicleToDelete && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={() => setVehicleToDelete(null)}></div>
          <div className="relative w-full max-w-sm bg-background-dark border border-white/10 rounded-[32px] p-8 text-center animate-[scale-up_0.3s_ease-out]">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
              <span className="material-symbols-outlined text-red-500 text-4xl">delete_forever</span>
            </div>
            <h3 className="text-white text-xl font-bold mb-2">Remover do Estoque?</h3>
            <p className="text-white/40 text-sm mb-8 leading-relaxed">
              Esta ação é permanente e removerá o veículo de todos os catálogos ativos.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setVehicleToDelete(null)}
                className="flex-1 py-4 rounded-2xl bg-white/5 text-white/40 font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-4 rounded-2xl bg-red-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Notification Toast */}
      {notification.isOpen && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[300] animate-[fade-in-down_0.3s_ease-out]">
          <div className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border backdrop-blur-md ${notification.type === 'error'
            ? 'bg-red-500/10 border-red-500/20 text-red-500'
            : notification.type === 'success'
              ? 'bg-primary/10 border-primary/20 text-primary'
              : 'bg-white/10 border-white/20 text-white'
            }`}>
            <span className="material-symbols-outlined text-xl">
              {notification.type === 'error' ? 'error' : notification.type === 'success' ? 'check_circle' : 'info'}
            </span>
            <span className="text-xs font-black uppercase tracking-widest">{notification.message}</span>
            <button
              onClick={() => setNotification(prev => ({ ...prev, isOpen: false }))}
              className="ml-4 hover:scale-110 transition-transform"
            >
              <span className="material-symbols-outlined text-sm opacity-40 hover:opacity-100">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Seller Delete Confirmation Modal */}
      {sellerToDelete && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={() => setSellerToDelete(null)}></div>
          <div className="relative w-full max-w-sm bg-background-dark border border-white/10 rounded-[32px] p-8 text-center animate-[scale-up_0.3s_ease-out]">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
              <span className="material-symbols-outlined text-red-500 text-4xl">person_remove</span>
            </div>
            <h3 className="text-white text-xl font-bold mb-2">Remover Especialista?</h3>
            <p className="text-white/40 text-sm mb-8 leading-relaxed">
              Esta ação removerá o acesso do especialista e ele não aparecerá mais nos catálogos.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setSellerToDelete(null)}
                className="flex-1 py-4 rounded-2xl bg-white/5 text-white/40 font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteSeller}
                className="flex-1 py-4 rounded-2xl bg-red-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;

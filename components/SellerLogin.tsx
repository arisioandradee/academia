
import React, { useState } from 'react';
import { vehicleService } from '../services/supabase';

interface SellerLoginProps {
  onLogin: (seller: any) => void; // Changed to pass the full seller object
  onClose: () => void;
}

const SellerLogin: React.FC<SellerLoginProps> = ({ onLogin, onClose }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const seller = await vehicleService.authenticateSeller(identifier, password);
      if (seller) {
        localStorage.setItem('rainerio_seller_photo', seller.image_url || '');
        onLogin(seller);
      } else {
        setError('Credenciais inválidas. Verifique seu e-mail/usuário e senha.');
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor. Verifique sua chave API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose}></div>

      <div className="relative w-full max-w-md bg-background-dark border border-white/10 rounded-[32px] overflow-hidden shadow-2xl animate-[fade-in-up_0.5s_ease-out]">
        <div className="p-10">
          <div className="text-center mb-10">
            <h2 className="serif-title text-3xl text-white mb-2">Acesso Restrito</h2>
            <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">Área do Vendedor • Rainério Motors</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-[10px] font-black text-white/40 uppercase mb-2 block tracking-widest">E-mail ou Usuário</label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white rounded-2xl px-5 py-4 focus:border-primary outline-none transition-all placeholder:text-white/10"
                placeholder="seu@email.com ou usuario"
                required
              />
            </div>

            <div>
              <label className="text-[10px] font-black text-white/40 uppercase mb-2 block tracking-widest">Senha de Acesso</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white rounded-2xl px-5 py-4 focus:border-primary outline-none transition-all placeholder:text-white/10"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-red-500 text-xs text-center font-bold">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-primary text-background-dark py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:bg-white transition-all active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Entrando...' : 'Entrar no Painel'}
            </button>
          </form>

          <button
            onClick={onClose}
            className="w-full mt-6 text-white/40 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors"
          >
            Voltar para o Site
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;

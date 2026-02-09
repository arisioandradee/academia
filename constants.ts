
import { Vehicle, Specialist } from './types';

export const IMAGES = {
  hero: '/img/fotoHero2.webp',
  showroom: '/img/fotoSobre.webp',
  specialists: {
    ricardo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR6t77SR1FRcc2tXGweGK3bxkKBTvmGhUI3udczqVp2uFXtG4CKM8oqbplTz2qVO4KJNnJNi0hKsorELhPff_4M6BV-_VRckxg8IYsmKEaHeYg-iZ5blXISq1eJyeOTbLAFDm8nyu7kjeB1Eez6Eum1UjxA7VLA248mJu44i6Jri5pAFcNWIFuaE_DTxYxBth6b9_dL-WaoeyrhGwvb0UwmXkOdKMjm6nPDea1Tt2RvK99YZiTPXPDnL0DPnO9DCg4n4gtmALYuyin',
    carlos: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYTQPdOiJ7C6yCbUTubdpcr2ixv0QRfE_1Rf4WX1MIUxXHc3Vl97lTfzKqXsJN1YWSXH4ui9NOe_SHyFdUkwB4booE0SZ26U2fi9CZPxr-cbrwQeSybXjLBdoOlfw4P9xubWzdpNfnUQSULjM4pQXXQt04CNFFJPwxcxVckAtNEinuhB4SliT9DKfaRla0Pw8SKi8a56O7N02Xp2wP9k_5vZgZ05VkvSdQMR1Hqr1Gkf_nMT6pnYYuymlkTzgoiOayMpZOb-wFpRoz',
    henrique: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV2VMxhVQoKpOuOYSIEQTR3Sn939M0lf09phv8p_jj8hFDnW9SmQwBibYsMMtmmG7KOVDRqyit4LSuoJs_e2evsw3vi6Aw3_UkzKW932sL_WR42u2wvskYwLY5aGU3nDb1cnRza3tXwgKSY9-HbzSYlcOHC_VFnuTE6dWfjarsYLt7FRO3uRPcoUTRR5gmH5OzAk8Js3jPJthcheL5rAe-KkGzFyDf0tnc2Mz2pmMnWEVjdxiCIL32Pw-NE2Ee3GxuLD9ydOC72KiI'
  }
};

export const SPECIALISTS: Specialist[] = [
  {
    id: 's1',
    name: 'Ricardo Silva',
    role: 'Vendedor',
    imageUrl: IMAGES.specialists.ricardo,
    instagram: '@ricardo_rainerio',
    whatsapp: '5588999990001'
  },
  {
    id: 's2',
    name: 'Carlos Eduardo',
    role: 'Vendedor',
    imageUrl: IMAGES.specialists.carlos,
    instagram: '@cadu_motors',
    whatsapp: '5588999990002'
  },
  {
    id: 's3',
    name: 'Henrique Antunes',
    role: 'Vendedor',
    imageUrl: IMAGES.specialists.henrique,
    instagram: '@henrique_antunes',
    whatsapp: '5588999990003'
  },
  {
    id: 's4',
    name: 'Beto Oliveira',
    role: 'Vendedor',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&h=200&fit=crop',
    instagram: '@beto_rainerio',
    whatsapp: '5588999990004'
  },
  {
    id: 's5',
    name: 'Lúcia Ferreira',
    role: 'Vendedor',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&fit=crop',
    instagram: '@lucia_rainerio',
    whatsapp: '5588999990005'
  }
];

export const VEHICLES: Vehicle[] = [];

export const CONTACT_INFO = {
  phone: '(88) 98871-9704',
  email: 'contato@rainerio.com.br',
  address: 'Av. do Contôrno Leste - Morada Nova, CE, 62940-000',
  areas: 'Morada Nova e as proximidades',
  hours: {
    weekday: 'Segunda à Sexta: 07:00 - 18:00',
    current: 'Fechado · Abre seg. às 07:00'
  }
};

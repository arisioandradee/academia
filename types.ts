
export interface Specialist {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  username: string;
  password?: string;
  instagram?: string;
  whatsapp?: string;
  email?: string;
  bio?: string;
  active?: boolean;
}

export interface Seller extends Specialist {
  isAdmin?: boolean;
}

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  type: 'Carro' | 'Moto' | 'Blindado';
  price: string;
  priceNumeric: number;
  year: number;
  km: string;
  kmNumeric: number;
  color: string;
  image: string;
  featured?: boolean;
  sellerName?: string;
  hidePrice?: boolean;
  description?: string;
  // Technical details for the detailed view
  engine?: string;
  transmission?: string;
  seats?: string;
  tires?: string;
  manualProp?: string;
  spareKey?: string;
  steering?: string;
  review?: string;
  gallery?: string[];
}

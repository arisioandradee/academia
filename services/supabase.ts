
import { createClient } from '@supabase/supabase-js';
import { Vehicle, Seller } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase credentials missing! Check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const vehicleService = {
    async authenticateSeller(identifier: string, password?: string) {
        const { data, error } = await supabase
            .from('sellers')
            .select('*')
            .or(`email.eq.${identifier},username.eq.${identifier}`)
            .eq('password', password)
            .eq('active', true)
            .single();

        if (error) return null;
        return data;
    },

    async uploadVehicleImage(file: File) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `vehicles/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('vehicle-images')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('vehicle-images')
            .getPublicUrl(filePath);

        return publicUrl;
    },

    async getVehicles() {
        const { data, error } = await supabase
            .from('vehicles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Convert snake_case from DB to camelCase for frontend
        return data.map(v => ({
            ...v,
            priceNumeric: v.price_numeric,
            sellerName: v.seller_name,
            hidePrice: v.hide_price,
            description: v.description,
            engine: v.engine,
            transmission: v.transmission,
            seats: v.seats,
            tires: v.tires,
            manualProp: v.manual_prop,
            spareKey: v.spare_key,
            steering: v.steering,
            review: v.review,
            gallery: v.gallery || []
        })) as Vehicle[];
    },

    async saveVehicle(vehicle: Vehicle) {
        const dbVehicle = {
            id: vehicle.id,
            name: vehicle.name,
            brand: vehicle.brand,
            type: vehicle.type,
            price: vehicle.price,
            price_numeric: vehicle.priceNumeric,
            year: vehicle.year,
            km: vehicle.km,
            color: vehicle.color,
            image: vehicle.image,
            featured: vehicle.featured
        };

        const { error } = await supabase
            .from('vehicles')
            .upsert(dbVehicle);

        if (error) throw error;
    },

    async deleteVehicle(id: string) {
        const { error } = await supabase
            .from('vehicles')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    async syncAll(vehicles: Vehicle[]) {
        const ids = vehicles.map(v => v.id);

        // 1. Delete records that are no longer in the list
        if (ids.length > 0) {
            await supabase
                .from('vehicles')
                .delete()
                .not('id', 'in', `(${ids.join(',')})`);
        } else {
            // If the list is empty, clear everything
            await supabase
                .from('vehicles')
                .delete()
                .neq('id', '0'); // Assuming no real ID is 0, or just .not('id', 'is', null) if valid
        }

        // 2. Transfrom for DB
        const dbVehicles = vehicles.map(v => ({
            id: v.id,
            name: v.name,
            brand: v.brand,
            type: v.type,
            price: v.price,
            price_numeric: v.priceNumeric,
            year: v.year,
            km: v.km,
            km_numeric: v.kmNumeric,
            color: v.color,
            image: v.image,
            featured: v.featured,
            seller_name: v.sellerName,
            hide_price: v.hidePrice,
            description: v.description,
            engine: v.engine,
            transmission: v.transmission,
            seats: v.seats,
            tires: v.tires,
            manual_prop: v.manualProp,
            spare_key: v.spareKey,
            steering: v.steering,
            review: v.review,
            gallery: v.gallery || []
        }));

        // 3. Upsert the remaining/new records
        if (dbVehicles.length > 0) {
            const { error } = await supabase
                .from('vehicles')
                .upsert(dbVehicles);
            if (error) throw error;
        }
    }
};

export const sellerService = {
    async getSellers() {
        const { data, error } = await supabase
            .from('sellers')
            .select('*')
            .order('name', { ascending: true });

        if (error) throw error;

        return data.map(s => ({
            id: s.id,
            name: s.name,
            role: s.role,
            imageUrl: s.image_url,
            instagram: s.instagram,
            whatsapp: s.whatsapp,
            email: s.email,
            active: s.active,
            isAdmin: s.is_admin,
            username: s.username
        })) as Seller[];
    },

    async saveSeller(seller: Partial<Seller>) {
        const dbSeller: any = {
            name: seller.name,
            role: seller.role,
            image_url: seller.imageUrl,
            instagram: seller.instagram,
            whatsapp: seller.whatsapp,
            email: seller.email,
            active: seller.active || false,
            is_admin: seller.isAdmin || false,
            username: seller.username
        };

        if (seller.password) {
            dbSeller.password = seller.password;
        }

        if (seller.id) {
            dbSeller.id = seller.id;
        }


        const { error } = await supabase
            .from('sellers')
            .upsert(dbSeller, { onConflict: 'id' });

        if (error) {
            console.error('Supabase upsert error:', error);
            throw error;
        }
    },

    async deleteSeller(id: string) {
        const { error } = await supabase
            .from('sellers')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
};

// ==========================================================================
// Fly Nature Holidays - Supabase Client & Cloud Database Sync Engine
// Supports both VITE_SUPABASE_* environment variables and Dynamic In-Dashboard Configuration
// ==========================================================================

import { createClient } from '@supabase/supabase-js';

// Retrieve config from Vite env or LocalStorage override
export function getSupabaseConfig() {
  const localConfig = localStorage.getItem('flynature_supabase_config');
  if (localConfig) {
    try {
      const parsed = JSON.parse(localConfig);
      if (parsed.url && parsed.anonKey) {
        return parsed;
      }
    } catch (e) {
      console.error('Invalid local Supabase config:', e);
    }
  }

  const envUrl = import.meta.env?.VITE_SUPABASE_URL;
  const envKey = import.meta.env?.VITE_SUPABASE_ANON_KEY;

  if (envUrl && envKey && !envUrl.includes('YOUR_SUPABASE_URL')) {
    return { url: envUrl, anonKey: envKey };
  }

  return null;
}

let supabaseInstance = null;

export function getSupabase() {
  if (supabaseInstance) return supabaseInstance;

  const config = getSupabaseConfig();
  if (config && config.url && config.anonKey) {
    try {
      supabaseInstance = createClient(config.url, config.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true
        }
      });
      return supabaseInstance;
    } catch (e) {
      console.error('Failed to initialize Supabase client:', e);
    }
  }
  return null;
}

export function isSupabaseConnected() {
  return getSupabase() !== null;
}

export function saveSupabaseConfig(url, anonKey) {
  const cleanUrl = url.trim().replace(/\/+$/, '');
  const cleanKey = anonKey.trim();
  localStorage.setItem('flynature_supabase_config', JSON.stringify({ url: cleanUrl, anonKey: cleanKey }));
  supabaseInstance = null; // Reset instance to recreate with new credentials
  return getSupabase();
}

export function disconnectSupabase() {
  localStorage.removeItem('flynature_supabase_config');
  supabaseInstance = null;
}

// ==========================================================================
// CLOUD SYNC & DATA OPERATIONS
// ==========================================================================

// 1. Fetch Packages from Supabase
export async function fetchCloudPackages() {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from('tour_packages')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.warn('Supabase fetchCloudPackages warning:', error.message);
    return null;
  }
  return data.map(p => ({
    id: p.id,
    title: p.title,
    category: p.category,
    stops: p.stops,
    durationDays: p.duration_days,
    durationNights: p.duration_nights,
    price: p.price,
    showPrice: p.show_price,
    image: p.image,
    images: p.images || [p.image],
    video: p.video || '',
    badge: p.badge || 'Featured',
    rating: p.rating || 4.9,
    reviewsCount: p.reviews_count || 280,
    inclusions: p.inclusions || [],
    itinerary: p.itinerary || []
  }));
}

// 2. Upsert Package to Supabase
export async function syncPackageToCloud(pkg) {
  const sb = getSupabase();
  if (!sb) return false;
  const payload = {
    id: pkg.id,
    title: pkg.title,
    category: pkg.category,
    stops: pkg.stops,
    duration_days: pkg.durationDays,
    duration_nights: pkg.durationNights,
    price: pkg.price ? Number(pkg.price) : null,
    show_price: Boolean(pkg.showPrice),
    image: pkg.image,
    images: pkg.images || [pkg.image],
    video: pkg.video || null,
    badge: pkg.badge || null,
    rating: Number(pkg.rating) || 4.9,
    reviews_count: Number(pkg.reviewsCount) || 280,
    inclusions: pkg.inclusions || [],
    itinerary: pkg.itinerary || []
  };
  const { error } = await sb.from('tour_packages').upsert(payload);
  if (error) console.error('Supabase syncPackageToCloud error:', error);
  return !error;
}

// 3. Delete Package from Supabase
export async function deleteCloudPackage(pkgId) {
  const sb = getSupabase();
  if (!sb) return false;
  const { error } = await sb.from('tour_packages').delete().eq('id', pkgId);
  if (error) console.error('Supabase deleteCloudPackage error:', error);
  return !error;
}

// 4. Submit / Sync Booking Lead
export async function syncLeadToCloud(lead) {
  const sb = getSupabase();
  if (!sb) return false;
  const payload = {
    id: lead.id,
    customer_name: lead.customerName,
    phone: lead.phone,
    destination: lead.destination,
    travel_date: lead.date || null,
    persons: Number(lead.persons) || 1,
    status: lead.status || 'New',
    notes: lead.notes || null
  };
  const { error } = await sb.from('bookings_and_leads').upsert(payload);
  if (error) console.error('Supabase syncLeadToCloud error:', error);
  return !error;
}

// 5. Fetch Leads from Supabase
export async function fetchCloudLeads() {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from('bookings_and_leads')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.warn('Supabase fetchCloudLeads error:', error.message);
    return null;
  }
  return data.map(b => ({
    id: b.id,
    customerName: b.customer_name,
    phone: b.phone,
    destination: b.destination,
    date: b.travel_date,
    persons: b.persons,
    status: b.status,
    notes: b.notes
  }));
}

// 6. Delete Lead from Supabase
export async function deleteCloudLead(leadId) {
  const sb = getSupabase();
  if (!sb) return false;
  const { error } = await sb.from('bookings_and_leads').delete().eq('id', leadId);
  return !error;
}

// 7. Sync Payment Inflow
export async function syncPaymentToCloud(payment) {
  const sb = getSupabase();
  if (!sb) return false;
  const payload = {
    id: payment.id,
    customer_name: payment.customerName,
    destination: payment.destination,
    amount: Number(payment.amount) || 0,
    mode: payment.mode,
    status: payment.status,
    date: payment.date || null,
    receipt_no: payment.receiptNo || null
  };
  const { error } = await sb.from('payments_and_inflows').upsert(payload);
  return !error;
}

// 8. Upload File to Supabase Storage Bucket ('tour-media')
export async function uploadMediaToCloud(file, path) {
  const sb = getSupabase();
  if (!sb) return null;
  const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const filePath = path ? `${path}/${fileName}` : fileName;

  const { data, error } = await sb.storage
    .from('tour-media')
    .upload(filePath, file, { cacheControl: '3600', upsert: true });

  if (error) {
    console.error('Supabase storage upload error:', error);
    return null;
  }

  const { data: publicData } = sb.storage.from('tour-media').getPublicUrl(filePath);
  return publicData?.publicUrl || null;
}


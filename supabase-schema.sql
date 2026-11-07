-- ==========================================================================
-- Fly Nature Holidays - Complete Supabase Cloud & Self-Hosted Database Schema
-- Run this in the Supabase SQL Editor (https://app.supabase.com/project/_/sql)
-- ==========================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================================================
-- TABLE 1: tour_categories
-- ==========================================================================
CREATE TABLE IF NOT EXISTS public.tour_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    badge TEXT DEFAULT '✈️',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed Default Categories
INSERT INTO public.tour_categories (id, name, badge) VALUES
    ('international', 'International (Turkey, Bali, Thai)', '✈️'),
    ('golden-triangle', 'Delhi, Agra & Jaipur (Fatehpur)', '🏛️'),
    ('uttarakhand', 'Uttarakhand & Dehradun', '🌲'),
    ('kashmir', 'Kashmir Snow Valley', '🏔️'),
    ('lakshadweep', 'Lakshadweep Islands', '🏝️'),
    ('pilgrimage', 'Executive Umrah', '🕋'),
    ('kerala', 'Kerala & South India', '🌴')
ON CONFLICT (id) DO NOTHING;

-- ==========================================================================
-- TABLE 2: tour_packages
-- ==========================================================================
CREATE TABLE IF NOT EXISTS public.tour_packages (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT REFERENCES public.tour_categories(id) ON DELETE SET DEFAULT DEFAULT 'international',
    stops TEXT,
    duration_days INTEGER NOT NULL DEFAULT 5,
    duration_nights INTEGER NOT NULL DEFAULT 4,
    price NUMERIC,
    show_price BOOLEAN DEFAULT false,
    image TEXT NOT NULL,
    images JSONB DEFAULT '[]'::jsonb,
    video TEXT,
    badge TEXT,
    rating NUMERIC DEFAULT 4.9,
    reviews_count INTEGER DEFAULT 280,
    inclusions JSONB DEFAULT '[]'::jsonb,
    itinerary JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================================
-- TABLE 3: bookings_and_leads (CRM)
-- ==========================================================================
CREATE TABLE IF NOT EXISTS public.bookings_and_leads (
    id TEXT PRIMARY KEY DEFAULT ('FN-' || floor(1000 + random() * 9000)::text),
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    destination TEXT NOT NULL,
    travel_date DATE,
    persons INTEGER DEFAULT 2,
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Confirmed', 'In-Progress', 'Completed', 'Cancelled')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed Sample Leads
INSERT INTO public.bookings_and_leads (id, customer_name, phone, destination, travel_date, persons, status, notes) VALUES
    ('FN-8901', 'Shabeer Ali (Doctor)', '+91 98471 23456', 'Turkey Cappadocia & Istanbul Grand Voyage', '2026-11-15', 4, 'Confirmed', 'Cave suite requested in Cappadocia, coordinator: Mr. Muhydheen.'),
    ('FN-8902', 'Mohammed Anas', '+91 97450 88991', 'Golden Triangle (Delhi, Agra Taj Mahal & Jaipur)', '2026-10-28', 6, 'Confirmed', 'Family group, coordinated by Fuhadakka & Thanseehakka.'),
    ('FN-8903', 'Ramees K.V.', '+91 99612 34567', 'Uttarakhand Scenic Escape (Dehradun & Mussoorie)', '2026-11-04', 5, 'In-Progress', 'Flight tickets booked from Calicut Airport. Custom quote shared.'),
    ('FN-8904', 'Abdul Gafoor', '+91 94470 55112', 'Premium Executive Umrah Package', '2026-12-01', 2, 'Confirmed', 'Walking distance hotel in Makkah & Madinah confirmed.'),
    ('FN-8905', 'Niyas Kondotty', '+91 98951 12345', 'Bali Tropical Island & Nusa Penida', '2026-10-22', 2, 'New', 'Honeymoon pool villa quote requested on WhatsApp.')
ON CONFLICT (id) DO NOTHING;

-- ==========================================================================
-- TABLE 4: payments_and_inflows (Finance Ledger)
-- ==========================================================================
CREATE TABLE IF NOT EXISTS public.payments_and_inflows (
    id TEXT PRIMARY KEY DEFAULT ('TRX-' || floor(8000 + random() * 1999)::text),
    customer_name TEXT NOT NULL,
    destination TEXT NOT NULL,
    amount NUMERIC NOT NULL DEFAULT 0,
    mode TEXT NOT NULL DEFAULT 'Google Pay (UPI)',
    status TEXT NOT NULL DEFAULT 'Paid in Full',
    date DATE DEFAULT CURRENT_DATE,
    receipt_no TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed Initial Payments
INSERT INTO public.payments_and_inflows (id, customer_name, destination, amount, mode, status, date, receipt_no) VALUES
    ('TRX-8801', 'Shabeer Ali (Doctor)', 'Turkey Cappadocia & Istanbul Grand Voyage', 195000, 'Bank Transfer (NEFT/RTGS)', 'Paid in Full', '2026-11-04', 'RCPT-2026-041'),
    ('TRX-8802', 'Mohammed Anas', 'Golden Triangle (Delhi, Agra Taj Mahal & Jaipur)', 52000, 'Google Pay (UPI)', 'Paid in Full', '2026-11-03', 'RCPT-2026-039'),
    ('TRX-8803', 'Roshini & Arjun', 'Kashmir Snow Valley & Dal Lake Shikara', 45000, 'PhonePe (UPI)', '50% Advance Received', '2026-11-02', 'RCPT-2026-037'),
    ('TRX-8804', 'Abdul Rasheed & Family', 'Executive Umrah 14-Day Premium Package', 210000, 'Cash at Kondotty Branch', 'Paid in Full', '2026-10-30', 'RCPT-2026-032'),
    ('TRX-8805', 'Fasalu Rahman', 'Lakshadweep Island Coral Pass (Agatti)', 38000, 'Google Pay (UPI)', 'Paid in Full', '2026-10-28', 'RCPT-2026-028')
ON CONFLICT (id) DO NOTHING;

-- ==========================================================================
-- TABLE 5: branch_settings
-- ==========================================================================
CREATE TABLE IF NOT EXISTS public.branch_settings (
    id TEXT PRIMARY KEY DEFAULT 'primary',
    agency_name TEXT DEFAULT 'Fly Nature Holidays',
    tagline TEXT DEFAULT 'travel shoppe',
    cert_reg TEXT DEFAULT 'KTR-MAL-2024-889 (Kerala Tourism Dept Certified)',
    gstin TEXT DEFAULT '32AABCF1234F1Z8',
    kondotty TEXT DEFAULT 'Kurupath, Near Calicut Airport Road, Kondotty, Malappuram, Kerala - 673638',
    koduvally TEXT DEFAULT 'Main Road, Koduvally, Kozhikode, Kerala - 673572',
    hotlines TEXT DEFAULT '+91 94474 22126 / +91 96336 02224',
    whatsapp TEXT DEFAULT '+91 94474 22126',
    email TEXT DEFAULT 'naturekdy@gmail.com',
    instagram TEXT DEFAULT '@flynatureholidays',
    working_hours TEXT DEFAULT 'Mon - Sat: 9:00 AM - 8:30 PM | Sun: 10:00 AM - 6:00 PM',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed Settings
INSERT INTO public.branch_settings (id, agency_name, tagline, cert_reg, gstin, kondotty, koduvally, hotlines, whatsapp, email, instagram, working_hours)
VALUES (
    'primary',
    'Fly Nature Holidays',
    'travel shoppe',
    'KTR-MAL-2024-889 (Kerala Tourism Dept Certified)',
    '32AABCF1234F1Z8',
    'Kurupath, Near Calicut Airport Road, Kondotty, Malappuram, Kerala - 673638',
    'Main Road, Koduvally, Kozhikode, Kerala - 673572',
    '+91 94474 22126 / +91 96336 02224',
    '+91 94474 22126',
    'naturekdy@gmail.com',
    '@flynatureholidays',
    'Mon - Sat: 9:00 AM - 8:30 PM | Sun: 10:00 AM - 6:00 PM'
)
ON CONFLICT (id) DO NOTHING;

-- ==========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================================================
ALTER TABLE public.tour_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings_and_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments_and_inflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branch_settings ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Policies (Website visitors can view catalog, categories, branch details)
CREATE POLICY "Allow public read access to categories" ON public.tour_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to packages" ON public.tour_packages FOR SELECT USING (true);
CREATE POLICY "Allow public read access to branch settings" ON public.branch_settings FOR SELECT USING (true);

-- 2. Public Insert Policy (Travelers can submit new booking leads from website)
CREATE POLICY "Allow public to submit leads" ON public.bookings_and_leads FOR INSERT WITH CHECK (true);

-- 3. Full Access Policies for Admin (using anon key or authenticated role)
CREATE POLICY "Allow all operations on packages" ON public.tour_packages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on categories" ON public.tour_categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on leads" ON public.bookings_and_leads FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on payments" ON public.payments_and_inflows FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on settings" ON public.branch_settings FOR ALL USING (true) WITH CHECK (true);

-- ==========================================================================
-- STORAGE BUCKET FOR MEDIA UPLOADS (Images & Ambient MP4 Reels)
-- ==========================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('tour-media', 'tour-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read Media" ON storage.objects FOR SELECT USING (bucket_id = 'tour-media');
CREATE POLICY "Public Upload Media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'tour-media');
CREATE POLICY "Public Update Media" ON storage.objects FOR UPDATE USING (bucket_id = 'tour-media');
CREATE POLICY "Public Delete Media" ON storage.objects FOR DELETE USING (bucket_id = 'tour-media');


-- Database Schema for MarketHub

-- 1. Create rooms table
CREATE TABLE IF NOT EXISTS public.rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    price TEXT NOT NULL,
    room_type TEXT NOT NULL,
    image_url TEXT,
    description TEXT,
    phone TEXT,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create items table (for Shop)
CREATE TABLE IF NOT EXISTS public.items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    price TEXT NOT NULL,
    image_url TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (Read & Insert)
CREATE POLICY "Allow public read on rooms" ON public.rooms FOR SELECT USING (true);
CREATE POLICY "Allow public insert on rooms" ON public.rooms FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on items" ON public.items FOR SELECT USING (true);
CREATE POLICY "Allow public insert on items" ON public.items FOR INSERT WITH CHECK (true);

-- Insert initial sample data for Rooms
INSERT INTO public.rooms (title, location, price, room_type, image_url, description, phone) VALUES
('Sunny Bedroom in Shared Apartment', 'Kathmandu, Nepal', 'Rs. 15,000/mo', 'Private Room', 'https://images.unsplash.com/photo-1522771753062-2aadfcf4b836?q=80&w=800&auto=format&fit=crop', 'Beautiful sunny room in Kathmandu', '9801234567'),
('Modern Studio Near University', 'Lalitpur, Nepal', 'Rs. 22,000/mo', 'Studio', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop', 'Modern studio apartment near Pulchowk', '9841234567'),
('Cozy Single Room', 'Pokhara, Nepal', 'Rs. 10,000/mo', 'Single Room', 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop', 'Quiet room close to Lakeside', '9811234567');

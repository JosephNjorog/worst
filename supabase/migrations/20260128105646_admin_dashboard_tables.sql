BEGIN;

-- Create episodes table
CREATE TABLE IF NOT EXISTS public.episodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    audio_url TEXT,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create applications table (to store submissions from the form)
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    feature_description TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create social_links table
CREATE TABLE IF NOT EXISTS public.social_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform TEXT NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

-- Policies
-- Episodes: Public read, Admin write
CREATE POLICY "Allow public read access to episodes" ON public.episodes FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to episodes" ON public.episodes FOR ALL USING (auth.role() = 'authenticated');

-- Applications: Public insert, Admin read/write
CREATE POLICY "Allow public insert access to applications" ON public.applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin full access to applications" ON public.applications FOR ALL USING (auth.role() = 'authenticated');

-- Social Links: Public read, Admin write
CREATE POLICY "Allow public read access to social_links" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to social_links" ON public.social_links FOR ALL USING (auth.role() = 'authenticated');

COMMIT;
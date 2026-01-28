BEGIN;

-- Add thumbnail_url to episodes table
ALTER TABLE public.episodes ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- Create storage bucket for thumbnails if it doesn't exist
-- Note: This usually requires manual setup in Supabase dashboard for full functionality, 
-- but we can define the policy here.
INSERT INTO storage.buckets (id, name, public) 
VALUES ('thumbnails', 'thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for thumbnails
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'thumbnails');
CREATE POLICY "Admin Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'thumbnails' AND auth.role() = 'authenticated');
CREATE POLICY "Admin Update" ON storage.objects FOR UPDATE WITH CHECK (bucket_id = 'thumbnails' AND auth.role() = 'authenticated');
CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE USING (bucket_id = 'thumbnails' AND auth.role() = 'authenticated');

COMMIT;
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export default function NewEpisodePage() {
  async function createEpisode(formData: FormData) {
    'use server';
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const audio_url = formData.get('audio_url') as string;

    const supabase = await createClient();
    const { error } = await supabase.from('episodes').insert({
      title,
      description,
      audio_url,
      published_at: new Date().toISOString(),
    });

    if (!error) {
      revalidatePath('/admin/episodes');
      redirect('/admin/episodes');
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Link 
        href="/admin/episodes" 
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Episodes
      </Link>

      <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-black text-gray-900 mb-8">Create New Episode</h1>
        
        <form action={createEpisode} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Episode Title</label>
            <input
              name="title"
              type="text"
              required
              placeholder="e.g. The One Where We Started"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Description</label>
            <textarea
              name="description"
              rows={5}
              placeholder="What's this episode about?"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Audio URL (Spotify/YouTube/etc)</label>
            <input
              name="audio_url"
              type="url"
              placeholder="https://..."
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
            >
              <Save className="w-5 h-5" />
              Publish Episode
            </button>
            <Link
              href="/admin/episodes"
              className="flex-1 flex items-center justify-center py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { Mic2, Calendar, Trash2, ExternalLink, Plus } from 'lucide-react';

export default async function AdminEpisodes() {
  const supabase = await createClient();
  const { data: episodes } = await supabase
    .from('episodes')
    .select('*')
    .order('published_at', { ascending: false });

  async function deleteEpisode(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const supabase = await createClient();
    await supabase.from('episodes').delete().eq('id', id);
    revalidatePath('/admin/episodes');
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Episodes</h1>
          <p className="text-gray-500 mt-1">Manage your podcast content</p>
        </div>
        <Link
          href="/admin/episodes/new"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-100"
        >
          <Plus className="w-5 h-5" />
          New Episode
        </Link>
      </div>

      <div className="grid gap-4">
        {episodes?.map((episode) => (
          <div 
            key={episode.id}
            className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-6 group hover:border-blue-200 transition-all"
          >
            <div className="w-20 h-20 rounded-xl bg-gray-50 overflow-hidden shrink-0 border border-gray-100">
              {episode.thumbnail_url ? (
                <img src={episode.thumbnail_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <Mic2 className="w-8 h-8" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 truncate">{episode.title}</h3>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {episode.published_at ? new Date(episode.published_at).toLocaleDateString() : 'Draft'}
                </span>
                {episode.audio_url && (
                  <a 
                    href={episode.audio_url} 
                    target="_blank" 
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Listen
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <form action={deleteEpisode}>
                <input type="hidden" name="id" value={episode.id} />
                <button
                  type="submit"
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  title="Delete Episode"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        ))}

        {(!episodes || episodes.length === 0) && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <Mic2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No episodes yet. Start by creating your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
}

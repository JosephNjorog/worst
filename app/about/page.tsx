'use client';

import { motion } from 'framer-motion';
import { Users, Heart, Coffee, Zap } from 'lucide-react';

export default function AboutPage() {
  const supabase = await createClient();
  const { data: episodes } = await supabase
    .from('episodes')
    .select('*')
    .order('published_at', { ascending: false });

  return (
    <main className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900">Episodes</h1>
          <p className="text-xl text-gray-600">
            Catch up on all our past conversations. From the deep to the ridiculous.
          </p>
        </div>

        <div className="grid gap-8">
          {episodes?.map((episode) => (
            <div 
              key={episode.id}
              className="group bg-white p-6 lg:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="w-full md:w-48 aspect-square bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                <Mic2 className="w-12 h-12" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {episode.published_at ? new Date(episode.published_at).toLocaleDateString() : 'Recently'}
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full" />
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    45 min
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {episode.title}
                </h2>
                <p className="text-gray-600 mb-6 line-clamp-2">
                  {episode.description}
                </p>
                
                {episode.audio_url && (
                  <a 
                    href={episode.audio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all"
                  >
                    Listen to Episode
                    <span className="text-xl">→</span>
                  </a>
                )}
              </div>
            </div>
          ))}

          {(!episodes || episodes.length === 0) && (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-500">No episodes published yet. Stay tuned!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

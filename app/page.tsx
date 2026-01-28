'use client';

import Hero from "@/components/Hero";
import { Mic2, Radio, Headphones, Share2, Youtube, Instagram, Facebook, Music, Podcast, Twitter } from 'lucide-react';
import Link from 'next/link';

const platforms = [
  { name: 'YouTube', icon: <Youtube className="w-6 h-6" />, url: 'https://www.youtube.com/@theworstfriendspodcast?sub_confirmation=1', color: 'hover:text-red-600' },
  { name: 'Spotify', icon: <Podcast className="w-6 h-6" />, url: 'https://tr.ee/P-9JyYnU6v', color: 'hover:text-green-500' },
  { name: 'Apple Podcasts', icon: <Podcast className="w-6 h-6" />, url: 'https://tr.ee/cq6e4rvJnk', color: 'hover:text-purple-500' },
  { name: 'Amazon Music', icon: <Music className="w-6 h-6" />, url: 'https://tr.ee/gKl97r3oGd', color: 'hover:text-yellow-500' },
  { name: 'Mixcloud', icon: <Radio className="w-6 h-6" />, url: 'https://tr.ee/dqIsJiAu5A', color: 'hover:text-blue-400' },
  { name: 'Castbox FM', icon: <Radio className="w-6 h-6" />, url: 'https://tr.ee/1j3nSaO6p3', color: 'hover:text-orange-500' },
  { name: 'Instagram', icon: <Instagram className="w-6 h-6" />, url: 'https://tr.ee/hX_y79bIIo', color: 'hover:text-pink-500' },
  { name: 'TikTok', icon: <Share2 className="w-6 h-6" />, url: 'https://tr.ee/SkGqUBKUPj', color: 'hover:text-black' },
  { name: 'Facebook', icon: <Facebook className="w-6 h-6" />, url: 'https://web.facebook.com/profile.php?id=61574890524905', color: 'hover:text-blue-700' },
  { name: 'X.com', icon: <Twitter className="w-6 h-6" />, url: 'https://tr.ee/vqf4SOti8u', color: 'hover:text-gray-900' },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      
      {/* Platforms Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Listen & Follow Everywhere</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            {platforms.map((platform) => (
              <Link
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center gap-2 text-gray-400 transition-all duration-300 hover:scale-110 ${platform.color}`}
              >
                {platform.icon}
                <span className="text-xs font-semibold uppercase tracking-wider">{platform.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      
      {/* CTA Section */}
      <section className="py-24 bg-blue-600 text-white overflow-hidden relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white">Ready to Join the Chaos?</h2>
          <p className="text-xl text-blue-50 mb-12 max-w-2xl mx-auto">
            Subscribe on your favorite platform and never miss an episode of bad advice 
            and great laughs.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              href="https://tr.ee/cq6e4rvJnk" 
              target="_blank" 
              className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-all hover:scale-105 shadow-xl"
            >
              Apple Podcasts
            </Link>
            <Link 
              href="https://tr.ee/P-9JyYnU6v" 
              target="_blank" 
              className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-all hover:scale-105 shadow-xl"
            >
              Spotify
            </Link>
            <Link 
              href="https://tr.ee/gKl97r3oGd" 
              target="_blank" 
              className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-all hover:scale-105 shadow-xl"
            >
              Amazon Music
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

'use client';

import { 
  Youtube, 
  Instagram, 
  Facebook, 
  Twitter, 
  Music2, 
  Podcast,
  Cloud
} from 'lucide-react';

const socials = [
  { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/@theworstfriendspodcast?sub_confirmation=1' },
  { name: 'Spotify', icon: Music2, url: 'https://tr.ee/P-9JyYnU6v' },
  { name: 'Instagram', icon: Instagram, url: 'https://tr.ee/hX_y79bIIo' },
  { name: 'Facebook', icon: Facebook, url: 'https://web.facebook.com/profile.php?id=61574890524905' },
  { name: 'TikTok', icon: Music2, url: 'https://tr.ee/SkGqUBKUPj' },
  { name: 'X', icon: Twitter, url: 'https://tr.ee/vqf4SOti8u' },
  { name: 'Apple', icon: Podcast, url: 'https://tr.ee/cq6e4rvJnk' },
  { name: 'Mixcloud', icon: Cloud, url: 'https://tr.ee/dqIsJiAu5A' },
];

export default function SocialLinks() {
  return (
    <section className="py-12 border-y border-border bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            >
              <social.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

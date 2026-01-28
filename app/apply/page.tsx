'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from "lucide-react";
import { submitApplication } from "@/lib/actions";
import Navbar from '@/components/Navbar';

export default function ApplyPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      full_name: formData.get('full_name') as string,
      email: formData.get('email') as string,
      portfolio_url: formData.get('portfolio_url') as string,
      video_url: formData.get('video_url') as string,
      reason: formData.get('reason') as string,
    };

    const result = await submitApplication(data);

    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'Something went wrong');
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-32 pb-20 max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-black mb-4">BE FEATURED</h1>
          <p className="text-muted-foreground mb-12 text-lg">
            Tell us about yourself. We're looking for creatives with a story to tell.
          </p>

          {status === 'success' ? (
            <div className="bg-secondary p-8 rounded-2xl text-center border border-primary/20">
              <h2 className="text-2xl font-bold mb-4">Application Sent!</h2>
              <p className="text-muted-foreground">
                Thank you for applying. If selected, we'll contact you at @worstfriendspodcast1@gmail.com with the date, time, and venue.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg">
                  {errorMessage}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider">Full Name</label>
                  <input name="full_name" required className="w-full bg-secondary border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider">Email Address</label>
                  <input name="email" required type="email" className="w-full bg-secondary border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider">Portfolio Link (Website/Socials)</label>
                <input name="portfolio_url" required className="w-full bg-secondary border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="https://..." />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider">2-Min Intro Video Link (Drive/YouTube/Vimeo)</label>
                <input name="video_url" required className="w-full bg-secondary border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="Tell us about your interests, likes, and dislikes" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider">Why should you be featured?</label>
                <textarea name="reason" required rows={4} className="w-full bg-secondary border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="Tell us why you'd be a great guest..." />
              </div>

              <button 
                disabled={status === 'submitting'}
                className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? 'Sending...' : (
                  <>
                    Submit Application
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </main>
  );
}

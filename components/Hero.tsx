'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { PlayCircle, Mic2, Users, Sparkles, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Hero() {
  const [clickCount, setClickCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (clickCount > 0) {
      setShowFeedback(true);
      // Keep feedback visible slightly longer for mobile users to notice
      const feedbackTimer = setTimeout(() => setShowFeedback(false), 2000);
      
      if (clickCount === 5) {
        router.push('/login');
        setClickCount(0);
      }
      
      const resetTimer = setTimeout(() => setClickCount(0), 4000);
      return () => {
        clearTimeout(feedbackTimer);
        clearTimeout(resetTimer);
      };
    }
  }, [clickCount, router]);

  return (
    <section className="relative w-full py-20 lg:py-32 overflow-hidden bg-white">
      {/* Admin Trigger Feedback - Optimized for Mobile */}
      <AnimatePresence>
        {showFeedback && clickCount > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-24 left-1/2 z-[100] pointer-events-none w-auto"
          >
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.2 }}
              className="bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-3 shadow-2xl border border-white/20 whitespace-nowrap"
            >
              <Lock className="w-4 h-4 text-blue-400" />
              <span>Admin Access: <span className="text-blue-400 text-lg">{clickCount}</span>/5</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>New Episode Every Tuesday</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1] text-gray-900">
              The Podcast for <span 
                className={cn(
                  "text-blue-600 cursor-pointer select-none transition-all duration-200 inline-block active:scale-95",
                  clickCount > 0 && "scale-110 rotate-2"
                )}
                onClick={() => setClickCount(prev => prev + 1)}
                onTouchStart={(e) => {
                  // Prevent double-triggering on some mobile browsers
                  // but allow the click event to proceed
                }}
              >Worst</span> Friends & Best Stories
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
              Join us as we dive into the chaotic, hilarious, and sometimes questionable 
              decisions that make friendship great. Real talk, real friends, real bad advice.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/episodes"
                className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all hover:scale-105 w-full sm:w-auto text-center"
              >
                Listen Now
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white border border-gray-200 text-gray-900 rounded-full font-semibold hover:bg-gray-50 transition-all w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Mic2 className="w-5 h-5" />
                Be a Guest
              </Link>
            </div>
            
            <div className="mt-12 flex items-center gap-6 text-gray-500">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">10k+ Listeners</span>
              </div>
              <div className="w-px h-4 bg-gray-300" />
              <div className="flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">50+ Episodes</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] lg:aspect-square rounded-[2.5rem] bg-gray-900 overflow-hidden relative shadow-2xl border-[8px] border-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1581362072978-14998d01fdaa?auto=format&fit=crop&q=80&w=800" 
                alt="Worst Friends Podcast Studio"
                className="object-cover w-full h-full opacity-80 hover:scale-105 transition-transform duration-700"
              />
              
              {/* Mockup Overlay Elements */}
              <div className="absolute top-6 left-6 flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                </div>
                <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-black/20 backdrop-blur-md px-2 py-1 rounded">Live Studio</span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-blue-600/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-all group border-4 border-white/20">
                  <PlayCircle className="w-12 h-12 text-white fill-white group-hover:scale-110 transition-transform" />
                </div>
              </div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold text-lg">Worst Friends</p>
                    <p className="text-gray-300 text-xs">S2 • Episode 14</p>
                  </div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-800 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Listener" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400 blur-[120px]" />
      </div>
    </section>
  );
}

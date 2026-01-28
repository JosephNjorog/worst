'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Hero() {
  return (
    <section className="relative w-full py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
            Build something <span className="text-blue-600">extraordinary</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            The ultimate starter kit for your next big idea. Powered by Next.js 15, 
            Supabase, and Framer Motion.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              Get Started
            </Link>
            <button
              className="px-8 py-4 bg-white border border-gray-200 text-gray-900 rounded-full font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <PlayCircle className="w-5 h-5" />
              Watch Demo
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400 blur-[120px]" />
      </div>
    </section>
  );
}

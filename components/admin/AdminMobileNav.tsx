'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import LogoutButton from './LogoutButton';
import { AnimatePresence, motion } from 'framer-motion';

export default function AdminMobileNav({ navItems, userEmail }: { navItems: any[], userEmail?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden bg-white border-b border-gray-200 sticky top-0 z-[70]">
      <div className="flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-black text-blue-600">
          WORST FRIENDS
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-100 overflow-hidden"
          >
            <nav className="p-4 space-y-2">
              {navItems.map((item: any) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-100">
                <p className="px-4 text-xs font-bold text-gray-400 uppercase mb-2">Account</p>
                <p className="px-4 text-sm text-gray-900 mb-4 truncate">{userEmail}</p>
                <LogoutButton />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

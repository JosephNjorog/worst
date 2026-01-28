'use client';

import Link from 'next/link';
import { Mic2, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Mic2 className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl tracking-tighter">THE WORST FRIENDS</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link href="#episodes" className="text-sm font-medium hover:text-primary transition-colors">Episodes</Link>
            <Link href="/apply" className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold hover:opacity-90 transition-opacity">
              Be Featured
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border p-4 space-y-4">
          <Link href="/" className="block text-lg font-medium" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="#episodes" className="block text-lg font-medium" onClick={() => setIsOpen(false)}>Episodes</Link>
          <Link href="/apply" className="block bg-primary text-primary-foreground px-4 py-2 rounded-md text-center font-bold" onClick={() => setIsOpen(false)}>
            Be Featured
          </Link>
        </div>
      )}
    </nav>
  );
}

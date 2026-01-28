import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from '@/components/admin/LogoutButton';
import SessionHandler from '@/components/admin/SessionHandler';
import { LayoutDashboard, Mic2, FileText, Share2, Menu } from 'lucide-react';
import AdminMobileNav from '@/components/admin/AdminMobileNav';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Episodes', href: '/admin/episodes', icon: <Mic2 className="w-5 h-5" /> },
    { label: 'Applications', href: '/admin/applications', icon: <FileText className="w-5 h-5" /> },
    { label: 'Social Links', href: '/admin/socials', icon: <Share2 className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <SessionHandler />
      
      {/* Mobile Header */}
      <AdminMobileNav navItems={navItems} userEmail={user.email} />

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 bg-white border-r border-gray-200 flex-col sticky top-0 h-screen">
        <div className="p-8">
          <Link href="/" className="text-2xl font-black tracking-tighter text-blue-600">
            WORST FRIENDS
          </Link>
          <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Admin Control</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all font-medium group"
            >
              <span className="text-gray-400 group-hover:text-blue-500 transition-colors">
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <div className="mb-4 px-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Logged in as</p>
            <p className="text-sm font-bold text-gray-900 truncate">{user.email}</p>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}

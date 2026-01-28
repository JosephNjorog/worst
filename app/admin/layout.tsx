import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from '@/components/admin/LogoutButton';
import SessionHandler from '@/components/admin/SessionHandler';

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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SessionHandler />
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <Link href="/" className="text-2xl font-black tracking-tighter text-blue-600 mb-10 block">
            WORST FRIENDS
          </Link>
          
          <nav className="space-y-1">
            {[
              { name: 'Dashboard', href: '/admin', icon: 'LayoutDashboard' },
              { name: 'Episodes', href: '/admin/episodes', icon: 'Mic2' },
              { name: 'Applications', href: '/admin/applications', icon: 'FileText' },
              { name: 'Social Links', href: '/admin/socials', icon: 'Share2' },
            ].map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 font-semibold hover:bg-blue-50 hover:text-blue-600 transition-all"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-8 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              {user.email?.[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{user.email}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-auto">
        {children}
      </main>
    </div>
  );
}

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

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
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/episodes" className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            Episodes
          </Link>
          <Link href="/admin/applications" className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            Applications
          </Link>
          <Link href="/admin/socials" className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            Social Links
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}

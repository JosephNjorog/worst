import { createClient } from '@/lib/supabase/server';

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: episodesCount },
    { count: applicationsCount },
    { count: socialsCount }
  ] = await Promise.all([
    supabase.from('episodes').select('*', { count: 'exact', head: true }),
    supabase.from('applications').select('*', { count: 'exact', head: true }),
    supabase.from('social_links').select('*', { count: 'exact', head: true }),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Episodes</h3>
          <p className="text-4xl font-bold mt-2">{episodesCount || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Pending Applications</h3>
          <p className="text-4xl font-bold mt-2">{applicationsCount || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Social Links</h3>
          <p className="text-4xl font-bold mt-2">{socialsCount || 0}</p>
        </div>
      </div>
    </div>
  );
}

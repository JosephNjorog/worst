import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { Share2, Plus, Trash2, Globe } from 'lucide-react';

export default async function AdminSocials() {
  const supabase = await createClient();
  const { data: socials } = await supabase.from('social_links').select('*').order('created_at', { ascending: false });

  async function addSocial(formData: FormData) {
    'use server';
    const platform = formData.get('platform') as string;
    const url = formData.get('url') as string;
    const supabase = await createClient();
    await supabase.from('social_links').insert({ platform, url });
    revalidatePath('/admin/socials');
  }

  async function deleteSocial(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const supabase = await createClient();
    await supabase.from('social_links').delete().eq('id', id);
    revalidatePath('/admin/socials');
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Social Links</h1>
        <p className="text-gray-500">Manage the links displayed on your homepage.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add New Social Link */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm sticky top-10">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-600" />
              Add New Link
            </h2>
            <form action={addSocial} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Platform Name</label>
                <input
                  name="platform"
                  type="text"
                  placeholder="e.g. Instagram"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">URL</label>
                <input
                  name="url"
                  type="url"
                  placeholder="https://..."
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
              >
                Add Social Link
              </button>
            </form>
          </div>
        </div>

        {/* List Social Links */}
        <div className="lg:col-span-2 space-y-4">
          {socials?.map((social) => (
            <div 
              key={social.id}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between gap-4 group hover:border-blue-200 transition-all"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900">{social.platform}</h3>
                  <p className="text-sm text-gray-500 truncate max-w-[200px] sm:max-w-md">{social.url}</p>
                </div>
              </div>
              <form action={deleteSocial}>
                <input type="hidden" name="id" value={social.id} />
                <button 
                  type="submit" 
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </form>
            </div>
          ))}
          {(!socials || socials.length === 0) && (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <Share2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No social links yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

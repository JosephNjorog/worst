import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export default async function AdminSocials() {
  const supabase = await createClient();
  const { data: socials } = await supabase.from('social_links').select('*');

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
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Social Media Links</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Add New Social Link */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-4">Add New Link</h2>
          <form action={addSocial} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
              <input
                name="platform"
                type="text"
                placeholder="e.g. Twitter, Instagram"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
              <input
                name="url"
                type="url"
                placeholder="https://..."
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Add Link
            </button>
          </form>
        </div>

        {/* List Social Links */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Platform</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {socials?.map((social) => (
                <tr key={social.id}>
                  <td className="px-6 py-4 text-sm">
                    <div className="font-medium text-gray-900">{social.platform}</div>
                    <div className="text-gray-500 text-xs truncate max-w-[200px]">{social.url}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <form action={deleteSocial}>
                      <input type="hidden" name="id" value={social.id} />
                      <button type="submit" className="text-red-600 hover:text-red-800">
                        Remove
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {(!socials || socials.length === 0) && (
                <tr>
                  <td colSpan={2} className="px-6 py-8 text-center text-gray-500">
                    No social links added.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { FileText, Check, X, Clock, Mail, User } from 'lucide-react';

export default async function AdminApplications() {
  const supabase = await createClient();
  const { data: applications } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false });

  async function updateStatus(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const status = formData.get('status') as string;
    const supabase = await createClient();
    await supabase.from('applications').update({ status }).eq('id', id);
    revalidatePath('/admin/applications');
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Applications</h1>
        <p className="text-gray-500">Review and manage guest feature requests.</p>
      </div>

      <div className="grid gap-6">
        {applications?.map((app) => (
          <div 
            key={app.id}
            className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden hover:border-blue-200 transition-all"
          >
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{app.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Mail className="w-4 h-4" />
                        {app.email}
                      </div>
                    </div>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                    app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    app.status === 'approved' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {app.status}
                  </span>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Feature Description</p>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{app.feature_description}</p>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <Clock className="w-4 h-4" />
                  Applied on {new Date(app.created_at!).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>

              <div className="flex md:flex-col gap-3 justify-end md:justify-start md:border-l md:border-gray-100 md:pl-8">
                <form action={updateStatus} className="contents">
                  <input type="hidden" name="id" value={app.id} />
                  <button
                    name="status"
                    value="approved"
                    className="flex-1 md:w-32 flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all active:scale-95"
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    name="status"
                    value="rejected"
                    className="flex-1 md:w-32 flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-all active:scale-95"
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}

        {(!applications || applications.length === 0) && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No applications yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function submitApplication(formData: {
  full_name: string;
  email: string;
  portfolio_url: string;
  video_url: string;
  reason: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('applications')
    .insert([formData])
    .select();

  if (error) {
    console.error('Error submitting application:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function getApplications() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching applications:', error);
    return [];
  }

  return data;
}

export async function updateApplicationStatus(id: string, status: 'pending' | 'approved' | 'rejected') {
  const supabase = await createClient();

  const { error } = await supabase
    .from('applications')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('Error updating application status:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/applications');
  return { success: true };
}

export async function getEpisodes() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('episodes')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching episodes:', error);
    return [];
  }

  return data;
}

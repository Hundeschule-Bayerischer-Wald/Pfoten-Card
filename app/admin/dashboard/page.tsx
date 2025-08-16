import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import AdminStats from '@/components/AdminStats';

export default async function AdminDashboard() {
  const supabase = createServerComponentClient({ cookies });
  
  // Check admin role
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user?.id)
    .single();

  if (profile?.role !== 'admin') {
    return <div>Zugriff verweigert</div>;
  }

  // Fetch stats
  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  const { data: customers } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'customer')
    .limit(5);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <AdminStats transactions={transactions || []} customers={customers || []} />
    </div>
  );
}

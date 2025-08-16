import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import TransactionList from '@/components/TransactionList';

export default async function TransactionsPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return <div>Bitte einloggen</div>;
  }

  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Transaktionshistorie</h1>
      <TransactionList transactions={transactions || []} />
    </div>
  );
}

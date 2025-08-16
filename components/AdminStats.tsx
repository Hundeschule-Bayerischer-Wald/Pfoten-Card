import { Transaction, Profile } from '@/types';

export default function AdminStats({
  transactions,
  customers
}: {
  transactions: Transaction[];
  customers: Profile[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold">Kunden</h3>
        <p className="text-2xl">{customers.length}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold">Transaktionen</h3>
        <p className="text-2xl">{transactions.length}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold">Letzte Aktivität</h3>
        <p className="text-lg">
          {transactions[0]?.created_at
            ? new Date(transactions[0].created_at).toLocaleString()
            : 'Keine'}
        </p>
      </div>
    </div>
  );
}

import { Transaction } from '@/types';

export default function TransactionList({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Datum</th>
            <th className="py-2 px-4 border-b">Typ</th>
            <th className="py-2 px-4 border-b">Betrag</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="py-2 px-4 border-b">
                {new Date(transaction.created_at).toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b capitalize">{transaction.type}</td>
              <td className="py-2 px-4 border-b">
                {transaction.type === 'abbuchen' ? '-' : '+'}
                {transaction.amount.toFixed(2)}€
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

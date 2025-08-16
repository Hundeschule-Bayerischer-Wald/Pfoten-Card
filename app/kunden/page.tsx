import { Card } from '@/components/Card'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default async function KundenPage() {
  const { data: kunden } = await supabase.from('kunden').select('*')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kunden</h1>
        <Link href="/kunden/neu" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + Neuer Kunde
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hund</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guthaben</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {kunden?.map((kunde) => (
              <tr key={kunde.id}>
                <td className="px-6 py-4 whitespace-nowrap">{kunde.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{kunde.hund_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{kunde.guthaben} €</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/kunden/${kunde.id}`} className="text-blue-600 hover:text-blue-800">
                    Bearbeiten
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

import { supabase } from '@/lib/supabase'

export default async function KundenDetailPage({ params }: { params: { id: string } }) {
  const { data: kunde } = await supabase
    .from('kunden')
    .select('*')
    .eq('id', params.id)
    .single()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Kundendetails</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-medium mb-4">Persönliche Daten</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {kunde?.name}</p>
              <p><span className="font-medium">E-Mail:</span> {kunde?.email}</p>
              <p><span className="font-medium">Telefon:</span> {kunde?.telefon}</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-4">Hund</h2>
            <p><span className="font-medium">Name:</span> {kunde?.hund_name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

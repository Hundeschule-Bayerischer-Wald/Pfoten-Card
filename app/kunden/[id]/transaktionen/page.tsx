'use client'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function TransaktionPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const handleTransaction = async (betrag: number, typ: 'aufladen' | 'abbuchen') => {
    await supabase.from('transaktionen').insert({
      kunde_id: params.id,
      betrag,
      typ
    })
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Transaktion</h1>
      
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => handleTransaction(12, 'abbuchen')}
          className="bg-red-500 text-white py-3 px-4 rounded-lg"
        >
          Gruppenstunde (-12€)
        </button>
        
        <button
          onClick={() => handleTransaction(18, 'abbuchen')} 
          className="bg-red-500 text-white py-3 px-4 rounded-lg"
        >
          Trail (-18€)
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[15, 50, 100].map((betrag) => (
          <button
            key={betrag}
            onClick={() => handleTransaction(betrag, 'aufladen')}
            className="bg-green-500 text-white py-3 px-4 rounded-lg"
          >
            +{betrag}€
          </button>
        ))}
      </div>
    </div>
  )
}

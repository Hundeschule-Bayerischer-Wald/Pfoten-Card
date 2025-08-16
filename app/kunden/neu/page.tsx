'use client'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function NeuerKundePage() {
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    
    const { error } = await supabase.from('kunden').insert({
      name: formData.get('name'),
      email: formData.get('email'),
      telefon: formData.get('telefon'),
      hund_name: formData.get('hund_name'),
      guthaben: 0
    })

    if (!error) router.push('/kunden')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Neuen Kunden anlegen</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">E-Mail</label>
          <input
            type="email"
            name="email"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Telefon</label>
          <input
            type="tel"
            name="telefon"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Hundename</label>
          <input
            type="text"
            name="hund_name"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Speichern
          </button>
        </div>
      </form>
    </div>
  )
}

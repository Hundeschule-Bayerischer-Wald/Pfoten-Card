'use client'
import Link from 'next/link'

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">PfotenCard</h1>
        
        <div className="space-y-4">
          <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-500 transition-colors">
            Mitarbeiter Login
          </button>
          
          <button className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors">
            Kunden Registrierung
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Nur für autorisierte Mitarbeiter der Hundeschule
        </div>
      </div>
    </div>
  )
}

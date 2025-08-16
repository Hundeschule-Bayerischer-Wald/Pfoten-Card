import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-3xl font-bold text-center mb-8">PfotenCard</h1>
      <div className="space-y-4">
        <Link href="/login" className="block w-full text-center bg-blue-600 text-white py-3 px-4 rounded-lg">
          Mitarbeiter Login
        </Link>
        <Link href="/register" className="block w-full text-center bg-gray-200 py-3 px-4 rounded-lg">
          Kunden Registrierung
        </Link>
      </div>
    </div>
  )
}

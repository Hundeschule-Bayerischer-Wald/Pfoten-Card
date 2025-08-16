'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Sidebar() {
  const pathname = usePathname()
  const navItems = [
    { name: 'Übersicht', href: '/dashboard' },
    { name: 'Kunden', href: '/kunden' },
    { name: 'Scanner', href: '/scanner' },
    { name: 'Berichte', href: '/berichte' },
    { name: 'Mitarbeiter', href: '/admin' }
  ]

  return (
    <div className="w-64 bg-blue-600 text-white p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-8 p-2 border-b border-blue-500">PfotenCard</h1>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`block py-3 px-4 rounded-lg transition-colors ${
              pathname === item.href 
                ? 'bg-blue-700 font-medium shadow-inner' 
                : 'hover:bg-blue-500'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}

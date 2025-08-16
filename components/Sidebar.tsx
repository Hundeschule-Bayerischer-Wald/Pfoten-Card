import Link from 'next/link'
import { colors } from '@/theme'

export function Sidebar() {
  const navItems = [
    { name: 'Übersicht', href: '/dashboard' },
    { name: 'Kunden', href: '/kunden' },
    { name: 'Scanner', href: '/scanner' },
    { name: 'Berichte', href: '/berichte' },
    { name: 'Mitarbeiter', href: '/admin' }
  ]

  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h1 className="text-xl font-bold mb-6" style={{ color: colors.primary }}>
        PfotenCard
      </h1>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href}
                className="block py-2 px-4 rounded-lg hover:bg-gray-100"
                style={{ color: colors.text }}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

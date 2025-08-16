'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { colors } from '@/theme'

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
    <div 
      className="w-64 p-4 min-h-screen"
      style={{ backgroundColor: colors.primary }}
    >
      <h1 
        className="text-2xl font-bold mb-8 p-2 border-b"
        style={{ borderColor: colors.primaryDark, color: colors.white }}
      >
        PfotenCard
      </h1>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`block py-3 px-4 rounded-lg transition-colors ${
              pathname === item.href
                ? 'font-medium shadow-inner'
                : 'hover:bg-blue-500'
            }`}
            style={{
              backgroundColor: pathname === item.href ? colors.primaryDark : 'transparent',
              color: colors.white
            }}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}

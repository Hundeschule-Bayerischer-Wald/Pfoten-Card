import { Card } from '@/components/Card'
import { colors } from '@/theme'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: colors.primary }}>
        Willkommen zurück!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Kunden gesamt" value="24" />
        <Card title="Guthaben gesamt" value="450,00 €" />
        <Card title="Heutige Transaktionen" value="5" />
      </div>
    </div>
  )
}

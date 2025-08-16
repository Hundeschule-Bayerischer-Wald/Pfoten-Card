import { colors } from '@/theme'

export function Card({ title, value }: { title: string; value: string }) {
  return (
    <div 
      className="p-6 rounded-xl shadow-sm border"
      style={{ 
        backgroundColor: colors.card,
        borderColor: colors.primary + '20' // 20% Opazität
      }}
    >
      <h3 className="text-sm font-medium" style={{ color: colors.text }}>
        {title}
      </h3>
      <p className="text-2xl font-bold mt-2" style={{ color: colors.primary }}>
        {value}
      </p>
    </div>
  )
}

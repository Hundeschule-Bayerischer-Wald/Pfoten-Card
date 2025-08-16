'use client'
import { colors } from '../theme'

export function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="p-6 rounded-xl shadow-sm border border-gray-100 bg-white">
      <h3 className="text-sm font-medium text-gray-700">{title}</h3>
      <p className="text-2xl font-bold mt-2" style={{ color: colors.primary }}>
        {value}
      </p>
    </div>
  )
}

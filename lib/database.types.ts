// Manuelle Typdefinitionen (falls Supabase-Typen nicht generiert werden)
export type Kunde = {
  id: string
  name: string
  email: string
  telefon?: string
  hund_name: string
  guthaben: number
  qr_code: string
  created_at: string
}

export type Mitarbeiter = {
  id: string
  email: string
  role: 'admin' | 'mitarbeiter'
  full_name?: string
}

export type Transaktion = {
  id: string
  kunde_id: string
  mitarbeiter_id: string
  betrag: number
  typ: 'aufladen' | 'abbuchen' | 'bonus'
  created_at: string
}

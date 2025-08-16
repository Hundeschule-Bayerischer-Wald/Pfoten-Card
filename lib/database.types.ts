import { Database } from './supabase'

export type Kunde = Database['public']['Tables']['kunden']['Row']
export type Mitarbeiter = Database['public']['Tables']['mitarbeiter']['Row']
export type Transaktion = Database['public']['Tables']['transaktionen']['Row']

// Beispiel für Tabellentypen (anpassen an deine Supabase-Struktur)
export interface GuthabenAufladung {
  betrag: number
  bonus: number
  kunde_id: string
  mitarbeiter_id: string
}

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})

// Manuelle Typendefinition (ersetzt die automatische Generierung)
export type Database = {
  public: {
    Tables: {
      kunden: {
        Row: {
          id: string
          name: string
          email: string
          telefon?: string
          hund_name: string
          guthaben: number
          qr_code: string
          created_at: string
        }
      }
      mitarbeiter: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'mitarbeiter'
          full_name?: string
        }
      }
    }
  }
}

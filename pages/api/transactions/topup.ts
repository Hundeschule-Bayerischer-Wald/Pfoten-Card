import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { createServerClient } from '@supabase/ssr';

// Supabase-Client initialisieren
const supabase = createServerClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
  {
    cookies: {
      get: () => null,
      set: () => {},
      remove: () => {},
    },
  }
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Nur POST-Anfragen erlauben
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Methode nicht erlaubt' });
  }

  // Benutzersession prüfen
  const { data: { session } } = await supabase.auth.getSession();
  if (!session || !session.user) {
    return res.status(401).json({ error: 'Nicht autorisiert' });
  }

  const { amount } = req.body;

  // Eingabe validieren
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Ungültiger Betrag' });
  }

  try {
    // Bonus berechnen (10% für Beträge >= 100)
    const bonus = amount >= 100 ? amount * 0.1 : 0;
    const totalAmount = amount + bonus;

    // Guthaben aktualisieren
    const { data: userData, error: userError } = await supabase
      .from('users')
      .update({ guthaben: supabase.raw('guthaben + ?', [totalAmount]) })
      .eq('id', session.user.id)
      .select('guthaben')
      .single();

    if (userError) {
      throw new Error(`Fehler beim Guthaben-Update: ${userError.message}`);
    }

    // Transaktion speichern
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        user_id: session.user.id,
        amount: totalAmount,
        type: 'aufladung',
        created_at: new Date().toISOString(),
      });

    if (transactionError) {
      // Rollback bei Fehler
      await supabase
        .from('users')
        .update({ guthaben: supabase.raw('guthaben - ?', [totalAmount]) })
        .eq('id', session.user.id);
      throw new Error(`Fehler beim Speichern der Transaktion: ${transactionError.message}`);
    }

    return res.status(200).json({
      message: 'Guthaben erfolgreich aufgeladen',
      neuesGuthaben: userData.guthaben,
      bonus: bonus > 0 ? bonus : null,
    });
  } catch (error) {
    console.error('Aufladungsfehler:', error);
    return res.status(500).json({ error: 'Interner Serverfehler' });
  }
}

import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

// Supabase-Client initialisieren
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Nur POST-Anfragen erlauben
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Methode nicht erlaubt' });
  }

  // Benutzersession prüfen
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    return res.status(401).json({ error: 'Nicht autorisiert' });
  }

  const { amount } = req.body;

  // Eingabe validieren
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Ungültiger Betrag' });
  }

  try {
    // Aktuelles Guthaben prüfen
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('guthaben')
      .eq('id', session.user.id)
      .single();

    if (userError) {
      throw new Error(`Fehler beim Abrufen des Guthabens: ${userError.message}`);
    }

    if (userData.guthaben < amount) {
      return res.status(400).json({ error: 'Unzureichendes Guthaben' });
    }

    // Guthaben aktualisieren
    const { data: updatedUserData, error: updateError } = await supabase
      .from('users')
      .update({ guthaben: supabase.raw('guthaben - ?', [amount]) })
      .eq('id', session.user.id)
      .select('guthaben')
      .single();

    if (updateError) {
      throw new Error(`Fehler beim Guthaben-Update: ${updateError.message}`);
    }

    // Transaktion speichern
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        user_id: session.user.id,
        amount: -amount,
        type: 'abbuchung',
        created_at: new Date().toISOString(),
      });

    if (transactionError) {
      // Rollback bei Fehler
      await supabase
        .from('users')
        .update({ guthaben: supabase.raw('guthaben + ?', [amount]) })
        .eq('id', session.user.id);
      throw new Error(`Fehler beim Speichern der Transaktion: ${transactionError.message}`);
    }

    return res.status(200).json({
      message: 'Guthaben erfolgreich abgebucht',
      neuesGuthaben: updatedUserData.guthaben,
    });
  } catch (error) {
    console.error('Abbuchungsfehler:', error);
    return res.status(500).json({ error: 'Interner Serverfehler' });
  }
}

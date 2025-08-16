```typescript
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

// Komponente für Guthaben-Aufladung
const TopUpForm: React.FC = () => {
  const [amount, setAmount] = useState<number | ''>('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  // Echtzeit-Updates für Guthaben
  useEffect(() => {
    if (!session?.user?.id) return;

    const channel = supabase
      .channel('user-guthaben')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'users',
          filter: `id=eq.${session.user.id}`,
        },
        (payload) => {
          console.log('Guthaben aktualisiert:', payload.new.guthaben);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      setError('Bitte gib einen gültigen Betrag ein');
      return;
    }
    setIsConfirmOpen(true);
  };

  const confirmTopUp = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/transactions/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(amount) }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Guthaben-Aufladung fehlgeschlagen');
      }

      setAmount('');
      setIsConfirmOpen(false);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Ein Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-blue-600 mb-4">Guthaben aufladen</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Betrag (€)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            placeholder="Betrag eingeben"
            min="1"
            step="0.01"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? 'Wird verarbeitet...' : 'Aufladen'}
        </button>
      </form>

      {isConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-blue-600">Aufladung bestätigen</h3>
            <p className="mt-2 text-gray-700">
              Möchtest du wirklich €{amount}
              {amount >= 100 ? ` (inkl. €${(amount * 0.1).toFixed(2)} Bonus)` : ''} aufladen?
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Abbrechen
              </button>
              <button
                onClick={confirmTopUp}
                disabled={loading}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50"
              >
                {loading ? 'Wird verarbeitet...' : 'Bestätigen'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopUpForm;
```

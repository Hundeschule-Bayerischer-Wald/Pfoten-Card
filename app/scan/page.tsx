'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import QrScannerComponent from '@/components/QrScanner';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function ScanPage() {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleScan = async (data: string) => {
    setLoading(true);
    setScannedData(data);
    
    // Validate customer ID format
    if (!data.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
      alert('Ungültiger QR-Code');
      setLoading(false);
      return;
    }

    // Check if customer exists
    const { data: customer } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data)
      .single();

    if (customer) {
      router.push(`/customers/${data}`);
    } else {
      alert('Kunde nicht gefunden');
    }
    setLoading(false);
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Karte scannen</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <QrScannerComponent onScan={handleScan} />
        {loading && <p className="mt-4">Lade Kundendaten...</p>}
      </div>
    </div>
  );
}

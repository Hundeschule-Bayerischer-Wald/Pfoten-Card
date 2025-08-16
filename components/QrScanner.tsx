'use client';
import { useState, useCallback } from 'react';
import QrReader from 'react-qr-reader-es6';

export default function QrScannerComponent({ onScan }: { onScan: (data: string) => void }) {
  const [error, setError] = useState<string | null>(null);

  const handleScan = useCallback((data: string | null) => {
    if (data) {
      onScan(data);
    }
  }, [onScan]);

  const handleError = useCallback((err: any) => {
    setError(err?.message || 'Fehler beim Scannen');
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
    </div>
  );
}

"use client";
import { useCallback, useState } from 'react';
import QrScanner from 'react-qr-scanner';

export default function QrScannerComponent({ onScan }: { onScan: (data: string) => void }) {
  const [error, setError] = useState<string | null>(null);

  const handleScan = useCallback((data: string | null) => {
    if (data) {
      onScan(data);
    }
  }, [onScan]);

  const handleError = useCallback((err: Error) => {
    setError(err.message);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
    </div>
  );
}

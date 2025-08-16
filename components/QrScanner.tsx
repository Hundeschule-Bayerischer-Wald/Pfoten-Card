'use client';
import { useState, useCallback } from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';

export default function QrScannerComponent({ onScan }: { onScan: (data: string) => void }) {
  const [error, setError] = useState<string | null>(null);

  const handleResult = useCallback((text: string) => {
    onScan(text);
  }, [onScan]);

  const handleError = useCallback((error: Error) => {
    setError(error?.message || 'Fehler beim Scannen');
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <QrScanner
        onDecode={handleResult}
        onError={handleError}
        containerStyle={{ width: '100%' }}
        scanDelay={300}
      />
    </div>
  );
}

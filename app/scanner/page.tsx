'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { QrReader } from 'react-qr-reader'

export default function ScannerPage() {
  const router = useRouter()
  const [result, setResult] = useState('')

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">QR-Code Scanner</h1>
      
      <div className="bg-white rounded-lg shadow p-4">
        <QrReader
          constraints={{ facingMode: 'environment' }}
          onResult={(result) => {
            if (result) {
              setResult(result.getText())
              router.push(`/kunden/${result.getText()}`)
            }
          }}
          className="w-full"
        />
      </div>

      {result && (
        <div className="bg-blue-50 p-4 rounded-lg">
          Gescannter Code: {result}
        </div>
      )}
    </div>
  )
}

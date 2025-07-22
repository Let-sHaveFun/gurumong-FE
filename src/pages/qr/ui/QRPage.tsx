import { useNavigate } from 'react-router-dom';

import { QRScanner, qrService } from '@/features/QRScanner';
import { useCallback } from 'react';

export function QRPage() {
  const navigate = useNavigate();

  const handleScan = useCallback(
    (scanResult: string) => {
      qrService.handleQRResult(scanResult, navigate, (errorMessage) => {
        console.error(errorMessage);
      });
    },
    [navigate],
  );

  return (
    <div className="mt-4 space-y-2">
      <QRScanner onScan={handleScan} />
    </div>
  );
}

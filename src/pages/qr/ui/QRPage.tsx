import { useState } from 'react';
import { Button } from '@vapor-ui/core';
import { useNavigate } from 'react-router-dom';

import { QRScanner } from '@/shared/ui/QRScanner';

export function QRPage() {
  const navigate = useNavigate();

  const [showQRScanner, setShowQRScanner] = useState(true);
  const [scannedResult, setScannedResult] = useState<string>('');

  const handleQRScan = (result: string) => {
    setScannedResult(result);
    setShowQRScanner(false);

    // QR 코드 결과에 따른 처리
    console.log('스캔된 QR 코드:', result);

    // URL인 경우 새 탭에서 열기

    if (result.startsWith('http')) {
      navigate(result);
      // window.open(result, '_blank');
    }
  };

  return (
    <div>
      {/* QR 스캐너 버튼 */}
      <div className="mt-4 space-y-2">
        <Button onClick={() => setShowQRScanner(true)} className="w-full">
          📱 QR 코드 스캔
        </Button>

        {scannedResult && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700 font-medium">스캔 결과:</p>
            <p className="text-sm text-green-800 break-all">{scannedResult}</p>
          </div>
        )}

        {/* QR 스캐너 모달 */}
        {showQRScanner && (
          <QRScanner
            onScan={handleQRScan}
            onClose={() => {
              setShowQRScanner(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

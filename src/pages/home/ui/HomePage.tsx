import { Box, Button, Dialog } from '@vapor-ui/core';
import { useState } from 'react';
import { DrawerTest } from './DrawerTest';
import { QRScanner } from '@/shared/ui/QRScanner';

export function HomePage() {
  const [count, setCount] = useState(0);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scannedResult, setScannedResult] = useState<string>('');

  const handleQRScan = (result: string) => {
    setScannedResult(result);
    setShowQRScanner(false);

    // QR 코드 결과에 따른 처리
    console.log('스캔된 QR 코드:', result);

    // URL인 경우 새 탭에서 열기
    if (result.startsWith('http')) {
      window.open(result, '_blank');
    }
  };

  return (
    <Box>
      <h1 className="text-2xl font-bold">Home</h1>
      <Button onClick={() => setCount(count + 1)}>Click me {count}</Button>

      <div className="flex gap-2">
        <span className="text-blue-500">tailwind style test</span>
        <div className="bg-red-500 w-10 h-10" />
      </div>

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
      </div>

      {/* QR 스캐너 모달 */}
      {showQRScanner && <QRScanner onScan={handleQRScan} onClose={() => setShowQRScanner(false)} />}

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button>Vapor UI 클릭</Button>
        </Dialog.Trigger>
        <Dialog.CombinedContent>
          <Dialog.Header>
            <Dialog.Title>알림</Dialog.Title>
            <Dialog.Close aria-label="Close" />
          </Dialog.Header>
          <Dialog.Body>
            <Dialog.Description>여기에 다이얼로그 본문 내용이 들어갑니다.</Dialog.Description>
          </Dialog.Body>
          <Dialog.Footer style={{ marginLeft: 'auto' }}>
            <button style={{ padding: '0.5rem 1rem' }}>확인</button>
          </Dialog.Footer>
        </Dialog.CombinedContent>
      </Dialog.Root>

      <DrawerTest />
    </Box>
  );
}

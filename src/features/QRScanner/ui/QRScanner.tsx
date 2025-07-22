import { useQRScanner, type UseQRScannerProps } from '../model/useQRScanner';

export function QRScanner({ onScan }: UseQRScannerProps) {
  const { error, videoRef } = useQRScanner({ onScan });

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      <header className="flex justify-between items-center p-4 bg-black text-white">
        <h2 className="text-lg font-semibold">QR 코드 스캔</h2>
      </header>

      {error && <div className="mx-4 p-3 bg-red-500 text-white rounded-lg text-sm">{error}</div>}

      {/* 카메라 화면 */}
      <div className="flex-1 relative flex items-center justify-center">
        <video ref={videoRef} className="w-full h-full object-cover" style={{ maxWidth: '393px' }} />

        {/* 스캔 가이드 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 border-2 border-white border-dashed rounded-lg flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-sm">QR 코드를 화면에 맞춰주세요</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

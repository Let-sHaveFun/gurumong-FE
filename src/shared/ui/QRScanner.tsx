import { useRef, useEffect, useState } from 'react';
import QrScanner from 'qr-scanner';
import { Nav } from './Nav';

interface QRScannerProps {
  onScan?: (result: string) => void;
  onClose?: () => void;
}

export function QRScanner({ onScan, onClose }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [qrScanner, setQrScanner] = useState<QrScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string>('');
  const [hasFlash, setHasFlash] = useState(false);
  const [flashOn, setFlashOn] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    const scanner = new QrScanner(
      videoRef.current,
      (result) => {
        console.log('QR 코드 스캔 결과:', result.data);
        onScan?.(result.data);
        // 스캔 성공 시 자동으로 스캐너 중지
        stopScanning();
      },
      {
        onDecodeError: (err: any) => {
          // QR 코드를 찾지 못했을 때는 에러로 처리하지 않음
          console.log('스캔 중...', err.message);
        },
        highlightScanRegion: true, // 스캔 영역 하이라이트
        highlightCodeOutline: true, // QR 코드 윤곽선 표시
        preferredCamera: 'environment', // 후면 카메라 우선
      },
    );

    setQrScanner(scanner);

    // 플래시 지원 여부 확인
    QrScanner.hasCamera().then(() => {
      scanner.hasFlash().then(setHasFlash);
    });

    return () => {
      scanner.destroy();
    };
  }, [onScan]);

  // 컴포넌트 마운트 시 자동으로 스캔 시작
  useEffect(() => {
    if (qrScanner) {
      startScanning();
    }
  }, [qrScanner]);

  useEffect(() => {
    if (isScanning) {
      startScanning();
    }
  }, [isScanning]);

  const startScanning = async () => {
    if (!qrScanner) return;

    try {
      setError('');
      await qrScanner.start();
      setIsScanning(true);
    } catch (err) {
      console.error('카메라 시작 오류:', err);
      setError('카메라에 접근할 수 없습니다. 권한을 확인해주세요.');
    }
  };

  const stopScanning = () => {
    if (qrScanner) {
      qrScanner.stop();
      setIsScanning(false);
      setFlashOn(false);
    }
  };

  const toggleFlash = async () => {
    if (!qrScanner || !hasFlash) return;

    try {
      if (flashOn) {
        await qrScanner.turnFlashOff();
        setFlashOn(false);
      } else {
        await qrScanner.turnFlashOn();
        setFlashOn(true);
      }
    } catch (err) {
      console.error('플래시 토글 오류:', err);
    }
  };

  const switchCamera = async () => {
    if (!qrScanner) return;

    try {
      const cameras = await QrScanner.listCameras(true);
      if (cameras.length > 1) {
        const currentCamera = await (qrScanner as any).getCamera();
        const nextCamera = cameras.find((camera) => camera.id !== currentCamera?.id);
        if (nextCamera) {
          await qrScanner.setCamera(nextCamera.id);
        }
      }
    } catch (err) {
      console.error('카메라 전환 오류:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* 헤더 */}
      <div className="flex justify-between items-center p-4 bg-black text-white">
        <h2 className="text-lg font-semibold">QR 코드 스캔</h2>
        <button
          onClick={() => {
            stopScanning();
            onClose?.();
          }}
          className="text-2xl hover:text-gray-300"
        >
          ✕
        </button>
      </div>

      {/* 에러 메시지 */}
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

      {/* 컨트롤 버튼들 */}
      <div className="p-4 bg-black">
        <div className="flex justify-center space-x-4">
          {!isScanning ? (
            <button
              onClick={startScanning}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
            >
              스캔 시작
            </button>
          ) : (
            <>
              <button onClick={stopScanning} className="px-4 py-2 bg-red-500 text-white rounded-lg">
                중지
              </button>

              <button onClick={switchCamera} className="px-4 py-2 bg-gray-600 text-white rounded-lg">
                카메라 전환
              </button>

              {hasFlash && (
                <button
                  onClick={toggleFlash}
                  className={`px-4 py-2 rounded-lg ${flashOn ? 'bg-yellow-500 text-black' : 'bg-gray-600 text-white'}`}
                >
                  {flashOn ? '💡' : '🔦'}
                </button>
              )}
            </>
          )}
          <Nav />
        </div>
      </div>
    </div>
  );
}

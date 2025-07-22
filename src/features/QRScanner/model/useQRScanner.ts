import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';

export interface UseQRScannerProps {
  onScan?: (result: string) => void;
  onError?: (errorMessage: string) => void;
}

export function useQRScanner({ onScan, onError }: UseQRScannerProps) {
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
        onScan?.(result.data);
        stopScanning(); // 스캔 성공 시 자동으로 스캐너 중지
      },
      {
        onDecodeError: (err: any) => {
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

  useEffect(
    function autoScan() {
      if (qrScanner) {
        startScanning();
      }
    },
    [qrScanner],
  );

  const startScanning = async () => {
    if (!qrScanner) return;

    try {
      setError('');
      await qrScanner.start();
      setIsScanning(true);
    } catch (err) {
      console.error('카메라 시작 오류:', err);
      const errorMessage = '카메라에 접근할 수 없습니다. 권한을 확인해주세요.';
      setError(errorMessage);
      onError?.(errorMessage);
    }
  };

  const stopScanning = () => {
    if (qrScanner) {
      qrScanner.stop();
      setIsScanning(false);
      setFlashOn(false);
    }
  };

  return {
    videoRef,
    isScanning,
    error,
    hasFlash,
    flashOn,
    startScanning,
    stopScanning,
  };
}

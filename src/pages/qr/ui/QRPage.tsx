// import { useState } from 'react';
// import { Button } from '@vapor-ui/core';
import { useNavigate } from 'react-router-dom';

import { QRScanner } from '@/shared/ui/QRScanner';
// import { useState } from 'react';

export function QRPage() {
  const navigate = useNavigate();

  // const [showQRScanner, setShowQRScanner] = useState(true);
  // const [scannedResult, setScannedResult] = useState<string>('');

  // const handleQRScan = (result: string) => {
  //   setScannedResult(result);
  //   setShowQRScanner(false);

  //   // QR 코드 결과에 따른 처리
  //   console.log('스캔된 QR 코드:', result);

  //   // URL인 경우 새 탭에서 열기

  //   if (result.startsWith('http')) {
  //     navigate(result);
  //     // window.open(result, '_blank');
  //   }
  // };

  const handleQRScan = (result: string) => {
    // setScannedResult(result);
    // setShowQRScanner(false);

    console.log('스캔된 QR 코드:', result);

    // URL 형식인지 확인
    if (result.startsWith('http')) {
      // 외부 URL이면 새 탭에서 열거나, 내부 URL이면 navigate
      // 이 로직은 앱의 요구사항에 따라 달라질 수 있습니다.
      // 예시: 외부 링크는 새 탭, 내부 링크는 현재 탭에서 이동
      try {
        const url = new URL(result);
        if (window.location.origin === url.origin) {
          navigate(url.pathname + url.search + url.hash);
        } else {
          window.open(result, '_blank');
        }
      } catch (e) {
        console.error('잘못된 URL 형식입니다.', e);
      }
    } else {
      // http로 시작하지 않으면 장소 ID로 간주하고 /place/:id 경로로 이동
      // result가 순수한 숫자인지 검증하는 로직을 추가하면 더 안전합니다.
      if (!isNaN(Number(result))) {
        navigate(`/place/${result}`);
      } else {
        console.error('예상치 않은 QR 코드 데이터 형식입니다:', result);
        // 사용자에게 에러 알림 표시
      }
    }
  };

  return (
    <div>
      {/* QR 스캐너 버튼 */}
      <div className="mt-4 space-y-2">
        {/* <Button onClick={() => setShowQRScanner(true)} className="w-full">
          📱 QR 코드 스캔
        </Button> */}

        {/* {scannedResult && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700 font-medium">스캔 결과:</p>
            <p className="text-sm text-green-800 break-all">{scannedResult}</p>
          </div>
        )} */}

        {/* QR 스캐너 모달 */}
        {/* {showQRScanner && ( */}
        <QRScanner
          onScan={handleQRScan}
          onClose={() => {
            // setShowQRScanner(false);
          }}
        />
        {/* )} */}
      </div>
    </div>
  );
}

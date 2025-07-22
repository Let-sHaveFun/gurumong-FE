// GYU-TODO: class 로 관리??
export const qrService = {
  _isUrl: (value: string): boolean => {
    return value.startsWith('http');
  },

  _isInternalUrl: (value: string): boolean => {
    try {
      const urlObj = new URL(value);
      return window.location.origin === urlObj.origin;
    } catch {
      return false;
    }
  },

  _handleUrl: (url: string, navigate: (path: string) => void) => {
    try {
      const urlObj = new URL(url);
      if (qrService._isInternalUrl(url)) {
        navigate(urlObj.pathname + urlObj.search + urlObj.hash);
      } else {
        window.open(url, '_blank');
      }
    } catch (error) {
      console.error('잘못된 URL 형식입니다.', error);
    }
  },

  // QR 결과 처리를 위한 헬퍼 함수
  handleQRResult: (result: string, navigate: (path: string) => void, onError?: (message: string) => void) => {
    if (qrService._isUrl(result)) {
      qrService._handleUrl(result, navigate);
    } else {
      const errorMessage = `예상치 않은 QR 코드 형식입니다: ${result}`;
      console.error(errorMessage);
      onError?.(errorMessage);
    }
  },
};

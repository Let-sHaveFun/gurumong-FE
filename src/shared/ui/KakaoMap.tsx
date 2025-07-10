import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';

export const KakaoMap = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('위치 정보를 가져오는데 실패했습니다:', error);
        },
      );
    } else {
      console.error('Geolocation을 지원하지 않는 브라우저입니다.');
    }
  }, []);

  if (!location) {
    return <p>내 위치를 불러오는 중...</p>;
  }

  return (
    <Map center={location} style={{ width: '100%', height: '100%' }} level={3}>
      <MapMarker position={location} />
    </Map>
  );
};

// import { useEffect } from 'react';

// const KakaoMap = () => {
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAOMAP_KEY}&autoload=false`;
//     script.async = true;

//     script.onload = () => {
//       window.kakao.maps.load(() => {
//         const container = document.getElementById('map') as HTMLElement;
//         const options = {
//           center: new window.kakao.maps.LatLng(33.450701, 126.570667),
//           level: 3,
//         };
//         new window.kakao.maps.Map(container, options);
//       });
//     };

//     document.head.appendChild(script);
//   }, []);

//   return <div id="map" style={{ width: '100%', height: '400px' }} />;
// };

// export default KakaoMap;

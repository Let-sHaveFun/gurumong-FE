import { Map, MapMarker } from 'react-kakao-maps-sdk';

export const KakaoMap = () => {
  return (
    <Map center={{ lat: 33.450701, lng: 126.570667 }} style={{ width: '100%', height: '400px' }} level={3}>
      <MapMarker position={{ lat: 33.450701, lng: 126.570667 }} />
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

export {};

declare global {
  interface Window {
    kakao: KakaoNamespace;
  }

  interface KakaoNamespace {
    maps: KakaoMaps;
  }

  interface KakaoMaps {
    load(callback: () => void): void;
    Map: new (container: HTMLElement, options: MapOptions) => KakaoMap;
    LatLng: new (lat: number, lng: number) => LatLng;
  }

  interface MapOptions {
    center: LatLng;
    level?: number;
  }

  interface LatLng {
    getLat(): number;
    getLng(): number;
  }

  interface KakaoMap {
    setCenter(latlng: LatLng): void;
    setLevel(level: number): void;
  }
}

/** 네이버 지도 JavaScript API v3 최소 타입 선언 */
declare namespace naver.maps {
  class LatLng {
    constructor(lat: number, lng: number);
  }

  interface MapOptions {
    center: LatLng;
    zoom?: number;
    zoomControl?: boolean;
    scaleControl?: boolean;
    mapDataControl?: boolean;
    draggable?: boolean;
    pinchZoom?: boolean;
    scrollWheel?: boolean;
    keyboardShortcuts?: boolean;
    disableDoubleClickZoom?: boolean;
    logoControl?: boolean;
  }

  class Map {
    constructor(element: HTMLElement, options: MapOptions);
  }

  interface MarkerOptions {
    position: LatLng;
    map: Map;
  }

  class Marker {
    constructor(options: MarkerOptions);
  }
}

interface Window {
  naver: typeof naver;
}

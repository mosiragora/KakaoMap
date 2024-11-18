import React, { useEffect, useState } from "react";

const KakaoMap = () => {
  const [map, setMap] = useState(null);
  const appKey = process.env.REACT_APP_JAVASCRIPT_MAP;
  console.log("API Key:", appKey); // API 키 확인용 로그

  useEffect(() => {
    const loadKakaoMapScript = () => {
      if (document.getElementById("kakao-map-script")) {
        // 이미 스크립트가 로드된 경우
        window.kakao.maps.load(initMap);
        return;
      }

      const script = document.createElement("script");
      script.id = "kakao-map-script";
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(initMap);
      };
      document.head.appendChild(script);
    };

    const initMap = () => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.4877, 126.8251),
        level: 3,
      };
      const newMap = new window.kakao.maps.Map(container, options);
      setMap(newMap);
    };

    if (!window.kakao) {
      loadKakaoMapScript();
    } else {
      window.kakao.maps.load(initMap);
    }
  }, [appKey]); // appKey를 의존성으로 추가하여 환경 변수 변경 시 재실행

  return <div id="map" style={{ width: "100vw", height: "100vh" }}></div>;
};

export default KakaoMap;

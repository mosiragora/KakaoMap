import React, { useEffect, useState } from 'react';

const KakaoMap = () => {
    const [map, setMap] = useState(null);
    const appKey = process.env.REACT_APP_JAVASCRIPT_MAP;
    console.log(appKey);
    useEffect(() => {
        const loadKakaoMapScript = () => {
            const script = document.createElement('script');
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
            script.async = true;
            script.onload = () => {
                window.kakao.maps.load(() => {
                    const container = document.getElementById('map');
                    const options = {
                        center: new window.kakao.maps.LatLng(37.4877, 126.8251),
                        level: 3,
                    };
                    const newMap = new window.kakao.maps.Map(
                        container,
                        options
                    );
                    setMap(newMap);
                });
            };
            document.head.appendChild(script);
        };

        if (!window.kakao) {
            loadKakaoMapScript();
        } else {
            window.kakao.maps.load(() => {
                const container = document.getElementById('map');
                const options = {
                    center: new window.kakao.maps.LatLng(37.4877, 126.8251),
                    level: 3,
                };
                const newMap = new window.kakao.maps.Map(container, options);
                setMap(newMap);
            });
        }
    }, []);

    return <div id="map" style={{ width: '100vw', height: '100vh' }}></div>;
};

export default KakaoMap;

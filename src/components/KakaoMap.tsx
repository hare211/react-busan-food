import { useEffect, useRef } from "react";

declare global {
    interface Window {
        kakao: any;
    }
}

interface KakaoMapProps {
    address: string;
    title: string;
}

function KakaoMap({ address, title }: KakaoMapProps) {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!address) return;

        const loadMap = () => {
            const { kakao } = window;

            kakao.maps.load(() => {
                const geocoder = new kakao.maps.services.Geocoder();

                geocoder.addressSearch(address, (result: any, status: any) => {
                    if (status === kakao.maps.services.Status.OK) {
                        const lat = parseFloat(result[0].y);
                        const lng = parseFloat(result[0].x);

                        const container = mapRef.current;
                        const options = {
                            center: new kakao.maps.LatLng(lat, lng),
                            level: 3,
                        };

                        const map = new kakao.maps.Map(container, options);
                        setTimeout(() => map.relayout(), 100);

                        const marker = new kakao.maps.Marker({
                            map,
                            position: new kakao.maps.LatLng(lat, lng),
                        });

                        const infowindow = new kakao.maps.InfoWindow({
                            content: `<div style="padding:6px;font-size:14px;">${title}</div>`,
                        });
                        infowindow.open(map, marker);
                    } else {
                        console.warn("좌표 변환 실패:", address);
                    }
                });
            });
        };

        if (window.kakao && window.kakao.maps) {
            loadMap();
        } else {
            const script = document.createElement("script");
            script.src =
                "//dapi.kakao.com/v2/maps/sdk.js?appkey=443acdfb0df827f13186e681c2acda8c&libraries=services&autoload=false";
            script.async = true;
            script.onload = loadMap;
            document.head.appendChild(script);
        }
    }, [address, title]);

    return (
        <div
            ref={mapRef}
            style={{
                width: "100%",
                height: "400px",
                marginTop: "1rem",
                backgroundColor: "#eee",
                border: "1px solid #ccc",
            }}
        />
    );
}

export default KakaoMap;

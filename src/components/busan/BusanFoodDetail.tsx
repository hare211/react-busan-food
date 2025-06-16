import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../http-commons";
import KakaoMap from "../KakaoMap";

interface FoodDetail {
    fno: number;
    name: string;
    type: string;
    phone: string;
    address: string;
    theme: string;
    poster: string;
    images: string;
    time: string;
    content: string;
    price: string;
    score: number;
    hit: number;
}

const BusanFoodDetail = () => {
    const { fno } = useParams<{ fno: string }>();
    const [food, setFood] = useState<FoodDetail | null>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await apiClient.get(`/api/busan-food/detail/${fno}`);
                setFood(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDetail();
    }, [fno]);

    if (!food) return <div className="text-center">로딩 중...</div>;

    const imageList = food.images
        ? food.images.split(",").map((img) => img.trim())
        : [];

    return (
        <div className="container" style={{ marginTop: "40px", maxWidth: "960px", marginLeft: "auto", marginRight: "auto" }}>
            <h2 style={{ textAlign: "center", marginBottom: "30px" }}>{food.name}</h2>

            {/* 대표 이미지 */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
                <img
                    src={`https://www.menupan.com${food.poster}`}
                    alt={food.name}
                    style={{ width: "100%", maxWidth: "400px", borderRadius: "10px" }}
                />
            </div>

            {/* 추가 이미지 3열 그리드 */}
            {imageList.length > 0 && (
                <>
                    <h3 style={{ marginBottom: "15px" }}>추가 이미지</h3>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "15px",
                            marginBottom: "40px"
                        }}
                    >
                        {imageList.map((img, idx) => (
                            <img
                                key={idx}
                                src={`https://www.menupan.com${img}`}
                                alt={`추가 이미지 ${idx + 1}`}
                                style={{ width: "100%", borderRadius: "6px", objectFit: "cover" }}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* 맛집 정보 */}
            <div style={{ lineHeight: "1.8", fontSize: "1rem", marginBottom: "40px" }}>
                <p><strong>종류:</strong> {food.type}</p>
                <p><strong>전화번호:</strong> {food.phone}</p>
                <p><strong>주소:</strong> {food.address}</p>
                <p><strong>가격대:</strong> {food.price}</p>
                <p><strong>영업시간:</strong> {food.time}</p>
                <p><strong>평점:</strong> {food.score}</p>
                <p><strong>조회수:</strong> {food.hit}</p>
                {food.theme && <p><strong>테마:</strong> {food.theme}</p>}
                {food.content && <p><strong>설명:</strong> {food.content}</p>}
            </div>

            {/* 카카오 지도 */}
            {food.address && (
                <>
                    <h3 style={{ marginBottom: "10px" }}>위치 정보</h3>
                    <KakaoMap address={food.address} title={food.name} />
                </>
            )}
        </div>
    );
};

export default BusanFoodDetail;

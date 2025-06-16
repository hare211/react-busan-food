import { useEffect, useState } from "react";
import apiClient from "../../http-commons";

interface Food {
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

const BusanFoodList = () => {
    const [foods, setFoods] = useState<Food[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const res = await apiClient.get(`/api/busan-food/list?page=${page}&size=10`);
                setFoods(res.data.content);
                setTotalPages(res.data.totalPages);
            } catch (err) {
                console.error(err);
            }
        };
        fetchFoods();
    }, [page]);

    const handlePrev = () => {
        if (page > 0) setPage(prev => prev - 1);
    };

    const handleNext = () => {
        if (page < totalPages - 1) setPage(prev => prev + 1);
    };

    return (
        <section className="wrapper style2" style={{ paddingTop: "40px" }}>
            <header className="major">
                <h2>부산 전체 맛집 목록</h2>
                <p>페이지를 넘기며 전체 맛집을 확인하세요</p>
            </header>
            <div className="container">
                <div
                    className="grid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "15px",
                        justifyItems: "center",
                        alignItems: "start",
                        width: "100%", // 전체 폭 확보
                    }}
                >
                {foods.map((food) => (
                        <section
                            className="special"
                            key={food.fno}
                            style={{
                                textAlign: "center",
                                width: "100%",
                                maxWidth: "220px"
                            }}
                        >
                            <a href="#" className="image fit">
                                <img
                                    src={`https://www.menupan.com${food.poster}`}
                                    alt={food.name}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        borderRadius: "6px"
                                    }}
                                />
                            </a>
                            <h3 style={{ fontSize: "1.1rem", marginBottom: "5px" }}>{food.name}</h3>
                            <p style={{ fontSize: "0.85rem", lineHeight: "1.3" }}>
                                {food.type}<br />
                                {food.address}<br />
                                {food.price}<br />
                                {food.time}
                            </p>
                            <ul className="actions">
                                <li><a href="#" className="button small alt">자세히 보기</a></li>
                            </ul>
                        </section>
                    ))}
                </div>


                <div
                    className="pagination"
                    style={{ marginTop: "40px", textAlign: "center" }}
                >
                    <button onClick={handlePrev} disabled={page === 0} className="button small">
                        이전
                    </button>
                    <span style={{ margin: "0 10px", fontWeight: "bold" }}>
            {page + 1} / {totalPages}
          </span>
                    <button onClick={handleNext} disabled={page + 1 === totalPages} className="button small">
                        다음
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BusanFoodList;

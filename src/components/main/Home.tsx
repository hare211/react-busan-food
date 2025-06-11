import {useEffect, useState} from "react";
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

const Home = () => {


    const [highScoreFoods, setHighScoreFoods] = useState<Food[]>([]);

    useEffect(() => {
        const fetchHighScoreFoods = async () => {
            try {
                const res = await apiClient.get<Food[]>('/api/busan-food/high-score');
                setHighScoreFoods(res.data);
                console.log('res', res.data);
            } catch (err) {
                console.error(err);
            }
        };
        void fetchHighScoreFoods();
    }, []);


    return (
        <>
            <section id="banner">
                <div className="inner">
                    <h2>부산 로컬 맛집 지도</h2>
                    <p>
                        Find the Best Places to Eat — Tried, Tested, and Loved
                    </p>
                    <ul className="actions">
                        <li><a href="#content" className="button big special">Sign Up</a></li>
                        <li><a href="#elements" className="button big alt">Learn More</a></li>
                    </ul>
                </div>
            </section>

            <section id="one" className="wrapper style1">
                <header className="major">
                    <h2>현지인이 사랑하는 부산 맛집 모음</h2>
                    <p>부산 구석구석, 진짜 맛있는 곳만 소개해요</p>
                </header>
            </section>


            <section id="two" className="wrapper style2">
                <header className="major">
                    <h2>부산 인기 맛집</h2>
                    <p>평점이 높은 음식점 리스트입니다.</p>
                </header>
                <div className="container">
                    <div className="row">
                        {highScoreFoods.map((food) => (
                            <div className="6u" key={food.fno} style={{ display: "flex", justifyContent: "center" }}>
                                <section className="special" style={{ textAlign: "center", maxWidth: "340px" }}>
                                    <a href="#" className="image fit">
                                        <img src={`https://www.menupan.com${food.poster}`} alt={food.name} style={{ width: "100%", maxWidth: "500px", height: "auto", borderRadius: "6px" }} />
                                    </a>
                                    <h3>{food.name}</h3>
                                    <p>
                                        {food.type}
                                        <br/>
                                        {food.address}
                                        <br/>
                                        {food.price}
                                        <br/>
                                        {food.time}
                                    </p>
                                    <ul className="actions">
                                        <li><a href="#" className="button alt">자세히 보기</a></li>
                                    </ul>
                                </section>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="three" className="wrapper style1">
                <div className="container">
                    <div className="row">
                        <div className="8u">
                            <section>
                                <h2>Mollis ut adipiscing</h2>
                                <a href="#" className="image fit">
                                    <img src="images/pic03.jpg" alt="" width="818" height="340" />
                                </a>
                                <p>
                                    Vis accumsan feugiat adipiscing nisl amet adipiscing accumsan blandit accumsan
                                    sapien blandit ac amet faucibus aliquet placerat commodo. Interdum ante aliquet
                                    commodo accumsan vis phasellus adipiscing. Ornare a in lacinia. Vestibulum accumsan
                                    ac metus massa tempor. Accumsan in lacinia ornare massa amet. Ac interdum ac non
                                    praesent. Cubilia lacinia interdum massa faucibus blandit nullam. Accumsan phasellus
                                    nunc integer. Accumsan euismod nunc adipiscing lacinia erat ut sit. Arcu amet. Id
                                    massa aliquet arcu accumsan lorem amet accumsan commodo odio cubilia ac eu interdum
                                    placerat placerat arcu commodo lobortis adipiscing semper ornare pellentesque.
                                </p>
                            </section>
                        </div>
                        <div className="4u">
                            <section>
                                <h3>Magna massa blandit</h3>
                                <p>
                                    Feugiat amet accumsan ante aliquet feugiat accumsan. Ante blandit accumsan eu amet
                                    tortor non lorem felis semper. Interdum adipiscing orci feugiat penatibus adipiscing
                                    col cubilia lorem ipsum dolor sit amet feugiat consequat.
                                </p>
                                <ul className="actions">
                                    <li><a href="#" className="button alt">Learn More</a></li>
                                </ul>
                            </section>
                            <hr />
                            <section>
                                <h3>Ante sed commodo</h3>
                                <ul className="alt">
                                    <li><a href="#">Erat blandit risus vis adipiscing</a></li>
                                    <li><a href="#">Tempus ultricies faucibus amet</a></li>
                                    <li><a href="#">Arcu commodo non adipiscing quis</a></li>
                                    <li><a href="#">Accumsan vis lacinia semper</a></li>
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {useNavigate, Link} from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import apiClient from "../../http-commons";


interface LoginForm {
    username: string;
    password: string;
}

interface LoginResponse {
    token: string;
    username: string;
    nickname: string;
}

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState<LoginForm>({
        username: "",
        password: "",
    });

    const mutation = useMutation<LoginResponse, Error, LoginForm>({
        mutationFn: async (form) => {
            const res = await apiClient.post("/api/users/login", form);
            return res.data;
        },
        onSuccess: (data) => {
            login(data.token, data.username, data.nickname);
            console.log('data', data);
            alert("로그인 성공");
            navigate("/");
        },
        onError: () => {
            alert("로그인 실패: 아이디 또는 비밀번호 확인");
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(form);
    };

    return (
        <section className="wrapper style1">
            <div className="container">
                <header className="major">
                    <h2>로그인</h2>
                </header>
                <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="아이디"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="비밀번호"
                        required
                    />
                    <input
                        type="submit"
                        value={mutation.isPending ? "로그인 중..." : "로그인"}
                        className="special"
                        disabled={mutation.isPending}
                    />
                </form>
                <div style={{ marginTop: "1rem", textAlign: "center" }}>
                    <Link
                        to="/register"
                        className="button alt"
                        style={{ display: "block", width: "100%", maxWidth: "500px", margin: "0 auto" }}
                    >
                        회원가입
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Login;



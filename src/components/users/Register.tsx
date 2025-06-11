import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../../http-commons";

interface RegisterForm {
    username: string;
    password: string;
    nickname: string;
    email: string;
}

const Register = () => {
    const [form, setForm] = useState<RegisterForm>({
        username: "",
        password: "",
        nickname: "",
        email: "",
    });

    const mutation = useMutation<void, Error, RegisterForm>({
        mutationFn: async (form) => {
            const res = await apiClient.post("/api/users/register", form);
            return res.data;
        },
        onSuccess: () => {
            alert("회원가입 완료");
        },
        onError: () => {
            alert("회원가입 실패");
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(form);
    };

    return (
        <section className="wrapper style1">
            <div className="container">
                <header className="major">
                    <h2>회원가입</h2>
                    <p>간단한 정보 입력으로 시작해 보세요</p>
                </header>

                <form
                    onSubmit={handleSubmit}
                    style={{
                        maxWidth: "500px",
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.2rem",
                    }}
                >
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
                        type="text"
                        name="nickname"
                        value={form.nickname}
                        onChange={handleChange}
                        placeholder="닉네임"
                    />
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="이메일"
                    />
                    <input
                        type="submit"
                        value={mutation.isPending ? "가입 중..." : "회원가입"}
                        className="special"
                        disabled={mutation.isPending}
                    />
                </form>
            </div>
        </section>
    );
};

export default Register;

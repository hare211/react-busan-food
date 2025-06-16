import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextProps {
    isLoggedIn: boolean;
    login: (token: string, username: string, nickname: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // JWT 유효성 검사 함수
    const isTokenValid = (token: string): boolean => {
        try {
            const payloadBase64 = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payloadBase64));
            const exp = decodedPayload.exp * 1000;
            return Date.now() < exp;
        } catch (e) {
            return false;
        }
    };

    // 로그인 메서드
    const login = (token: string, username: string, nickname: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("nickname", nickname);
        setIsLoggedIn(true);
    };

    // 로그아웃 메서드
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("nickname");
        setIsLoggedIn(false);
    };

    // 첫 렌더링 시 토큰 유효성 확인
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && isTokenValid(token)) {
            setIsLoggedIn(true);
        } else {
            logout();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};

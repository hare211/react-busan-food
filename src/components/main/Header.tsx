import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import * as FaIcons from "react-icons/fa";

const Header = () => {
    const { isLoggedIn, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLLIElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    return (
        <>
            <header id="header" className="skel-layers-fixed">
                <h1><Link to="/">Busan Food Guide</Link></h1>
                <nav id="nav">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><a href="left-sidebar.html">Left Sidebar</a></li>
                        <li><a href="right-sidebar.html">Right Sidebar</a></li>
                        <li><a href="no-sidebar.html">No Sidebar</a></li>
                        {!isLoggedIn ? (
                            <li><Link to="/login" className="button special">Sign Up</Link></li>
                        ) : (
                            <li ref={dropdownRef} style={{ position: "relative" }}>
                            <span
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                            >
                                <FaIcons.FaUserCircle size={24} style={{verticalAlign: "sub"}}/>
                            </span>
                                {dropdownOpen && (
                                    <ul
                                        style={{
                                            position: "absolute",
                                            right: 0,
                                            top: "100%",
                                            backgroundColor: "white",
                                            border: "1px solid #ccc",
                                            padding: "0.5rem",
                                            listStyle: "none",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                            zIndex: 9999,
                                            width: "120px"
                                        }}
                                    >
                                        <li>
                                            <Link to="/profile" onClick={() => setDropdownOpen(false)}>
                                                내 정보
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                style={{
                                                    background: "none",
                                                    border: "none",
                                                    padding: 0,
                                                    marginTop: "0.5rem",
                                                    color: "red",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                로그아웃
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;

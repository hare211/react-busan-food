import {Link} from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import * as FaIcons from "react-icons/fa";

const Header = () => {
    const { isLoggedIn } = useAuth();

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
                            <li><Link to="/register" className="button special">Sign Up</Link></li>
                        ) : (
                            <li>
                                <Link to="/profile">
                                    <FaIcons.FaUserCircle size={24} style={{verticalAlign: "sub"}}/>
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;

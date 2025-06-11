const Header = () => {
    return (
        <>
            <header id="header" className="skel-layers-fixed">
                <h1><a href="#">Busan Food Guide</a></h1>
                <nav id="nav">
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="left-sidebar.html">Left Sidebar</a></li>
                        <li><a href="right-sidebar.html">Right Sidebar</a></li>
                        <li><a href="no-sidebar.html">No Sidebar</a></li>
                        <li><a href="#" className="button special">Sign Up</a></li>
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;

import React from "react";
import '../styles/Header.css';


function Header() {
    return (
        <div>
            <div className="topbar d-flex align-items-center">
                <nav className="navbar navbar-expand">
                    <div className="mobile-toggle-menu"><i className='bx bx-menu'></i></div>
                </nav>
            </div>
        </div>
    )
}

export default Header;
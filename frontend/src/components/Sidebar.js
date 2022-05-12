import React from "react";
import {slide as Menu} from 'react-burger-menu';
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthContext";

import '../styles/Sidebar.css';


function Sidebar() {
    let { user, logoutUser} = React.useContext(AuthContext);

    return (
        <Menu>
            <Link to="/" className="menu-item">
                Home
            </Link>
            <span> </span>

            {user ? (
                <a onClick={logoutUser}> logout</a>
            ): (
                    <Link to={'/login/'}> login </Link>
                    )}
        </Menu>
    )
}

export default Sidebar;
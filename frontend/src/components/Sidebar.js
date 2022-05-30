import React from "react";
import {slide as Menu} from 'react-burger-menu';
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthContext";

import '../styles/Sidebar.css';

// Функция и представление боковой части
function Sidebar() {

    // Смотрим, если пользователь уже авторизован или нет
    	let {user, logoutUser} = React.useContext(AuthContext);

    return (
        <Menu>
            <Link to="/" className="menu-item">
                Home
            </Link>

            <span> </span>

            {user ? (
                <a onClick={logoutUser}> Logout</a>

            ) : (
                <Link to={'/login/'}> Login </Link>
            )}

        </Menu>
    )
}

export default Sidebar;

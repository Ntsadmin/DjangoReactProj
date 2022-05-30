import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {slide as Menu} from 'react-burger-menu';
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthContext";

import '../styles/Sidebar.css';

// Функция и представление боковой части
function Sidebar() {

    // Смотрим, если пользователь уже авторизован или нет
    let navigate = useNavigate()
    let {user, logoutUser} = React.useContext(AuthContext);
    const [login, setLogin] = useState(false);

    const logingOut = () => {
        logoutUser();
        return navigate("/login")
    }

    useEffect(() => {
        if (user) {
            setLogin(true)
        } else {
            setLogin(false)
        }
    })

    return (
        <Menu>
            <Link to="/" className="menu-item">
                Home
            </Link>

            <span> </span>

            {login ? (
                <a onClick={logingOut}> Logout</a>

            ) : (
                <Link to={'/login/'}> Login </Link>
            )}

        </Menu>
    )
}

export default Sidebar;
import React, {useContext, useEffect} from "react";
import '../styles/Header.css';
import AuthContext from "../context/AuthContext";
import {Link} from "react-router-dom";


function Header() {

    let {user, logoutUser} = useContext(AuthContext)


    return (
        <div className={'navbar'}>
            <nav className={"logoutButton"}>
                <ul>
                    <li>
                        {user ? (
                            <a onClick={logoutUser}>logout</a>
                        ) : (

                            <Link to={"/login"}> Login </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;
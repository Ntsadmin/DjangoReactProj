import React, {useContext, useEffect} from "react";
import '../styles/Header.css';
import AuthContext from "../context/AuthContext";
import {Link} from "react-router-dom";


function Header() {

    let {user, logoutUser} = useContext(AuthContext)

    const linkStyle = {
        margin: "1rem",
        textDecoration: "none",
        color: 'white'
    };


    return (
        <div className={'navbar'}>
            <nav className={"logoutButton"}>


                {user ? (
                    <ul>
                        <li>
                            <Link to={"/"} style={linkStyle}>Home</Link>
                        </li>
                        <li>
                            <Link to={"/shift/"} style={linkStyle}>ShitInfo</Link>
                        </li>
                        <li>
                            <a onClick={logoutUser}>logout</a>
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <Link to={"/login"}>Login </Link>
                        </li>
                    </ul>

                )}

            </nav>
        </div>
    )
}

export default Header;
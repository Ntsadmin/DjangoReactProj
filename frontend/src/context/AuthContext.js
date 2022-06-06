import React from "react";
import {useState, useEffect} from 'react'
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom'


const AuthContext = React.createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()


    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('https://192.100.1.108/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
        })
        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        } else {
            alert('Вводные данные неверны! Попробуйте ещё раз!')
        }
    }


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login/')
    }

    let contextData = {
        user: user,
        authTokens: authTokens,
        setAuthTokens: setAuthTokens,
        setUser: setUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    useEffect(() => {

        if (authTokens) {
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false);


    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}

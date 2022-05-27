import React, {useContext} from 'react';
import AuthContext from "../context/AuthContext";

import "../styles/Login.css";

// Функция и представление для захода пользователей на приложение
const LoginPage = () => {

    let {loginUser} = useContext(AuthContext)

    return (
        <div className={"loginForm"}>
            <form onSubmit={loginUser}>
                <label className={"label-text"}>Username: </label>
                <input className={"Username"} type={'text'} name={'username'}
                       placeholder={"Enter your username... "} />

                <label className={"label-text"}>Password: </label>
                <input className={"Password"} type={'password'} name={'password'}
                       placeholder={'Enter your password...'} />
                <button type={"submit"} className={"form-submit"}>submit</button>
            </form>
        </div>
    )
}
export default LoginPage;
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "../src/components/App";
import Header from "../src/Standart/Header";
import {AuthProvider} from "../src/context/AuthContext";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';


if (process.env.NODE_ENV === 'production') {
	disableReactDevTools();
}


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Header/>
                <App/>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
    , document.getElementById("root"))

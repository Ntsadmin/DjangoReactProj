import React from "react";
import {Route, Routes} from 'react-router-dom';

import '../styles/App.css';

import Header from "../Standart/Header";
import Footer from "../Standart/Footer";
import Units from "./Units";
import DownCause from "./DownCause";
import Sidebar from "./Sidebar";
import LoginPage from "./Login";


import {AuthProvider} from "../context/AuthContext";
import PrivateRoute from "../utils/PrivateRoute";


// Функция ответственная за структуру приложении
function App() {

    return (
        <div>

            <header>
                <Header/>
            </header>

            <main className="wrapper" id={"wrapper"}>

                <div className={"sidebar-content"}>
                    <AuthProvider>
                        <Sidebar pageWrapId={'wrapper'} outerContainerId={'outer-container'}/>
                    </AuthProvider>
                </div>


                <div className={"content-wrapper"}>
                    <AuthProvider>
                        <Routes>
                            <Route path={"/login/"}
                                   element={<LoginPage/>}/>

                            <Route path={"/cause/"}
                                   element={<PrivateRoute>
                                       <DownCause/>
                                   </PrivateRoute>}/>


                            <Route exact path={"/"}
                                   element={<PrivateRoute>
                                       <Units/>
                                   </PrivateRoute>}/>
                        </Routes>
                    </AuthProvider>
                </div>


            </main>

            <footer className="page-footer">
                <Footer/>
            </footer>

        </div>

    );

}

export default App;

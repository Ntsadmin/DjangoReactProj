import React, {useEffect} from "react";
import {Route, Routes} from 'react-router-dom';
import '../styles/App.css';

import Header from "../Standart/Header";
import Footer from "../Standart/Footer";
import TechOp from "./TechOp";
import Units from "./Units";
import DownCause from "./downCause";
import Sidebar from "./sidebar";
import LoginPage from "./Login";

import {AuthProvider} from "../context/AuthContext";
import PrivateRoute from "../utils/PrivateRoute";

const unitsList = ["Мойка 1", "Мойка 2", "Шаблонирование 1", "Шаблонирование 2", "НК 1", "НК 2", "Токарка 2",
        "Токарка 1", "Муфтоотворот 1", "Муфтоотворот 2", "Муфтонаворот 1", "Муфтонаворот 2", "Опрессовка 1",
        "Опрессовка 2", "Маркировка 1", "Маркировка 2"];

function App() {

    return (
        <div>

            <header>
                <Header/>
            </header>

            <main className="wrapper" id={"wrapper"} style={{
                backgroundImage: `url('../media/background.jpg')`
            }}>

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

                            <Route path={"/techOp/:id"}
                                   element={<PrivateRoute>
                                       <TechOp unitsList={unitsList}/>
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

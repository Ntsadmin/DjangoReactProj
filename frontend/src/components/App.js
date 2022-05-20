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

const units = {
    "Мойка 1": 10,
    "Мойка 2": 50,
    "Шаблонирование 1": 11,
    "Шаблонирование 2": 51,
    "Муфтоотворот 1": 12,
    "Муфтоотворот 2": 52,
    "НК 1": 13,
    "НК 2": 53,
    "Токарка 1": 14,
    "Токарка 2": 54,
    "Муфтонаворот 1": 15,
    "Муфтонаворот 2": 55,
    "Опрессовка 1": 16,
    "Опрессовка 2": 56,
    "Маркировка 1": 17,
    "Маркировка 2": 57
}

function App() {

    // const [dayShift, setDayShift] = React.useState(false)
    // const [nightShift, setNightShift] = React.useState(false)
    //
    // useEffect(()=> {
    //     const timer = setTimeout(()=>{
    //         let date = new Date();
    //         if (date.getHours() >= 8 && !dayShift) {
    //             setDayShift(true);
    //             setNightShift(false)
    //             console.log("well that's dayShift")
    //         }
    //         if (date.getHours() >= 20 && !nightShift) {
    //             setNightShift(true);
    //             setDayShift(false);
    //             console.log("well that's nightShift")
    //         }
    //     }, 60000)
    // }, [])

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
                                       <TechOp unitsList={units}/>
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

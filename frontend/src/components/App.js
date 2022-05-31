import React from "react";
import {Route, Routes} from 'react-router-dom';

import '../styles/App.css';

import Footer from "../Standart/Footer";
import Units from "./Units";
import DownCause from "./DownCause";
import LoginPage from "./Login";
import PrivateRoute from "../utils/PrivateRoute";


// Функция ответственная за структуру приложении
function App() {

    return (
        <div>
            <main className="wrapper" id={"wrapper"}>
                <div className={"content-wrapper"}>
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
                </div>


            </main>

            <footer className="page-footer">
                <Footer/>
            </footer>

        </div>

    );

}

export default App;

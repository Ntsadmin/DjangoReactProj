import React from "react";
import {Prompt, Route, Routes} from 'react-router-dom';

import '../styles/App.css';

import Footer from "../Standart/Footer";
import Units from "./Units";
import LoginPage from "./Login";
import PrivateRoute from "../utils/PrivateRoute";
import ShiftInfo from "./shiftInfo";


// Функция ответственная за структуру приложении
function App() {

    return (
        <div>
            <main className="wrapper" id={"wrapper"}>
                <div className={"content-wrapper"}>
                        <Routes>
                            <Route path={"/login/"}
                                   element={<LoginPage/>}/>

                            <Route exact path={"/"}
                                   element={<PrivateRoute>
                                       <Units/>
                                   </PrivateRoute>}/>
                            <Route path={"/shift/"}
                                   element={<PrivateRoute>
                                       <ShiftInfo/>
                                   </PrivateRoute>} />
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

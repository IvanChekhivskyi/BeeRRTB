import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter} from "react-router-dom";
import NaviBar from "./components/NaviBar/NaviBar";
import AppRouter from "./components/Router/AppRouter";



const App = () => {
    return (
        <>
            <BrowserRouter>
                <NaviBar/>
                <AppRouter/>
            </BrowserRouter>
        </>
    );
};

export default App;
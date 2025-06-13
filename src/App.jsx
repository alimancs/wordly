import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import FavoritePage from "./pages/Favorite";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/> 
                <Route path="/favorites" element={<FavoritePage/>}/> 
            </Routes>
        </BrowserRouter>
    )
}

export default App;
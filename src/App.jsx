import React from "react";
import "./App.css";
import Layout from "./components/Layout";

const App = () => {
    return (
        <div className="md:h-screen h-[900px] flex flex-col justify-end w-screen bg-[#3a0ca3]">
            <div className="w-screen h-[60%] rounded-tl-[100%] rounded-tr-[40%] bg-[#4cc9f0]"></div>
            <Layout/>
        </div>
    )
}

export default App;
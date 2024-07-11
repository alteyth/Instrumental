import { useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Services from "./pages/Services/Services";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <>
            <NavBar />
            <div>
                <Routes>
                    <Route path="/" />
                    <Route path="/services" element={<Services />} />
                    <Route path="about" />
                </Routes>
            </div>
            <Footer />
        </>
    );
}

export default App;

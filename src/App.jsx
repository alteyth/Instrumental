import { useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Services from "./pages/Services/Services";
import Footer from "./components/Footer/Footer";
import About from "./pages/About/About";
import Cart from './pages/Cart/Cart'

function App() {
    return (
        <>
            <NavBar />
            <div>
                <Routes>
                    <Route path="/" element={HomePage} />
                    <Route path="/services" element={<Services />} />
                    <Route path="about" element={<About />}/>
                    <Route path="cart" element={<Cart />}/>
                </Routes>
            </div>
            <Footer />
        </>
    );
}

export default App;

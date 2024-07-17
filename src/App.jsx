import { useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Services from "./pages/Services/Services";
import Footer from "./components/Footer/Footer";
import About from "./pages/About/About";
import Cart from './pages/Cart/Cart';
import Register from './pages/Register/Register';
import PersonalArea from "./pages/PersonalArea/PersonalArea";
import { SessionProvider } from "./context/SessionContext";
import Login from "./pages/Login/Login";
import './app.css'

function App() {
    return (
        <>
                <SessionProvider>
                    <NavBar />
                    <div>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/about" element={<About />}/>
                            <Route path="/cart" element={<Cart />}/>
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/personalarea" element={<PersonalArea />} />
                        </Routes>
                    </div>
                    <Footer />
                </SessionProvider>
        </>
    );
}

export default App;

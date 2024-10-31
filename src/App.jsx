import { useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Services from "./pages/Services/Services";
import Footer from "./components/Footer/Footer";
import About from "./pages/About/About";
import Cart from './pages/Cart/Cart';
import Register from './pages/Register/Register';
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminProducts from "./pages/AdminProducts/AdminProducts";
import AdminCostumers from "./pages/AdminCostumers/AdminCostumers";
import PersonalArea from "./pages/PersonalArea/PersonalArea";
import { SessionProvider } from "./context/SessionContext";
import Login from "./pages/Login/Login";
import './app.css'

function App() {
    const location = useLocation(); //per accedere poi alla route /admin 

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
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/admin/products" element={<AdminProducts />} />
                            <Route path="/admin/customers" element={<AdminCostumers />} />
                        </Routes>
                    </div>

                    {/* Il footer non verrà mostrato se siamo nella admin dashboard */}
                    {location.pathname !== "/admin" && location.pathname !== "/admin/products" && location.pathname !== "/admin/customers" && <Footer />} 
                </SessionProvider>
        </>
    );
}

export default App;

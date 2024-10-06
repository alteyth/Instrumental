import React, { useEffect } from "react";
import { ShoppingCart } from "phosphor-react";
import Logo from "../../assets/instrumental.svg";
import styles from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link, useLocation } from "react-router-dom";
import { useSession } from "../../context/SessionContext";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation(); // Usa useLocation per sapere la pagina corrente
    const { isLogged, setIsLogged, cart, setCart } = useSession();
    const { isAdmin, setIsAdmin } = useSession();

    function logout(){
        setIsLogged(false);
        setIsAdmin(false);
        setCart([]);
    }

    // Se l'utente effettua il logout viene riportato alla home
    useEffect(() => {
        if (!isLogged) {
            navigate("/");
        }
    }, [isLogged]);

    useEffect(() => {
        console.log("isAdmin:", isAdmin);
    }, [isAdmin]);

    // Verifica se siamo nella dashboard dell'amministratore
    const isAdminDashboard = location.pathname === "/admin" || location.pathname === "/admin/products"  || location.pathname === "/admin/customers";

    return (
        <>
            <header className={styles.header}>
                <Link to="/"><img src={Logo} alt="Logo Instrumental" className={styles.logo}/></Link>

                {!isAdminDashboard && (
                    <>
                        <nav className={styles.menu}>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/services">Services</Link>
                                </li>
                                <li>
                                    <Link to="/about">About</Link>
                                </li>
                            </ul>
                        </nav>

                        <SearchBar />
                    </>
                )}

                <div className={styles.buttons}>
                    {isAdminDashboard ? (
                        <>
                            <Link to="/">Home</Link>
                            <Link onClick={logout}> Logout </Link>
                        </>
                    ) : (
                        <>
                            {isLogged && cart[0] !== undefined ? (
                                <Link to="/cart" className={styles.icon}>
                                    <ShoppingCart size={20} />
                                </Link>
                            ) : (
                                <Link to="/" className={styles.icon}>
                                    <ShoppingCart size={20} />
                                </Link>
                            )}

                            {isAdmin ? (
                                <>
                                    <Link to="/admin"> Admin Dashboard </Link>                                  
                                    <Link onClick={logout}> Logout </Link>
                                    
                                </>
                            ) : (
                                isLogged ? (
                                    <>
                                        <Link to="/personalarea"> Personal Area </Link>
                                        <Link onClick={logout}> Logout </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/register"> Register </Link>
                                        <Link to="/login"> Login </Link>
                                    </>
                                )
                            )}
                        </>
                    )}
                </div>
            </header>
        </>
    );
}

export default NavBar;

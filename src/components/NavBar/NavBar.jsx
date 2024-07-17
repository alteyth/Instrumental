import React, { useEffect } from "react";
import { ShoppingCart } from "phosphor-react";
import Logo from "../../assets/instrumental.svg";
import styles from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { useSession } from "../../context/SessionContext";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();
    const { isLogged, setIsLogged, cart, setCart } = useSession();

    function logout(){
        setIsLogged(false);
        setCart([]);
    }

    useEffect(() => {
        if(!isLogged){
            navigate("/");
        }
    }, [isLogged]);

    return (
        <>
            <header className={styles.header}>
                <Link to="/"><img src={Logo} alt="Logo Instrumental" className={styles.logo}/></Link>

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
                    <div className={styles.buttons}>
                        {
                            (isLogged && cart[0] !== undefined) ?
                        <>
                            <Link to="/cart" className={styles.icon}>
                            <ShoppingCart size={20} />
                            </Link>
                        </>
                        :
                        <>
                            <Link to="/" className={styles.icon}>
                            <ShoppingCart size={20} />
                            </Link>
                        </>

                        }

                        {
                            isLogged ?
                        <>
                            <Link to="/personalarea"> Personal Area </Link>
                            <Link onClick={() => logout()}> Logout </Link>
                        </> 
                        :
                        <>
                            
                            <Link to="/register"> Register </Link>
                            <Link to="/login"> Login </Link>
                        </>
                    }
                    </div>
            </header>
        </>
    );
}

export default NavBar;

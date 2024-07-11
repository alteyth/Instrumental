import React, { userState} from 'react'
import Logo from '../../assets/instrumental.svg'
import styles from './NavBar.module.css'
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom'

function NavBar() {
    return(
        <>
        <header className={styles.header}>
        
        <img src={Logo} alt="Logo Instrumental" className={styles.logo}/>

        <nav className={styles.menu}>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
        
        <SearchBar/>

        <div className={styles.buttons}>
            <Link to="/register"> Register </Link>
            <Link to="/login"> Login </Link>
        </div>
        
        </header>
        </>
    );
};

export default NavBar;
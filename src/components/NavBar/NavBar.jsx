import React, { userState} from 'react'
import Logo from '../../assets/instrumental.svg'
import styles from './NavBar.module.css'

function NavBar() {
    return(
        <>
        <header className={styles.header}>
        
        <img src={Logo} alt="Logo Instrumental" className={styles.logo}/>

        <nav className={styles.menu}>
            <ul>
                <li><a href="">Home</a></li>
                <li><a href="">Services</a></li>
                <li><a href="">About</a></li>
            </ul>
        </nav>
        
        <div className={styles.buttons}>
            <a href=""> Register </a>
            <a href=""> Login </a>
        </div>

        </header>
        </>
    );
};

export default NavBar;
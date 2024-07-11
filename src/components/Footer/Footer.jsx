import React, { userState } from "react";
import styles from "../Footer/Footer.module.css";
import Logo from "../../assets/instrumental.svg";
import { GithubLogo, LinkedinLogo } from "phosphor-react";

function Footer() {
    return (
        <footer>
            <div>
                <img
                    src={Logo}
                    alt="Logo Instrumental"
                    className={styles.logo}
                />
            </div>
            <p>Copyright © 2024 Simone Seria Ltd.</p>
            <div className={styles.refs}>
        
                    <a href="https://github.com/alteyth" target="_blank"><GithubLogo className={styles.ghlogo} size={32} color="white" /></a>
                    <a href="https://www.linkedin.com/in/simoneseria/" target="_blank"><LinkedinLogo className={styles.lilogo} size={32} color="white"/></a>
            </div>
        </footer>
    );
}

export default Footer;

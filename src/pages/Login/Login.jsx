import React from "react";
import { useSession } from "../../context/SessionContext";
import { useNavigate } from "react-router-dom";

import styles from './Login.module.css'
import * as api from '../../api'

function Login(){

    const navigate = useNavigate();

    const {
        isLogged,
        isAdmin,
        setIsAdmin,
        setIsLogged,
        userId,
        setUserID,
        email,
        setEmail,
        password,
        setPassword,
        first_name,
        setFirst_name,
        last_name,
        setLast_name} = useSession();

    // Quando l'utente tenta di effettuare il login viene controllato che la mail esista nel DB e che la combinazione sia corretta
    async function handleSubmit(e){
        e.preventDefault();

        const formElements = e.target.elements;

        const inputEmail = formElements.email.value;
        const inputPassword = formElements.password.value;

        const data = { email: inputEmail, password: inputPassword};

        try{
            const checkData = await api.get();
            let tempUser;

            for(let i = 0; i < checkData.length; i++){
                if(inputEmail === checkData[i].email){
                    tempUser = checkData[i];
                    break;
                }

            }

            // Se non troviamo l'utente, mostriamo un messaggio di errore
            if (!tempUser) {
                alert('This Email address is not registered');
                return;
            }

            if(inputPassword === tempUser.password){
                setIsLogged(true);
                setUserID(tempUser.id);
                setPassword(tempUser.password);

                // Se l'utente ha id = 1, è un admin
                if (tempUser.id === "1") {
                    setIsAdmin(true);
                    console.log("User is admin, setting isAdmin to true");
                    console.log("User ID:", tempUser.id); // Log dell'ID dell'utente
                } else {
                    setIsAdmin(false);
                    console.log("User is not admin, setting isAdmin to false");
                    console.log("User ID:", tempUser.id); // Log dell'ID dell'utente
                }


                return;
                
                
            }
            else{
                alert('Email/Password combination is incorrect');
            }
        }catch(error){
            console.error('Registration failed', error);
        }
    };

    // Ogni volta che isLogged cambia questa funzione viene chiamata. Torna in home al logout
    React.useEffect(() => {
        if(isLogged){
            navigate('/');
        }
    }, [isLogged]);

    return(
        
        <>
        <div className={styles.pageLayout}>
            
            <div className={styles.layout}>
                
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h1>Login</h1>
                    <div>
                        <input type="text" name="email" id="email" required placeholder="Email address"/>
                    </div>

                    <div>
                        <input type="password" name="password" id="password" required placeholder="Password"/>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default Login;
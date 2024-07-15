import React from "react";
import { useSession } from "../../context/SessionContext";
import { useNavigate } from "react-router-dom";

import styles from './Login.module.css'
import * as api from '../../api'

function Login(){

    const navigate = useNavigate();

    const {
        isLogged,
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

    async function handleSubmit(e){
        e.preventDefault();

        const formElements = e.target.elements;

        const inputEmail = formElements.email.value;
        const inputPassword = formElements.password.value;

        const data = { email: inputEmail, password: inputPassword};

        try{
            const checkData = await api.get();
            var tempUser;

            for(let i = 0; i < checkData.length; i++){
                if(inputEmail === checkData[i].email){
                    tempUser = checkData[i];
                    break;
                }
                alert('This Email address is not registered');
                return;
            }
            if(inputPassword === tempUser.password){
                setIsLogged(true);
                setUserID(tempUser.id);
                setPassword(tempUser.password);
                return;
                
            }
            else{
                alert('Email/Password combination is incorrect');
            }
        }catch(error){
            console.error('Registration failed', error);
        }
    };

    // Every time that isLogged changes, this useEffect will run and print the value of isLogged
    React.useEffect(() => {
        if(isLogged){
            navigate('/');
        }
    }, [isLogged]);

    return(
        <>
        <div className={styles.pageLayout}>
            <h1>Login</h1>
            <div className={styles.layout}>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
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
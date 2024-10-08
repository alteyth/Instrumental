import React from "react";
import { useSession } from "../../context/SessionContext";
import { useNavigate } from "react-router-dom";
import styles from './Register.module.css'
import * as api from '../../api'

function Register(){
    
    const navigate = useNavigate();

    const {
        isLogged,
        setIsLogged,
        isAdmin,
        setIsAdmin,
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

        


    async function handleSubmit(e) {
        e.preventDefault();

        const formElements = e.target.elements;

        const inputEmail = formElements.email.value;
        const inputPassword = formElements.password.value;
        const inputConfirmPassword = formElements.passwordConfirm.value;
        const inputFirst_name = formElements.first_name.value;
        const inputLast_name = formElements.last_name.value;

        const emailCheck = [];

        if(inputPassword !== inputConfirmPassword){
            alert("Passwords don't match!");
            return;
        }

        const data = {
            email: inputEmail,
            password: inputPassword,
            first_name: inputFirst_name,
            last_name: inputLast_name
        };

        //controlla se le l'email esiste già

        try{
            const checkData = await api.get();
            for(let i = 0; i < checkData.length; i++){
                emailCheck.push(checkData[i].email);
            }
        }catch(error){
            console.error('Error while trying to pull data');
            return;
        }

        for(let i = 0; i < emailCheck.length; i++){
            if(emailCheck[i] === inputEmail){
                alert("This email address is already registered");
                return;
            }
        }

        //Registra il nuovo utente 
        try{
            const response = await api.post(data);
            setUserID(response[0].id);
            setIsLogged(true);

             // Verifica se l'utente è admin
             if(userId === 1) {
                setIsAdmin(true); // Imposta lo stato admin a true
                alert("Welcome Admin!");
            }


        }catch(error){
            console.error('Registration failed', error);
        }     

        setPassword(inputPassword);
        setEmail(inputEmail);
        setFirst_name(inputFirst_name);
        setLast_name(inputLast_name);
    };

    // // Ogni volta che isLogged cambia questa funzione viene chiamata. Torna in home al logout
    React.useEffect(() => {
        if(isLogged){
            navigate('/');
        }
    }, [isLogged]);

    return(
        <>
        <div className={styles.pageLayout}>
            <h1>Register</h1>
            <div className={styles.layout}>
                    <form onSubmit={handleSubmit} className={styles.registerForm}>
                        <div>
                            <input type="text" placeholder="First Name" name="first_name" id="first_name" required />
                        </div>

                        <div>
                            <input type="text" placeholder="Last Name" name="last_name" id="last_name" required />
                        </div>

                        <div>
                            <input type="text" placeholder="Email address" name="email" id="email" required />
                        </div>
                        
                        <div>
                            <input type="password" placeholder="Password" name="password" id="password" required />
                        </div>

                        <div>
                            <input type="password" placeholder="Confirm Password" name="passwordConfirm" id="passwordConfirm" required />
                        </div>

                        <button type="submit">Register</button>
                    </form>
                </div>
        </div>
        </>
    );
}

export default Register;
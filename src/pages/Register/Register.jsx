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

        
        try{
            const response = await api.post(data);
            setUserID(response[0].id);
            setIsLogged(true);
        }catch(error){
            console.error('Registration failed', error);
        }     

        setPassword(inputPassword);
        setEmail(inputEmail);
        setFirst_name(inputFirst_name);
        setLast_name(inputLast_name);
    };

    // Every time that isLogged changes, this useEffect will run and print the value of isLogged
    React.useEffect(() => {
        console.log("/**** isLogged has been logged into useEffect")
        console.log(isLogged);
        if(isLogged){
            navigate('/');
        }
    }, [isLogged]);

    return(
        <>
            <div className={styles.layout}>
                <form onSubmit={handleSubmit}>
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
            <h1>{first_name}</h1>
            <br />
            <h1>{last_name}</h1>
            <br />
            <h1>{userId}</h1>
            <br />
            <h1>isLogged: {isLogged}</h1>
        </>
    );
}

export default Register;
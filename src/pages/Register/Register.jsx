import React from "react";
import { useSession } from "../../context/SessionContext";
import styles from './Register.module.css'

function Register(){

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

    function handleSubmit(e) {
        e.preventDefault();

        const formElements = e.target.elements;

        const inputEmail = formElements.email.value;
        const inputPassword = formElements.password.value;
        const inputConfirmPassword = formElements.passwordConfirm.value;
        const inputFirst_name = formElements.first_name.value;
        const inputLast_name = formElements.last_name.value;

        if(inputPassword !== inputConfirmPassword){
            alert("Passwords don't match!");
            return;
        }

        setPassword(inputPassword);
        setEmail(inputEmail);
        setFirst_name(inputFirst_name);
        setLast_name(inputLast_name);

        
    };

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
            <h1>{password}</h1>
        </>
    );
}

export default Register;
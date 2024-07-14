import React from "react";
import { useSession } from "../../context/SessionContext";
import'./Register.module.css'

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

        setEmail(inputEmail);
        setPassword(inputPassword);
        setFirst_name(inputFirst_name);
        setLast_name(inputLast_name);
    };

    return(
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="first_name"> First name: </label>
                    <input type="text" name="first_name" id="first_name" required />
                </div>

                <div>
                    <label htmlFor="second_name"> Last name: </label>
                    <input type="text" name="last_name" id="last_name" required />
                </div>

                <div>
                    <label htmlFor="email"> Email address: </label>
                    <input type="text" name="email" id="email" required />
                </div>
                
                <div>
                    <label htmlFor="password"> Password: </label>
                    <input type="text" name="password" id="password" required />
                </div>

                <div>
                    <label htmlFor="passwordConfirm"> Confirm Password: </label>
                    <input type="text" name="passwordConfirm" id="passwordConfirm" required />
                </div>

                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default Register;
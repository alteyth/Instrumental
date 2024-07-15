import React, { useState, useContext } from "react";

const SessionContext = React.createContext();

export function useSession(){
    return useContext(SessionContext);
}

export function SessionProvider(props){
    const [isLogged, setIsLogged] = useState(false);
    const [userId, setUserID] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [first_name, setFirst_name] = useState(null);
    const [last_name, setLast_name] = useState(null);

    const value = {
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
        setLast_name
    };
    return(
        <SessionContext.Provider value={value}> 
            {props.children}
        </SessionContext.Provider>

    )
}

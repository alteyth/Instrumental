import React, { useState, useContext } from "react";

const SessionContext = React.createContext();

export function useSession(){
    return useContext(SessionContext);
}

export function SessionProvider(props){
    const [products, setProducts] = useState(null)
    const [cart, setCart] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const [userId, setUserID] = useState(0);
    const [email, setEmail] = useState(0);
    const [password, setPassword] = useState(0);
    const [first_name, setFirst_name] = useState(0);
    const [last_name, setLast_name] = useState(0);

    const value = {
        products,
        setProducts,
        cart,
        setCart,
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

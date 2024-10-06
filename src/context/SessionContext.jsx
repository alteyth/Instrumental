import React, { useState, useContext } from "react";

const SessionContext = React.createContext();

export function useSession(){
    return useContext(SessionContext);
}

export function SessionProvider(props){
    const [searchTerm, setSearchTerm] = useState("");
    const [orders, setOrders] = useState(null);
    const [products, setProducts] = useState(null)
    const [cart, setCart] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userId, setUserID] = useState(0);
    const [email, setEmail] = useState(0);
    const [password, setPassword] = useState(0);
    const [first_name, setFirst_name] = useState(0);
    const [last_name, setLast_name] = useState(0);


    // Tutti questi stati sono disponibili in tutta l'app così da tenerne conto sempre nel sito
    const value = {
        orders,
        setOrders,
        searchTerm,
        setSearchTerm,
        products,
        setProducts,
        cart,
        setCart,
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
        setLast_name
    };
    return(
        <SessionContext.Provider value={value}> 
            {props.children}
        </SessionContext.Provider>

    )
}

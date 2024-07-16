import React from "react";
import { useSession } from "../../context/SessionContext";

function Cart(){
    const { cart, setCart } = useSession();
    return <h1>{cart[0].name}</h1>
}

export default Cart;
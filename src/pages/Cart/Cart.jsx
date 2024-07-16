import React, {useEffect} from "react";
import { useSession } from "../../context/SessionContext";
import { useNavigate } from "react-router-dom";
import CartProduct from "./CartProduct";
import styles from './Cart.module.css'
import * as api from '../../api'

function Cart(){
    const navigate = useNavigate();
    const { cart,
            setCart,
            isLogged,
            userId
            } = useSession();

    function checkoutSum(){
        let total = 0;
        for(let i = 0; i < cart.length; i++){
            total = total + parseFloat(cart[i].price);
        }
        return total;
    }

    function cartItemNames(){
        let names = "";
        for(let i = 0; i < cart.length; i++){
            names = names.concat(", ", cart[i].name);
        }
        return names;
    }

    async function handleCheckout(e){
        e.preventDefault();
        const items = cartItemNames();
        const total_price = checkoutSum();
        const data = {
            by_user: userId,
            items: items,
            total_price: total_price
        }

        try{
            const response = await api.postOrder(data);
        }catch(error){
            console.error('Order registration failed', error);
        }finally{
            setCart([]);
        }
    }

    useEffect(() => {
        if(cart.length === 0){
            navigate('/');
        }
    }, [cart]);

    return (
        <>
        <div>
            <div className={styles.products}>
                {
                    isLogged ?
                    <>
                        {cart.map((product) => (
                    <CartProduct key={product.id} data={product}/>
                ))}
                    <p className={styles.totalText}>Total:</p>
                    <p className={styles.totalAmount}>{checkoutSum()} €</p>
                    </>
                    :
                    <>
                        <div></div>
                    </>
                }
            <button className={styles.checkoutBttn} onClick={handleCheckout}>Checkout</button>
            </div>
            </div>
        </>
    )
}

export default Cart;
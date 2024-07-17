import React from "react";
import { useSession } from "../../context/SessionContext";
import styles from './CartProduct.module.css'

function CartProduct(props){

    const { cart, setCart } = useSession();
    const { id, name, price, image_src, created_at } = props.data;

    // Questa funzione gestiscec l'eliminazione degli item dal carrello, viene triggerata quando l'utente preme il tasto corrispondente
    function removeProduct(item){
            for(let i = 0; i < cart.length; i++){
                if(cart[i].name == name){
                    setCart(prevCartState => {
                        return prevCartState.filter((value, k) => k !== i)
                    })
                }
            }
        
    
    }

    return(
        <>
            <div className={styles.product}>
                <img src={image_src} />
                <div className={styles.description}>
                    <p>
                        <b>{name}</b>
                    </p>
                    <p>
                        {price} €
                    </p>
            </div>
            <button className={styles.removeBttn} onClick={() => removeProduct(props.data)}>Remove</button>
            </div>
        </>
    )
}

export default CartProduct;
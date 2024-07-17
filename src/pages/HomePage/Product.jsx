import React from "react";
import styles from './Product.module.css'
import { useSession } from "../../context/SessionContext";

function Product(props){

    const { cart, setCart, searchTerm } = useSession();

    const {id, name, price, image_src, created_at} = props.data;

    function addToCart(item){
        setCart(prevCartState => [...prevCartState, item]);
    }

    return(
        <>
            {
                (name.toLowerCase().includes(searchTerm)) ?
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
                        <button className={styles.addToCartBttn} onClick={() => addToCart(props.data)}>Add to cart</button>
                    </div>
                </>
                :
                <>

                </>
            }
        </>
    )
}

export default Product;
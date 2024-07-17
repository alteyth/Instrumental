import React from "react";
import { useSession } from "../../context/SessionContext";
import styles from './Order.module.css'

function Order(props){

    const {id, by_user, created_at, total_price} = props.data;

    return(
        <>
            <div className={styles.orders}>
                <div className={styles.order}>
                    <div className={styles.labels}>
                        <h1>ID</h1>
                        <h1>Date</h1>
                        <h1>Total Price</h1>
                    </div>

                    <div className={styles.values}>
                        <p>#{id}</p>
                        <p>{created_at}</p>
                        <p>{total_price} €</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order;
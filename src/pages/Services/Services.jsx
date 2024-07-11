import React, { userState } from "react";
import styles from './Services.module.css'

function Services(){
    return(
        <>
            <div className={styles.layout}>
                <h1> Services </h1>
                <div className={styles.container}>
                    <div>
                        <h2> Payments </h2>

                        <h3> Satisfied or Money Back </h3>
                        <p> 
                            At Instrumental we are trust our Quality Assurance so much that you will never recieve a faulty product.
                            Should it happen, we will send you a full refund and you get to <b>keep</b> the product.
                        </p>

                        <h3> Order Elaboration </h3>
                        <p>
                            During the process of Order Elaboration, you will recieve a confirmation e-mail with all the details and documentation of your chosen products.
                            During this phase you can decide to cancel your order without any notice and as you want.
                        </p>
                    </div>

                    <div>
                        <h2> Shipments </h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Beatae unde doloremque dignissimos rerum blanditiis illum at numquam, voluptatibus optio perspiciatis autem corrupti quia eius sed dolores reiciendis.
                            Quia, laudantium deserunt.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Services;
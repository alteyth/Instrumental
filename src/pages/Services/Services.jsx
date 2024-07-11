import React, { userState } from "react";
import styles from "./Services.module.css";

function Services() {
    return (
        <>
            <div className={styles.layout}>
                <h1> Services </h1>
                <div className={styles.container}>
                    <div>
                        <h2> Payments </h2>

                        <h3> Accepted Payment Methods</h3>
                        <p>
                            We accept Credit Card, PayPal or really any other of
                            the main payment methods.
                        </p>

                        <h3> Satisfied or Money Back </h3>
                        <p>
                            At Instrumental we are trust our Quality Assurance
                            so much that you will never recieve a faulty
                            product. Should it happen, we will send you a full
                            refund and you get to <b>keep</b> the product.
                        </p>

                        <h3> Order Elaboration </h3>
                        <p>
                            During the process of Order Elaboration, you will
                            recieve a confirmation e-mail with all the details
                            and documentation of your chosen products. During
                            this phase you can decide to cancel your order
                            without any notice and as you want.
                        </p>

                        <h3> Order Completion </h3>
                        <p>
                            Upon order completion, the <b>shipment</b> phase
                            begins.
                        </p>
                    </div>

                    <div>
                        <h2> Shipments </h2>

                        <h3> Couriers </h3>
                        <p>Our most used couriers are DHL, BRT, UPS and TNT.</p>

                        <h3> Delivery Times</h3>
                        <p>
                            Delivery time may vary based on your distance from
                            our warehouse. For order inside italian territory,
                            the expected delivery time is at most{" "}
                            <b>2 working days</b>. For orders outside italian
                            territory it is at most <b>5 working days</b>.
                        </p>

                        <h3> </h3>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Services;

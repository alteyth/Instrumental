import React, { userState } from "react";
import styles from "./About.module.css";

function About() {
    return (
        <>
            <div className={styles.layout}>
                <h1> About </h1>
                <div className={styles.container}>
                    <div>
                        <h2> What is <i>instrumental</i>? </h2>

                        <h3> Our Mission </h3>
                        <p>
                            At instrumental we deeply care about our customers satisfaction. The only way to achieve this is through a constant pursuit of quality.
                        </p>

                        <h3> It's about you </h3>
                        <p>
                            Our customers are as important as quality to us.
                            We plan to start promotional plans to engage with the public and to let our dedication speak for itself.
                        </p>

                        <h3> Why you should choose us </h3>
                        <p>
                            If what you are looking is the utmost quality and customer care, <b>instrumental</b> is the right place.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;

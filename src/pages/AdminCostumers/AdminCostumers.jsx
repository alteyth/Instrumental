
import React, { useEffect, useState } from "react";
import { useSession } from "../../context/SessionContext";
import { useNavigate, Link } from "react-router-dom"; // Usa Outlet per il rendering di contenuti figli

import styles from "./AdminCostumers.module.css";
import { getOrders, get } from "../../api";


function AdminCostumers() {
    const { isAdmin, isLogged } = useSession();
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Controlla se l'utente è autenticato e se è un admin
        if (!isLogged || !isAdmin) {
            navigate("/");
        }
    }, [isAdmin, isLogged, navigate]);

    function logout(){
        setIsLogged(false);
        setIsAdmin(false);
        setCart([]);
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try {
     
                // Ottieni i dati dei clienti
                const customersData = await get(); // Ottiene tutti gli utenti (customers)
                console.log("Customers Data:", customersData);
                setCustomers(customersData); // Salva i clienti nello stato

            } catch (error) {
                console.error("Error while trying to pull data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    if (loading) {
        return <div>Loading...</div>; // Mostra un caricamento finché i dati non sono disponibili
    }
    
    return (
        <div className={styles.mainContainer}>
        <div className={styles.adminDashboard}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

            <nav className={styles.sidebar}>
                <ul className={styles.ul}>
                    <li>
                        <i  className="fa-solid fa-house"></i>
                        <Link to="/" className={styles.link}>Home</Link>
                    </li>

                    <li>
                        <i className="fa-solid fa-chart-simple"></i>
                        <Link to="/admin" className={styles.link}>
                            Dashboard
                        </Link>
                    </li>

                    <li>
                        <i className="fa-solid fa-cart-shopping"></i>
                        <Link to="/admin/products" className={styles.link}>Products</Link>
                    </li>

                    <li>
                        <i className="fa-solid fa-user"></i>
                        <Link to="/admin/customers" className={styles.link}>Customers</Link>
                    </li>

                    <li className={styles.logoutButtonContainer}>
                        <i  className="fa-solid fa-right-from-bracket"></i>
                        <Link onClick={logout} className={styles.logoutButton}> Logout </Link>
                    </li>
                    
                </ul>
            </nav>
            <div className={styles.boxesContainer}>
            <h1 className={styles.h1Customers}> Customers</h1>
            <>
            <table className={styles.customerTable}>
                <thead>
                    <tr>
                        <th className={styles.campi}>First Name</th>
                        <th className={styles.campi}>Last Name</th>
                        <th className={styles.campi}>Email</th>
                        <th className={styles.campi}>Id</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.length > 0 ? (
                        customers
                            .filter((customer) => customer.id !== 1) // Filtro per escludere l'admin con id = 1
                            .map((customer) => (
                                <tr key={customer.id} className={styles.customerRow}>
                                    <td className={styles.customerContent}>
                                        {customer.first_name}
                                    </td>
                                    <td className={styles.customerContent}>
                                        {customer.last_name}
                                    </td>
                                    <td className={styles.customerContent}>
                                        {customer.email}
                                    </td>
                                    <td className={styles.customerContent}>   
                                        {customer.id} </td>
                                </tr>
                            ))
                    ) : (
                        <tr>
                            <td colSpan="2">No customers found.</td> {/* Messaggio di fallback se non ci sono clienti */}
                        </tr>
                    )}
                </tbody>
            </table>
            </>
            </div>
            </div>
    </div>
    );
}

export default AdminCostumers; 
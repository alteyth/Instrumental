import React, { useEffect, useState } from "react";
import { useSession } from "../../context/SessionContext";
import { useNavigate, Link } from "react-router-dom"; // Usa Outlet per il rendering di contenuti figli

import styles from "./AdminDashboard.module.css";
import { getOrders, get } from "../../api";

function AdminDashboard() {
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
                const ordersData = await getOrders();
                setOrders(ordersData);
                
                // Calcola il total_price sommando tutti i total_price degli ordini
                const total = ordersData.reduce((sum, order) => sum + Number(order.total_price), 0);
                setTotalPrice(total); // Aggiorna il total_price

                // Ottieni i dati dei clienti
                const customersData = await get(); // Ottiene tutti gli utenti (customers)
                setCustomers(customersData); // Salva i clienti nello stato

            } catch (error) {
                console.error("Error while trying to pull data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Contiamo il numero di ordini
    const orderCount = orders.length;
    const customerCount = customers.length;

    if (loading) {
        return <div>Loading...</div>; // Mostra un caricamento finché i dati non sono disponibili
    }
    
    return (
        <div className={styles.mainContainer}>
        <div className={styles.adminDashboard}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            <nav className={styles.sidebar}>

                <ul className={styles.ul}>
                    <li className={styles.linkContainer}>
                        <i class="fa-solid fa-house"></i>
                        <Link to="/" className={styles.link}>Home</Link>
                    </li>

                    <li className={styles.linkContainer}>
                        <i className="fa-solid fa-chart-simple"></i>
                        <Link to="/admin" className={styles.link}>
                            Dashboard
                        </Link>
                    </li>

                    <li className={styles.linkContainer}>
                        <i className="fa-solid fa-cart-shopping"></i>
                        <Link to="/admin/products" className={styles.link}>Products</Link>
                    </li>

                    <li className={styles.linkContainer}>
                        <i className="fa-solid fa-user"></i>
                        <Link to="/admin/customers" className={styles.link}>Customers</Link>
                    </li>

                    <li className={styles.logoutButtonContainer}>
                        <i class="fa-solid fa-right-from-bracket"></i>
                        <Link onClick={logout} className={styles.logoutButton}> Logout </Link>
                    </li>
                    
                </ul>
            </nav>
            <div  className={styles.h1Dashboard}>
            <h1>Dashboard</h1>
            
            <div className={styles.boxesContainer}>
            <div className={styles.totalPrice}>                    
                <p className={styles.priceNumber}>{totalPrice.toFixed(2)}€</p> {/* Mostra il total_price formattato */}
                <i className="fa-solid fa-money-bills"></i>
                <h3 className={styles.h3Price}>Revenue</h3>
            </div>

            {/* Nuova sezione per mostrare il numero di ordini */}
            <div className={styles.orderCount}>  
                <h3>{orderCount}</h3>
                <i class="fa-solid fa-cart-shopping"></i>
                <h3>Orders </h3> {/* Mostra il numero di ordini */}
            </div>

            <div className={styles.customerCount}>  
                <h3>{customerCount}</h3>
                <i class="fa-solid fa-user"></i>
                <h3>Customers</h3> {/* Mostra il numero di clienti */}
            </div>
            </div>

            <table className={styles.customerTable}>
                <thead>
                    <tr>
                    <th className={styles.campi}>Order Id</th>
                        <th className={styles.campi}>User Id</th>
                        <th className={styles.campi}>Created At</th>
                        <th className={styles.campi}>Product</th>
                        <th className={styles.campi}>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders
                            .map((order) => (
                                <tr key={order.id} className={styles.customerRow}>
                                    <td className={styles.customerContent}>
                                        {order.id}
                                    </td>

                                    <td className={styles.customerContent}>
                                        {order.by_user}
                                    </td>
                                    <td className={styles.customerContent}>
                                        {order.created_at}
                                    </td>
                                    <td className={styles.customerContent}>
                                        {order.items}
                                    </td>
                                    <td className={styles.customerContent}>   
                                        {order.total_price} </td>
                                </tr>
                            ))
                    ) : (
                        <tr>
                            <td colSpan="2">No customers found.</td> {/* Messaggio di fallback se non ci sono clienti */}
                        </tr>
                    )}
                </tbody>
            </table>
            </div>

            <main className={styles.content}></main>
        </div>

        </div>
    );
}

export default AdminDashboard;

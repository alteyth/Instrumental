import React, { useEffect, useState } from "react";
import { useSession } from "../../context/SessionContext";
import { useNavigate, Link } from "react-router-dom"; // Usa Outlet per il rendering di contenuti figli
import styles from "./AdminDashboard.module.css";
import { getOrders } from "../../api";

function AdminDashboard() {
    const { isAdmin, isLogged } = useSession();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Controlla se l'utente è autenticato e se è un admin
        if (!isLogged || !isAdmin) {
            navigate("/");
        }
    }, [isAdmin, isLogged, navigate]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const ordersData = await getOrders();
                setOrders(ordersData);
                
                // Calcola il total_price sommando tutti i total_price degli ordini
                const total = ordersData.reduce((sum, order) => sum + Number(order.total_price), 0);
                setTotalPrice(total); // Aggiorna il total_price
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

    if (loading) {
        return <div>Loading...</div>; // Mostra un caricamento finché i dati non sono disponibili
    }
    
    return (
        <div className={styles.adminDashboard}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

            <nav className={styles.sidebar}>
                <ul className={styles.ul}>
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
                </ul>
            </nav>

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
            
            <main className={styles.content}></main>
        </div>
    );
}

export default AdminDashboard;
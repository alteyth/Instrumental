import React, { useEffect, useState } from "react";
import { useSession } from "../../context/SessionContext";
import { useNavigate, Link } from "react-router-dom"; // Usa Outlet per il rendering di contenuti figli
import styles from "./AdminProducts.module.css";
import { getOrders, get } from "../../api";
import { getProducts } from "../../api";

function AdminProducts() {
    const [products, setProducts] = useState([]);
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


                const ProductsData= await getProducts(); //ottiene i prodotti
                setProducts(ProductsData); //salva i prodotti nello stato setOrders

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
        <div>
        <div className={styles.adminDashboard}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

            <nav className={styles.sidebar}>
                <ul className={styles.ul}>
                    <li>
                        <i class="fa-solid fa-house"></i>
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

                    <li>
                        <i class="fa-solid fa-right-from-bracket"></i>
                        <Link onClick={logout} className={styles.logoutButton}> Logout </Link>
                    </li>
                    
                </ul>
            </nav>
            <h1 className={styles.h1Products}>Products</h1>

            <table className={styles.customerTable}>
                <thead>
                    <tr>
                    <th className={styles.campi}>Products Id</th>
                        <th className={styles.campi}>Name</th>
                        <th className={styles.campi}>Price</th>
                        <th className={styles.campi}>Created at</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                                <tr key={product.id} className={styles.customerRow}>
                                    <td className={styles.customerContent}>{product.id}</td>
                                    <td className={styles.customerContent}>{product.name}</td>
                                    <td className={styles.customerContent}>{product.price}</td>
                                    <td className={styles.customerContent}>{product.created_at}</td>
                                </tr>
                            ))
                    ) : (
                        <tr>
                            <td colSpan="2">No products found.</td> {/* Messaggio di fallback se non ci sono prodotti */}
                        </tr>
                    )}
                </tbody>
            </table>

            </div>
            </div>
    );
}

export default AdminProducts;

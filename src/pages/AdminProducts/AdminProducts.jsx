
import React, { useEffect } from "react";
import { useSession } from "../../context/SessionContext";
import { useNavigate, Link} from "react-router-dom";
import styles from "./AdminProducts.module.css";

function AdminProducts() {
    const { isAdmin, isLogged } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogged || !isAdmin) {
            navigate("/");
        }
    }, [isAdmin, isLogged, navigate]);

    

    return (
        <div className={styles.adminDashboard}>
         <nav className={styles.sidebar}>
         <h3 className={styles.h3}> Admin Dashboard </h3>
                <ul>
                    <li> <Link to="/admin" className={styles.link}> Dashboard</Link></li>
                    <li> <Link to="/admin/products" className={styles.link}> Products</Link></li>
                    <li> <Link to="/admin/customers" className={styles.link}> Customers</Link></li>
                </ul>
            </nav>

        <main className={styles.content}>
                
        </main>
        </div>
    );
}

export default AdminProducts;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "../../context/SessionContext";
import { useNavigate, Link } from "react-router-dom"; // Usa Outlet per il rendering di contenuti figli
import styles from "./AdminProducts.module.css";
import { getOrders, get, deleteProduct, postProduct, uploadProductImage, updateProduct } from "../../api";
import { getProducts } from "../../api";
import Modal from "../Modal/Modal";

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [uploading, setUploading] = useState(false);
    const { isAdmin, isLogged } = useSession();
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    
    const handleAddProductClick = () => {
        setShowModal(true);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowModal(true); // Apri il modal per la modifica
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingProduct(null);
    };

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
                setProducts(ProductsData); //salva i prodotti nello stato setProducts

            } catch (error) {
                console.error("Error while trying to pull data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const onSubmit = async (data) => {
        if (!imageFile) {
            alert("Per favore, carica un'immagine.");
            return;
        }

        setUploading(true);
        try {
            // Prima, carica l'immagine
            const imageResponse = await uploadProductImage(imageFile);
            console.log("Immagine caricata:", imageResponse);

            //invia i dettagli del prodotto incluso il nome dell'immagine
            const productData = {
                name: data.name,
                price: data.price,
                image: imageResponse.filename // Supponendo che il backend restituisca il nome del file
            };

            const productResponse = await postProduct(productData);
            console.log("Prodotto creato:", productResponse);
            alert("Prodotto creato con successo!");
            reset();
            setShowModal(false); //chiude la modale
            setProducts((prevProducts) => [...prevProducts, productResponse]); 
            navigate("/admin");
        } catch (error) {
            console.error("Errore durante la creazione del prodotto:", error);
            alert("Impossibile creare il prodotto. Controlla la console per dettagli.");
        } finally {
            setUploading(false);
        }

        setUploading(true);


    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    const handleDelete = async (productId) => {
        try {
            // funzione per eliminare il prodotto
            await deleteProduct(productId);
            // tramite filter creiamo un nuovo array che contiene tutti i prodotti tranne quello che vogliamo eliminare
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    // Conta il numero di ordini
    const orderCount = orders.length;
    const customerCount = customers.length;

    if (loading) {
        return <div>Loading...</div>; // Mostra un caricamento finché i dati non sono disponibili
    }
    
    return (
        <div className={styles.productsContainer}>
        <div className={styles.adminDashboard}>
            
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            
            <nav className={styles.sidebar}>
                <ul className={styles.ul}>
                    <li>
                        <i className="fa-solid fa-house"></i>
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
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <Link onClick={logout} className={styles.logoutButton}> Logout </Link>
                    </li>
                    
                </ul>
            </nav>
            <div>
            <h1 className={styles.h1Products}>Products</h1>

            <div className={styles.addProductButtonContainer}>
                <button 
                    className={styles.addProductButton} 
                    onClick={handleAddProductClick} 
                >
                    + PRODUCT
                </button>
            </div> 

             {/* Modale con form per aggiungere prodotto */}
             <Modal show={showModal} onClose={handleCloseModal}>
                        <h2 className={styles.h2Modal}>Add New Product</h2>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.divModal}>
                                <label htmlFor="name">Product Name</label>
                                <input
                                    id="name"
                                    {...register("name", { required: "Product name is required" })}
                                />
                                {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                            </div>

                            <div className={styles.divModal}>
                                <label htmlFor="price">Price</label>
                                <input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    {...register("price", { required: "Price is required", min: 0 })}
                                />
                                {errors.price && <p className={styles.error}>{errors.price.message}</p>}
                            </div>

                            <div className={styles.divUpload}>
                                <label htmlFor="image">Product Image</label>
                                <input 
                                    id="image" 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleImageChange} 
                                />
                            </div>

                            <button type="submit" className={styles.submitButton}>
                                Add Product 
                                {/* aggiungi nav verso product */}
                            </button>
                        </form>

                    </Modal>

                    <Modal show={showModal} onClose={handleCloseModal}>
                        <h2 className={styles.h2Modal}>
                            {editingProduct ? "Edit Product" : "Add New Product"}
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.divModal}>
                                <label htmlFor="name">Product Name</label>
                                <input
                                    id="name"
                                    defaultValue={editingProduct ? editingProduct.name : ""} // Precompila se in modifica
                                    {...register("name", { required: "Product name is required" })}
                                />
                                {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                            </div>

                            <div className={styles.divModal}>
                                <label htmlFor="price">Price</label>
                                <input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    defaultValue={editingProduct ? editingProduct.price : ""} // Precompila se in modifica
                                    {...register("price", { required: "Price is required", min: 0 })}
                                />
                                {errors.price && <p className={styles.error}>{errors.price.message}</p>}
                            </div>

                            <div className={styles.divUpload}>
                                <label htmlFor="image">Product Image</label>
                                <input 
                                    id="image" 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleImageChange} 
                                />
                            </div>

                            <button type="submit" className={styles.submitButton}>
                                {editingProduct ? "Update Product" : "Add Product"}
                            </button>
                        </form>
                    </Modal>

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

                                    <td>
                                        <button onClick={() => handleEdit(product)}>
                                            <i className="fa-solid fa-pencil"></i> {/* Icona di modifica */}
                                        </button>
                                    </td>

                                   <td>
                                   <button onClick={() => handleDelete(product.id)}>
                                        <i  className="fa-solid fa-trash"></i>
                                    </button>
                                   </td>
                                    

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
    </div>       
    );
}

export default AdminProducts;

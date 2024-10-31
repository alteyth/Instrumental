import React, { useState } from "react";
import styles from "./HomePage.module.css";
import { useSession } from "../../context/SessionContext";
import { getProducts } from "../../api";
import Product from "./Product";

function HomePage() {

  const {
    searchTerm,
    setSearchTerm,
    products,
    setProducts,
    isLogged,
    setIsLogged,
    userId,
    setUserID,
    email,
    setEmail,
    password,
    setPassword,
    first_name,
    setFirst_name,
    last_name,
    setLast_name} = useSession();
  
    const [loading, setLoading] = useState(true);

  // Ogni volta che viene inserito un nuovo termine di ricerca la pagina va renderizzata
  React.useEffect(() => {
    const fetchData = async() => {
      try{
        const productsData = await getProducts();
        setProducts(productsData);
      }catch(error){
          console.error('Error while trying to pull data');
          return;
      // check necessario per evitare che la pagina cerchi di accedere a componenti da renderizzare vuoti
      }finally{
        setLoading(false);
      }
    }
    fetchData();
  }, [searchTerm]);


  return(
    <>
      {/* Banner di Benvenuto */}
      <div  className={styles.homeContainer}>
      <div className={styles.banner}>
        <div className={styles.bannerText}>
          <h1>Instrumental</h1>
          <p>Your one-stop shop for all your musical needs.</p>
        </div>
          <img src="src\assets\be407fad48c9ccafcd87007eb6645d61.png" alt="Headphones" className={styles.bannerImage} />
        </div>

      {/* Griglia dei prodotti */} 
      <div className={styles.productsContainer}>
        <div className={styles.products}>
          {loading ? (
            <p>Loading products...</p>
          ) : (
            products && products.length > 0 ? (
              products.map((product) => (
                <Product key={product.id} data={product}/>
              ))
            ) : (
              <p>No products available</p>
            )
          )}
        </div>
      </div>
      </div>
    </>
  );
}

export default HomePage;

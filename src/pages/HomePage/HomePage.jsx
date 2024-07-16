import React, { useState } from "react";
import styles from "./HomePage.module.css";
import { useSession } from "../../context/SessionContext";
import { getProducts } from "../../api";
import Product from "./Product";

function HomePage() {

  const {
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

  React.useEffect(() => {
    const fetchData = async() => {
      try{
        const productsData = await getProducts();
        setProducts(productsData);
      }catch(error){
          console.error('Error while trying to pull data');
          return;
      }finally{
        setLoading(false);
      }
    }
    fetchData();
  }, []);


  return(
    
    <>
      <div className={styles.products}>
        {
        loading ? (
          <></>
        ) : (
          products && products.length > 0 ? (
            <>
              {products.map((product) => (
                <Product key={product.id} data={product}/>
              ))}
            </>
          ) : (
            <p>No products available</p>
          )
        )}
      </div>
    </>
  )
}

export default HomePage;

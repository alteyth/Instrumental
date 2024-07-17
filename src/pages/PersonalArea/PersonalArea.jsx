import React, {useState} from "react";
import { useSession } from "../../context/SessionContext";
import {get, getOrders} from '../../api'
import styles from './PersonalArea.module.css'
import Order from "./Order";

function PersonalArea(){

    const {
        orders,
        setOrders,
        searchTerm,
        setSearchTerm,
        products,
        setProducts,
        cart,
        setCart,
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
        setLast_name
        } = useSession();
    
    const [loading, setLoading] = useState(true);
    const [hasOrders, setHasOrders] = useState(false);

    React.useEffect(() => {
        const fetchData = async() => {
            try{
                const userOrders = await getOrders(`${userId}`);
                if(userOrders.length > 0){
                    setHasOrders(true);
                    setOrders(userOrders);
                }
                const userData = await get(`${userId}`);
                setEmail(userData[0].email)
                setFirst_name(userData[0].first_name);
                setLast_name(userData[0].last_name);
            }catch(error){
                console.error('Error while trying to pull data');
                return;
            }
            finally{
                setLoading(false)
            };
        };
        fetchData();
    }, []);

    return(
        <>
                {
                    loading ? (
                        <>
                        </>
                      ) 
                    :
                      <>
                      <div className={styles.areaLayout}>
                        <h1>Profile</h1>
                        <div className={styles.personalData}>
                            <div className={styles.internalStyle}>
                                <h1>UserID</h1>
                                <p>#{userId}</p>
                            </div>

                            <div className={styles.internalStyle}>
                                <h1>First Name</h1>
                                <p>{first_name}</p>
                            </div>

                            <div className={styles.internalStyle}>
                                <h1>Last Name</h1>
                                <p>{last_name}</p>
                            </div>
                            
                            <div className={styles.internalStyle}>
                                <h1>Email Address</h1>
                                <p>{email}</p>
                            </div>
                        </div>
                            <h1>Orders</h1>
                            <div className={styles.orderData}>
                                {
                                    hasOrders ? 
                                    <>
                                        {orders.map((order) => (
                                        <Order key={order.id} data={order}/>
                                        ))}
                                    </>
                                    :
                                    <>
                                        
                                    </>
                                }
                            </div>
                      </div>
                      </>
                }
        </>
    )
}

export default PersonalArea;
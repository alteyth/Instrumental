const BASE_URL = 'http://localhost:3000/api';
const USERS_URL = '/users';

async function fetchWrapper(url, options){
    try{
        const response = await fetch(url, options);
        if(!response.ok){
            const error = await response.json();
            throw new Error(error.message || 'Something went wrong');
        }
        return await response.json();
    }catch(error){
        console.error('API call error:', error);
        throw error;
    }   
}

export async function get(user=""){
    const url = `${BASE_URL}/users/${user}`;
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetchWrapper(url, options);
}


export async function getProducts(product=""){
    const url = `${BASE_URL}/products/${product}`;
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetchWrapper(url, options);
}

export async function getOrders() { // Modificato per non accettare parametri
    const url = `${BASE_URL}/order`; // Cambia l'URL per ottenere tutti gli ordini
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetchWrapper(url, options);
}

export async function postOrder(data){
    const url = `${BASE_URL}/order`;
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetchWrapper(url, options);
}

export async function post(data){
    const url = `${BASE_URL}${USERS_URL}`;
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetchWrapper(url, options);
}


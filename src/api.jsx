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

export async function postProduct(data){
    const url = `${BASE_URL}/products`;
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetchWrapper(url, options);
}

export async function deleteProduct(productId) {
    const url = `${BASE_URL}/products/${productId}`;

    const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetchWrapper(url, options);
}

export async function uploadProductImage(imageFile) {
    const url = `${BASE_URL}/upload-image`;

    // Crea un form data per contenere il file
    const formData = new FormData();
    formData.append('image', imageFile); // 'image' è il nome del campo usato da multer nel backend

    const options = {
        method: 'POST',
        body: formData, // Non c'è bisogno di specificare il Content-Type, lo farà automaticamente
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Something went wrong during file upload');
        }

        return await response.json(); // Ritorna la risposta in caso di successo
    } catch (error) {
        console.error('Error during image upload:', error);
        throw error;
    }
}

export const updateProduct = async (productId, updatedProductData) => {
    const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProductData),
    });

    if (!response.ok) {
        throw new Error("Failed to update the product");
    }

    return await response.json();
};
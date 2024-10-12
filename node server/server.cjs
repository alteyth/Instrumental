require('dotenv').config();
const cors = require('cors');
const postgres = require('postgres');
const express = require('express');
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;
const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString);

app.get('/api/users', async (req, res) => {
    try{
        const result = await sql`
        SELECT id, email, password, first_name, last_name
        FROM users`;

        res.json(result).status(200);
    }
    catch(error){
        console.error('Error in data retrieval', error);
        res.status(500).json({error: 'Error in data retrieval'});
    }
});

app.get('/api/users/:id', async (req, res) => {
    const UserId = req.params.id;
    try{
        const result = await sql`
        SELECT id, email, password, first_name, last_name
        FROM users
        WHERE id = ${UserId}`;

        if(result.length === 0){
            res.status(404).json({error: `User with id: (${UserId}) not found`});
            return;
        }
        res.status(200).json(result);
        return;
    }catch(error){
        console.error('Error in data retrieval', error);
        res.status(500).json({error: 'Error in data retrieval'});
    }
});

app.get('/api/products', async (req, res) => {
    try{
        const result = await sql`
        SELECT id, name, price, created_at, image_src
        FROM products`;

        if(result.length === 0){
            res.status(404).json({error: 'No products found'});
            return;
        }
        res.status(200).json(result);
    }
    catch(error){
        console.error('Error in data retrieval', error);
        res.status(500).json({error: 'Error in data retrieval'});
    }
});

app.get('/api/products/:id', async (req, res) => {
    const productId = req.params.id;
    try{
        const result = await sql`
        SELECT id, name, price, created_at
        FROM products
        WHERE id = ${productId}`;

        if(result.length === 0){
            res.status(404).json({error: 'No products found'});
            return;
        }
        res.status(200).json(result);
    }
    catch(error){
        console.error('Error in data retrieval', error);
        res.status(500).json({error: 'Error in data retrieval'});
    }
});

app.get('/api/order', async (req, res) =>{
    try{
        const result = await sql`
        SELECT *
        FROM orders`;
        if(result.length === 0){
            res.status(404).json({error: 'No orders found'});
            return;
        }
        res.status(200).json(result);
    }catch(error){
        console.error('Error in data retrieval', error);
        res.status(500).json({error: 'Error in data retrieval'});
    }
})

app.get('/api/order/:user', async (req, res) =>{
    const userId = req.params.user;
    try{
        const result = await sql`
        SELECT *
        FROM orders
        WHERE by_user = ${userId}`;
        res.status(200).json(result);
    }catch(error){
        console.error('Error in data retrieval', error);
        res.status(500).json({error: 'Error in data retrieval'});
    }
})

app.post('/api/order', async (req, res) =>{
    const { by_user, items, total_price } = req.body;

    if(!by_user || !items || !total_price){
        res.status(400).json({error: 'All data is required'});     
        return; 
    }

    try{
        const result = await sql`
        INSERT INTO orders (by_user, items, total_price)
        VALUES (${by_user}, ${items}, ${total_price})
        RETURNING *`;
        res.status(201).json(result);
        return;
    }catch(error){
        console.error('Error in data insertion', error);
        res.status(500).json({error: error['routine']});
    }
})

app.post('/api/users', async (req, res) => {
    const { email, password, first_name, last_name } = req.body;

    if(!email || !password || !first_name || !last_name) {
        res.status(400).json({error: 'Email, password, first name and last name are required'});     
        return;   
    }

    try{
        const result = await sql`
        INSERT INTO users (email, password, first_name, last_name)
        VALUES (${email}, ${password}, ${first_name}, ${last_name})
        RETURNING *`;
        res.status(201).json(result);
        return;
    }catch(error){
        console.error('Error in data insertion', error);
        res.status(500).json({error: error['routine']});
    }
});

app.put('/api/users/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    const { email, password, first_name, last_name} = req.body;

    try{
        if(!email && !password && !first_name && !last_name){
            res.status(400).json({error: 'Either email, password, first name or last name are required'});
            return;
        }
    
        const existingUser = await sql`SELECT * FROM users WHERE id = ${userId}`;
        if(existingUser.length === 0){
            res.status(404).json({error: `User not found`});
            return;
        }
        
        let updateQuery = 'UPDATE users SET ';
        const updateValues = [];
        if(email){
            updateQuery = `${updateQuery} email = '${email}', `;
            updateValues.push(email);
        }
        if(password){
            updateQuery = `${updateQuery}password = '${password}', `;
            updateValues.push(password);
        }
        if(first_name){
            updateQuery = `${updateQuery}first_name = '${first_name}', `;
            updateValues.push(first_name);
        }
        if(last_name){
            updateQuery = `${updateQuery}last_name = '${last_name}', `;
            updateValues.push(last_name);
        }
    
        updateQuery = updateQuery.slice(0, -2);
        
    
        updateQuery = `${updateQuery} WHERE id = ${userId} RETURNING *`;
    
        const updateUser = await sql.unsafe(updateQuery);
    
        res.status(200).json(updateUser);
    }catch(error){
        console.error('Error in data update', error);
        res.status(500).json({error: 'Error in data update'});
    }
});

app.delete('/api/users/:id', async(req, res) => {
    const userId = req.params.id;

    try{
        const result = await sql`
        DELETE FROM users
        WHERE id = ${userId}
        RETURNING *`;

        if(result.count === 0){
            res.status(404).json({error: 'User not found'});
            return;
        }
        res.json(result);
    }catch(error) {
        console.error('Error in deletion of user', error);
        res.status(500).json({error: 'Error in deletion of user'});
    }
});

app.get('/api/order', async (req, res) => {
    try {
        const result = await sql`
        SELECT *
        FROM orders`;
        
        if(result.length === 0){
            res.status(404).json({error: 'No orders found'});
            return;
        }
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in data retrieval', error);
        res.status(500).json({error: 'Error in data retrieval'});
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
require('dotenv').config();
const postgres = require('postgres');
const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT;
const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString);

app.get('/api/users', async (req, res) => {
    const result = await sql`
    SELECT email, password
    FROM users`;

    res.json(result).status(200);
});

app.get('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const result = await sql`
        SELECT id, email, password, first_name, last_name
        FROM users
        WHERE id = ${id}`;

        if(result.length === 0){
            res.status(404).json({error: `User with id: (${id}) not found`});
            return;
        }
        res.status(200);
        return;
    }catch(error){
        console.error('Error in data retrieval', error);
        res.status(500).json({error: 'Error in data retrieval'});
    }
});

app.post('/api/users', async (req, res) => {
    const { email, password, first_name, last_name } = req.body;

    if(!email || !password || !first_name || !last_name) {
        res.status(400).json({error: 'Email, password, first name and last name are required'});     
        return;   
    }

    try{
        // const maxId = await sql`SELECT MAX(id) AS max_id FROM users`;
        // const id = maxId + 1;

        const result = await sql`
        INSERT INTO users (email, password, first_name, last_name)
        VALUES (${email}, ${password}, ${first_name}, ${last_name})
        RETURNING *`;
        res.status(201).json(result);
        return;
    }catch(error){
        console.error('Error in data insertion', error);
        res.status(500).json({error: 'Error in data insertion'});
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
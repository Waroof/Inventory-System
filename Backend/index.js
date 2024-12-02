require ("dotenv").config();
const express = require('express');
const cors = require('cors');
const { neon } = require('@neondatabase/serverless');

const app = express();
app.use(cors());
app.use(express.json());

const sql = neon(process.env.DATABASE_URL);
async function initializeDatabase() {
    try {
        await sql
            `CREATE TABLE IF NOT EXISTS inventory (
                id SERIAL PRIMARY KEY, 
                name VARCHAR(100) NOT NULL,
                quantity INTEGER NOT NULL
            )`
        ;
        console.log('Database initialized');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

//create post endpoint
app.post("/inventory",async(req,res)=>{
    try{
        const {name,quantity} = req.body 
        await sql
        `INSERT INTO inventory (name,quantity)
        VALUES (${name},${quantity})`;

        res.json({success:true})
    }

    catch(error){
        console.log("this is error: "+error)
    }
})

app.put("/inventory",async(req,res)=>{
    try{
        const {id,name,quantity} = req.body
    await sql
    `UPDATE inventory
    SET name=${name}, quantity=${quantity}
    WHERE id=${id}`;
    res.json({success:true})


    }
    catch(error){console.log(error)};

})

app.get("/inventory", async (req,res)=>{
    try{
        const inventory = await sql `SELECT * FROM inventory ORDER by id`
        res.json(inventory);
    }
    catch(error){
        console.log("This is the error: "+ error);
    }

})


app.delete("/inventory/:id", async (req,res)=>{
    try{
        const {id} = req.params
        await sql `DELETE FROM inventory
                    WHERE id=${id}`;
        res.json({success:true});
    }
    catch(error){
        console.log("This is the error: "+ error);
    }

})

initializeDatabase().then(()=>{
    app.listen(3005,()=>{
        console.log("Server running on port 3005");
    })
})

const express = require('express');
const app = express();
const port = 5000;
require('dotenv').config();
const cors = require('cors');
const { MongoClient } = require('mongodb');


// MIDDLEWARE
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from my product inventory management Server')
});

app.listen(port, () => {
    console.log('Listening to', port)
});


const uri = "mongodb+srv://<username>:<password>@address_goeas_here";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// ASYNC FUNCTION
async function run() {
    try {
        await client.connect();
        console.log('Connected to database');

        const database = client.db("database_name");
        const usersCollection = database.collection("collection_name");


        // CRUD OPERATIONS GOES HERE




    } finally {
        // await client.close();
    }
}
// CALL ASYNC FUNCTION TO EXECUTE
run().catch(console.dir);
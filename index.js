const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const cors = require("cors");
const { MongoClient } = require("mongodb");

// MIDDLEWARE
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from my product inventory management Server");
});

app.listen(port, () => {
  console.log("Listening to", port);
});

const uri = `mongodb+srv://team_project:LY9bPCNqyzX2cFgg@cluster0.iuevi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ASYNC FUNCTION
async function run() {
  try {
    await client.connect();
    console.log("Connected to database");

    const database = client.db("product_inventory");
    const usersCollection = database.collection("users");

    // insert a new user to database
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.json(result);
    });

    // get all user from database
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find({}).toArray();
      res.json(result);
    });

    // get a single user from database
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await usersCollection.findOne(query);
      res.json(result);
    });
    // CRUD OPERATIONS GOES HERE
  } finally {
    // await client.close();
  }
}
// CALL ASYNC FUNCTION TO EXECUTE
run().catch(console.dir);

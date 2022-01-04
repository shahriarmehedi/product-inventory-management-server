// Md. Bappy Mia
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const cors = require("cors");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from my product inventory management Server");
});

app.listen(port, () => {
  console.log("Listening to", port);
});

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.iuevi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
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
    const productCollection = database.collection("products");

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

    // make admin by user email
    app.put("/admin/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const options = { upsert: true };
      const updateRole = {
        $set: {
          role: "Admin",
        },
      };
      const result = await usersCollection.updateOne(
        query,
        updateRole,
        options
      );
      res.json(result);
    });
    // CRUD OPERATIONS GOES HERE

    // post a single product
    app.post("/products", async (req, res) => {
      const product = req.body;
      const result = await productCollection.insertOne(product);
      res.json(result);
    });
    // get all product from database
    app.get("/products", async (req, res) => {
      const result = await productCollection.find({}).toArray();
      res.json(result);
    });
    // get a single product using product id
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.findOne(query);
      res.json(result);
    });
    // product get for specific user
    app.get("/user-products", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await productCollection.find(query).toArray();
      res.json(result);
    });
    // update a product to database
    app.put("/products/:id", async (req, res) => {
      const id = req.params.id;
      const updateProduct = req.body;
      const query = { _id: ObjectId(id) };
      const updateDoc = {
        $set: updateProduct,
      };
      const result = await productCollection.updateOne(query, updateDoc);
      res.json(result);
    });
    // delete a single product from database
    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
// CALL ASYNC FUNCTION TO EXECUTE
run().catch(console.dir);

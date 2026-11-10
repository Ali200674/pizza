import express from "express";

// Import mysql file
import mysql2 from "mysql2";

// Import .env
import dotenv from "dotenv";
dotenv.config();


// Create a connection pool
const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
}).promise();



// Make express object
const app = express();

// Define port
const PORT = 3000;

// Create an array to store orders
const orders = [];

// Enable static file serving
app.use(express.static("public"));

// Set view engine to EJS
app.set("view engine", "ejs");

// Add "middleware" to allow the app to parse the data
// Access form data through req.body
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

// Create test route
app.get("/db-test", async (req, res) => {
  try {
    const orders = await pool.query("SELECT * FROM orders");
    res.send(orders[0]);
  } catch {
    console.error("Database error: ", err);
    res.status(500).send("Database error occured");
  }
})

// Add a contact route to display a contact view page
app.get("/contact-us", (req, res) => {
  res.render("contact");
});

// Add a route to process a pizzcla order
app.post("/submit-order", async (req, res) => {
  const order = req.body;
    console.log(order);
    //define an sql query to insert new order
    const sql = `INSERT INTO orders (fname, lname, email, size, method, toppings, comment) VALUES(?, ?, ?, ?, ?, ?, ?)`;

    //create an array of parameters from order data
    const params = [
        order.fname,
        order.lname,
        order.email,
        order.size,
        order.method,
        order.toppings,
        order.comment
    ];

    //execute the query
    const [result] = await pool.execute(sql, params);

    //display the confirmation page
    res.render(`confirm`, { order });
});



// For confirm page
// app.get("/confirm-order", (req, res) => {
//   res.render("confirm");
// });

// For menu page
app.get("/menu", (req, res) => {
  res.sendFile(`${import.meta.dirname}/views/menu.html`);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


// Add an admin root
app.get("/admin", async (req, res) => {
  try {
    const orders = await pool.query("SELECT * FROM orders");
    console.log(orders[0]);
    res.render("admin", {orders:orders[0]});
  
  } catch {
    console.error("Database error: ", err);
    res.status(500).send("Database error occured");
  }

  
  
});

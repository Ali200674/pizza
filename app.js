import express from "express";

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

app.get("/", (req, res) => {
  res.render("home");
});

// Add "middleware" to allow the app to parse the data
// Access form data through req.body
app.use(express.urlencoded({ extended: true }));

// Add a contact route to display a contact view page
app.get("/contact-us", (req, res) => {
  res.render("contact");
});

// Add a route to process a pizzcla order
app.post("/submit-order", (req, res) => {
  const order = req.body;
  order.timestamp = new Date();

  orders.push(order);

  console.log(orders);

  res.render("confirm", { order });
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
app.get("/admin", (req, res) => {
  res.render("admin", { orders });
});

import express from "express";

// Make express object
const app = express();

// Define port
const PORT = 3000;

// Create an array to store orders
const orders = [];

// Enable static file serving
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(`${import.meta.dirname}/views/home.html`);
});

// Add "middleware" to allow the app to parse the data
// Access form data through req.body
app.use(express.urlencoded({ extended: true }));

// Add a contact route to display a contact view page
app.get("/contact-us", (req, res) => {
  res.sendFile(`${import.meta.dirname}/views/contact.html`);
});

// Add a route to process a pizzcla order
app.post("/submit-order", (req, res) => {
  req.body.timestamp = new Date();

  orders.push(req.body);

  console.log(orders);

  res.sendFile(`${import.meta.dirname}/views/confirm.html`);
});

// For confirm page
app.get("/confirm-order", (req, res) => {
  res.sendFile(`${import.meta.dirname}/views/confirm.html`);
});

// For menu page
app.get("/menu", (req, res) => {
  res.sendFile(`${import.meta.dirname}/views/menu.html`);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// Add an admin root
app.get("/admin", (req, res) => {
  res.send(orders);
});

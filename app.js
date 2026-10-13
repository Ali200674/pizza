import express from "express";


// Make express object
const app = express();

// Define port
const PORT = 3000;

// Enable static file serving
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(`${import.meta.dirname}/views/home.html`);
  res.se
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

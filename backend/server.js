const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const supportRoutes = require("./routes/support");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // For parsing JSON request bodies
app.use("/api", supportRoutes); // Register routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:
${PORT}`);
});

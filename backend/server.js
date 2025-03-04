const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const db = require("./config/dbConnect");

const userRoutes = require("./routes/userRoutes");
const modelRoutes = require("./routes/userRoutes");

app.use("/api", userRoutes);
app.use("/api", modelRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

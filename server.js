require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/records", require("./routes/recordRoutes"));
app.use("/analytics", require("./routes/analyticsRoutes"));

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => console.log("Server running on port 3000"));
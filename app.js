import express from "express";
import indexRoutes from "./routes/index.routes.js";
import ecommerceRoutes from "./routes/ecommerce.routes.js";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use(indexRoutes);
app.use(ecommerceRoutes);

app.use((req, res, next) => {
  res.json({
    message: "Endpoint was not found",
  });
});

export default app;

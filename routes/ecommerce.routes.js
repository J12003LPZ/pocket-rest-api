import { Router } from "express";
import {
  getProducts,
  getProduct,
  getLatestProducts,
  getAuctions,
  getAunction,
  createAuction,
  deleteAuction,
  updateAuction,
} from "../controllers/ecommerce.controllers.js";
const router = Router();

router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.get("/products/latest", getLatestProducts);
router.get("/auctions", getAuctions);
router.get("/aunction/:id", getAunction);
router.post("/aunction", createAuction);
router.delete("/aunction/:id", deleteAuction);
router.patch("/aunction/:id", updateAuction);

export default router;

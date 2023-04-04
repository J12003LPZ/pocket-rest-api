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
  getAllMenProducts,
  getAllWomenProducts,
  getAllGirlsProducts,
  getAllKidsProducts,
  getProductsByCategory,
} from "../controllers/ecommerce.controllers.js";

const router = Router();

router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.get("/products/latest", getLatestProducts);
router.get("/products/category/:id", getProductsByCategory);
router.get("/products/men", getAllMenProducts);
router.get("/products/woman", getAllWomenProducts);
router.get("/products/kids", getAllKidsProducts);
router.get("/products/girls", getAllGirlsProducts);
router.get("/auctions", getAuctions);
router.get("/aunction/:id", getAunction);
router.post("/aunction", createAuction);
router.delete("/aunction/:id", deleteAuction);
router.patch("/aunction/:id", updateAuction);

export default router;

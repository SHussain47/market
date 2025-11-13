import express from "express";
const router = express.Router();
export default router;

import { getProducts, getProductById } from "#db/queries/products";
import { getOrdersByProductId } from "#db/queries/orders";
import requireUser from "#middleware/requireUser";

router.get("/", async (req, res) => {
  const products = await getProducts();
  res.send(products);
});

router.param("id", async (req, res, next, id) => {
  const product = await getProductById(id);
  if (!product) return res.status(404).send("Product not found");
  req.product = product;
  next();
});
// async not need since promises are being fulfilled in .param
router.get("/:id", (req, res) => {
  res.send(req.product);
});

router.get("/:id/orders", requireUser, async (req, res) => {
  console.log("🔍 req.user.id in /products/:id/orders => [queries/products.js]", req.user.id);
  const orders = await getOrdersByProductId(req.product.id);
  console.log("🔍 orders returned => [queries/products.js]", orders);
  res.send(orders);
});

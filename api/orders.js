import express from "express";
const router = express.Router();
export default router;

import { createOrder, getOrdersByUsersId, getOrderById } from "#db/queries/orders";
import { createOrderProduct } from "#db/queries/orders_products";
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";
import { getProductsByOrderId } from "#db/queries/products";

router.use(requireUser);

router.post("/", requireBody(["date"]), async (req, res) => {
  const { date } = req.body;
  const order = await createOrder(date, req.user.id);
  res.status(201).send(order);
});

router.get("/", async (req, res) => {
  const orders = await getOrdersByUsersId(req.user.id);
  res.send(orders);
});

router.param("id", async (req, res, next, id) => {
  const order = await getOrderById(id);

  if (!order) return res.status(404).send("Order not found");

  if (order.user_id !== req.user.id) return res.status(403).send("You are not authorised");

  req.order = order;
  next();
});

router.get("/:id", async (req, res) => {
  res.send(req.order);
});

router.post("/:id/products", requireBody(["productId", "quantity"]), async (req, res) => {
  const { productId, quantity } = req.body;
  const orderProduct = await createOrderProduct(req.order.id, productId, quantity);
  res.status(201).send(orderProduct);
})

router.get("/:id/products", async (req, res) => {
  const products = await getProductsByOrderId(req.order.id);
  res.send(products);
})

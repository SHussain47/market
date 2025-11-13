import express from "express";
const router = express.Router();
export default router;

import { createOrder, getOrdersByUsersId } from "#db/queries/orders";
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

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

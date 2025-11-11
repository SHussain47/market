import db from "#db/client";

import { createProduct } from "./queries/products.js";
import { createUser } from "./queries/users.js";
import { createOrder } from "./queries/orders.js";
import { createOrderProduct } from "./queries/orders_products.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  /* 1. 10 distinct products ------------------------------------ */
  for (let i = 1; i <= 10; i++) {
    await createProduct(`Product ${i}`, `Description for product ${i}`, (9.99 + i).toFixed(2));
  }

  /* 2. 1 user -------------------------------------------------- */
  const user = await createUser("shopper", "password123");

  /* 3. 1 order for that user ---------------------------------- */
  const order = await createOrder("2025-06-25", "Ship fast!", user.id);

  /* 4. 5 distinct products in that order ---------------------- */
  for (let productId = 1; productId <= 5; productId++) {
    await createOrderProduct(order.id, productId, 1);
  }
}

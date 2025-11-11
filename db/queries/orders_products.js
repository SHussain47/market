import db from "#db/client";

export async function createOrderProduct(order_id, product_id, quantity) {
  try {
    const sql = `
      INSERT INTO orders_products (order_id, product_id, quantity)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [order_id, product_id, quantity];;
    const { rows: [orderProduct] } = await db.query(sql, values);
    return orderProduct;
  } catch (error) {
    console.error("Error with createORderPRoduct query: ", error);
    throw error;
  }
}

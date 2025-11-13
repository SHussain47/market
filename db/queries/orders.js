import db from "#db/client";

export async function createOrder(date, user_Id, note = null) {
  try {
    const sql = `
      INSERT INTO orders (date, note, user_Id)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [date, note, user_Id];
    const { rows: [order] } = await db.query(sql, values);
    return order;
  } catch (error) {
    console.error("Error with createOrder query: ", error);
    throw error;
  }
}

//

export async function getOrdersByUsersId(id) {
  try {
    const sql = `
      SELECT * FROM orders
      WHERE user_id = $1
    `;
    const values = [id];
    const { rows: orders } = await db.query(sql, values);
    return orders;
  } catch (error) {
    console.error("Error with getOrderByUsersId query: ", error);
    throw error;
  }
}

export async function getOrdersByProductId(id) {
  try {
    const sql = `
      SELECT orders.* FROM orders
      JOIN orders_products
        ON orders.id = orders_products.order_id
        WHERE orders_products.product_id = $1
    `;
    const values = [id];
    const { rows: orders } = await db.query(sql, values);
    return orders;
  } catch (error) {
    console.error("Error with getOrdersByProductId query: ", error);
    throw error;
  }
}

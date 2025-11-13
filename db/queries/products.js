import db from "#db/client";

export async function createProduct(title, description, price) {
  try {
    const sql = `
      INSERT INTO products (title, description, price)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [title, description, price];
    const { rows: [product] } = await db.query(sql, values);
    return product;
  } catch (error) {
    console.error("Error with createProduct query: ", error);
    throw error;
  }
}

export async function getProducts() {
  try {
    const sql = `
      SELECT * FROM products
    `;
    const { rows: products } = await db.query(sql);
    return products;
  } catch (error) {
    console.error("Error with getProducts query: ", error);
    throw error;
  }
}

export async function getProductById(id) {
  try {
    const sql = `
      SELECT * FROM products
      WHERE id = $1
    `;
    const values = [id];
    const { rows: [product] } = await db.query(sql, values);
    return product;
  } catch (error) {
    console.error("Error with getProductById query: ", error);
    throw error;
  }
}

export async function getProductsByOrderId(id) {
  try {
    const sql = `
      SELECT products.* FROM products
      JOIN orders_products
        ON products.id = orders_products.product_id
        WHERE orders_products.order_id = $1 
    `;
    const values = [id];
    const { rows: products } = await db.query(sql, values);
    return products;
  } catch (error) {
    console.error("Error with getProductsByOrderId query: ", error);
    throw error;
  }
}

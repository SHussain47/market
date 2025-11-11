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

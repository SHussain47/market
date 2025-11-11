import db from "#db/client";

export async function createOrder(date, note, user_Id) {
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

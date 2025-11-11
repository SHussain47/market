import bcrypt from "bcrypt";
import db from "#db/client";

export async function createUser(username, password) {
  try {
    const sql = `
      INSERT INTO users (username, password)
      VALUES ($1, $2)
      RETURNING *
    `;
    const hashedPassword = await bcrypt.hash(password, 10);
    const values = [username, hashedPassword];
    const { rows: [user] } = await db.query(sql, values);
    return user;
  } catch (error) {
    console.error("Error with createUser query: ", error);
    throw error;
  }
}

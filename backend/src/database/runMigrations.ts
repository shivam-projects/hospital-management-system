import fs from "fs";
import path from "path";
import { pool } from "../config/db";

const runMigrations = async (): Promise<void> => {
    const migrationsPath = path.join(__dirname, "migrations");

  const files = fs
    .readdirSync(migrationsPath)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const filePath = path.join(migrationsPath, file);
    const sql = fs.readFileSync(filePath, "utf-8");

    await pool.query(sql);
    console.log(`Migration executed: ${file}`);
  }
};

export default runMigrations;
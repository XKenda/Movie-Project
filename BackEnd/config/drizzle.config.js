import { PDB_URL } from "./env";
import { defineConfig } from "drizzle-kit"

if(!PDB_URL) throw new Error("PostgreSQL URL is not set")

export default defineConfig({
    schema: './schema/index.js',
    out: '../drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: PDB_URL
    }
})
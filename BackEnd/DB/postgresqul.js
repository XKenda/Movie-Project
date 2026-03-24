
import {drizzle} from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless"
import { PDB_URL } from "../config/env.js";

if(!PDB_URL) throw new Error("PostgreSQL URL is missing")

const sql = neon(PDB_URL)
export const PDB = drizzle(sql)
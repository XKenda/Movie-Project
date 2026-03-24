import {config} from "dotenv";

config({ path: `.env.${process.env.NODE_ENV? 'production' : 'development'}.local`})

export const {PORT,
    MDB_URL,
    PDB_URL,
    REFRESH_SECRET,
    ACCESS_SECRET,
} = process.env
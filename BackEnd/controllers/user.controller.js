import { eq } from "drizzle-orm";
import { REFRESH_SECRET } from "../config/env.js";
import { PDB } from "../DB/postgresqul.js"
import { users } from "../schema/user.schema.js"
import jwt from "jsonwebtoken";
import { tokens } from "../schema/tokens.schema.js";

export async function getUsers(req, res, next)  {
    const count = +(req.params.count)
    const Allusers = await PDB.select({
        id: users.id, 
        username: users.username, 
        email: users.email, 
        role: users.role }).from(users).limit(count);
    res.status(200).json({success: true, data: Allusers})
}

export const getUser = async (req, res, next) => {
    try {
    const user = req.user

    res.status(200).json(user)
} catch (e) {
    next(e)
}
}

export const updateUser = async (req, res, next) => {
    const id = jwt.verify(req.refreshToken, REFRESH_SECRET).userId;

    const updated = req.body
    console.log(updated)
    const user = (await PDB.update(users).set(updated).where(eq(users.id, id)).returning())[0];

    res.status(200).send({success: true, data: user}) 
}

export const deleteUser = async (req, res) => {
    const id = jwt.verify(req.refreshToken, REFRESH_SECRET).userId;

    const user = (await PDB.delete(users).where(eq(users.id, id)).returning())[0];
    const token = (await PDB.delete(tokens).where(eq(tokens.userId, id)).returning())[0]; 


    res.status(200).send({success: true, data: [user, token]})
}

import { eq, sql } from "drizzle-orm";
import { REFRESH_SECRET } from "../config/env.js";
import { PDB } from "../DB/postgresqul.js";
import { users } from "../schema/user.schema.js";
import jwt from "jsonwebtoken";
import { tokens } from "../schema/tokens.schema.js";

export const auth = async (req, res, next) => {
    try {
        let token = req.cookies.refreshToken;

        if (!token)
            return res.status(401).send("You Must create account to do that");

        const id = jwt.verify(token, REFRESH_SECRET).userId

        const isExist = (await PDB.select().from(tokens).where(sql`${tokens.refreshToken} = ${token} and ${tokens.userId} = ${id} `))[0]

        if (!isExist) {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                sameSite: 'lax',
                secure: false,
                maxAge: 1000 * 60 * 60 * 24 * 15
            })
            return res.status(401).send('You must be loged in to do that')
        }


        const user = (await PDB.select({
            id: users.id,
            firstName: users.firstName,
            lastName: users.lastName,
            email: users.email,
            age: users.age,
            rating: users.rating,
            role: users.role
        }).from(users).where(eq(users.id, id)))[0]


        if (!user) {
            console.log("tokens will deleted from DB")
            await PDB.delete(tokens).where(eq(tokens.userId, id));
            console.log("cookie will cleared")
            res.clearCoolie(refreshToken, {
                httpOnly: true,
                sameSite: 'lax',
                secure: false,
                maxAge: 1000 * 60 * 60 * 24 * 15
            })
            console.log("cookie cleared")
            res.status(401).json({ message: 'You must Sign Up first' })
        }

        req.user = user
        req.refreshToken = token

        next()
    } catch (e) {
        console.log(e.message)
        res.status(404).send(e.message)
    }
}
import jwt from "jsonwebtoken"
import { PDB } from "../DB/postgresqul.js";
import { tokens } from "../schema/tokens.schema.js";
import { REFRESH_SECRET } from "../config/env.js";
import { eq } from "drizzle-orm";
import { users } from "../schema/user.schema.js";

export const emailIsAlreadyExisiting = async (email) => {
    try {
        const existing = (await PDB.select().from(users).where(eq(users.email, email)))[0]
        if (!existing) return false

        return existing
    } catch (e) {
        throw new Error(e.message)
    }
}

export const CreateNewUser = async ({ firstName, lastName, email, password: password, age, role }) => {
        const user = (
        await PDB.insert(users)
        .values({ firstName, lastName, email, password, age, role })
        .returning()
        )[0]

    return user
}

export const createRefreshToken = async (payload, expiresIn = "15d") => {
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn })

    const token = await PDB.insert(tokens).values({ userId: payload.userId, refreshToken }).returning();

    return token[0].refreshToken
}

export const deleteRefreshToken = async (payload) => {
    try {

        const existing = (await PDB.select().from(tokens).where(eq(tokens.id, payload.userId)))

        if (!existing) return { code: 404, message: 'You must log in first' }

        await PDB.delete(tokens).where(eq(tokens.userId, payload.userId));

        return { code: 200, message: "User Signed out Successfully" };
    } catch (e) {
        throw new Error(e.message)
    }

}
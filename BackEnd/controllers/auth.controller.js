import { eq } from "drizzle-orm";
import { PDB } from "../DB/postgresqul.js";
import { users } from "../schema/user.schema.js";
import bcryptjs from "bcryptjs"
import { CreateNewUser, createRefreshToken, deleteRefreshToken, emailIsAlreadyExisiting } from "../service/auth.service.js";

export const sign_up = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, age, role } = req.body;

        const existing = await emailIsAlreadyExisiting(email)

        if (existing) return res.status(409).send("Email is already taken")

        const hashedPassword = await bcryptjs.hash(password, 8)

        const user = await CreateNewUser({ firstName, lastName, email, password: hashedPassword, age, role })

        res.status(201).json({success: true})
    } catch (e) {
        next(e)
    }
}

export const log_in = async (req, res, next) => {
    try{
        console.log(req.cookies)
        const  token = req.cookies.refreshToken;
        if (token) return res.status(403).send("You already loged in")
        
        const { email, password } = req.body;

        const user = await emailIsAlreadyExisiting(email)

        if (!user) return res.status(400).send("You Must Create Account first");

        const isMatch = await bcryptjs.compare(password, user.password)
    
        if (!isMatch) return res.status(400).send("email or password is incorrect");
    
        const refreshToken = await createRefreshToken({ userId: user.id, role: user.role })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 15
        })
        res.status(200).send({ success: true })
    } catch (e) {
        next(e)
    }

}

export const sign_out = async (req, res, next) => {
    try{

        const user = req.user;
        const refreshToken = req.refreshToken;
    
        const deletedMessage = await deleteRefreshToken({ userId: user.id, refreshToken });
    
        res.status(deletedMessage.code).send({ message: deletedMessage.message })
    } catch (e) {
        next(e)
    }
}
import express from "express"
import { log_in, sign_out, sign_up } from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/inputValidation.middleware.js";

const authRouter = express.Router()

authRouter.post("/sign-up", validate, sign_up)
authRouter.post("/log-in", log_in)
authRouter.post("/sign-out", auth, sign_out)
authRouter.post("/refresh", auth, )

export default authRouter; 
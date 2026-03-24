import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const userRouter = express.Router()

userRouter.get("/users/:count", auth, authorize('admin'), getUsers)
userRouter.get("/me", auth, getUser)
userRouter.patch('/user', auth, updateUser)
userRouter.delete('/user', auth, deleteUser)



export default userRouter;
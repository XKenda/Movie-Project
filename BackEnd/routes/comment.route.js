import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { addNewComment, DeleteComment, getComments, updateComment } from "../controllers/comment.controller.js";

const commentRouter = express.Router();

commentRouter.post('/new', auth, addNewComment)
commentRouter.get('/:id', getComments)
commentRouter.patch('/update/:id', auth, updateComment)
commentRouter.delete('/delete/:id', auth, DeleteComment)


export default commentRouter;
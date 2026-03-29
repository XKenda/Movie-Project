import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { addNewComment, decreaseCommentLike, DeleteComment, getComments, getUserLikes, increaseCommentLike, updateComment } from "../controllers/comment.controller.js";

const commentRouter = express.Router();

commentRouter.post('/new', auth, addNewComment)
commentRouter.get('/:id', getComments)
commentRouter.patch('/update/:id', auth, updateComment)
commentRouter.delete('/delete/:id', auth, DeleteComment)
commentRouter.post('/inc/:id', auth, increaseCommentLike)
commentRouter.post('/dec/:id', auth, decreaseCommentLike)
commentRouter.get('/user/likes', auth, getUserLikes)


export default commentRouter;
import { deleteExistingComment, insertNewComment, selectComments, updateExistingComment } from "../service/comment.service.js"


export const addNewComment = async (req, res, next)=> {
    try {
        const userId = req.user.id;
        const {movieId, parentId, text} = req.body

        const newComment = await insertNewComment({userId, movieId, text, parentId})

        res.status(201).json({success: true, data: newComment})
    } catch (e) {
        next(e)
    }
}

export const getComments = async (req, res, next) => {
    try {
        const movieId = req.params.id

        const data = await selectComments(+(movieId))
        if(data.length === 0) return res.status(200).send("No comment has been writen yet")
        res.status(200).json({success: true, data})
    } catch (e) {
        next(e)
    }
}

export const updateComment = async (req, res, next) => {
    try {
        const userId = req.user.id
        const commentId = req.params.id
        const { text } = req.body

        const data = await updateExistingComment(userId, commentId, text);

        res.status(200).json({success: true, data})

    } catch (e) {
        next(e)
    }
}


export const DeleteComment = async (req, res, next) => {
    try {
        const userId = req.user.id
        const commentId = req.params.id

        const data = await deleteExistingComment(userId, commentId);

        res.status(200).send('deleted')

    } catch (e) {
        next(e)
    }
}

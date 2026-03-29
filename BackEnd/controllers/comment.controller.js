import { decreaseCommentLikes, deleteAllLikesOnComment, deleteExistingComment, deleteUserLike, getAllUserLikes, increaseCommentLikes, insertNewComment, saveUserLike, selectComments, updateExistingComment } from "../service/comment.service.js"


export const addNewComment = async (req, res, next)=> {
    try {
        const userId = req.user.id;
        const {movieId, parentId, text, username} = req.body

        const newComment = await insertNewComment({userId, movieId, text, parentId, username})
        
        if(newComment.message)
            res.status(200).json({success: false, message: newComment.message})
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
        await deleteAllLikesOnComment({commentId})

        res.status(200).send('deleted')

    } catch (e) {
        next(e)
    }
}

export const increaseCommentLike = async (req, res, next) => {
    try {
        const userId = req.user.id
        const commentId = req.params.id

        const success = await increaseCommentLikes({commentId});
        const increaseUserLikeSuccess = await saveUserLike({userId, commentId})

        if(!success && !increaseUserLikeSuccess)
            res.status(200).json({success: false})

        res.status(200).json({success})
    } catch (e) {
        next(e)
    }
}

export const decreaseCommentLike = async (req, res, next) => {
    try {
        const userId = req.user.id
        const commentId = req.params.id

        const success = await decreaseCommentLikes({commentId});
        const deleteUserLikeSuccess = await deleteUserLike({userId, commentId})

        if(!success && !deleteUserLikeSuccess)
            res.status(200).json({success: false})

        res.status(200).json({success})
    } catch (e) {
        next(e)
    }
}

export const getUserLikes = async (req, res, next) => {
    try{

        const userId = req.user.id
        const data = await getAllUserLikes({userId})
        console.log(data)
        if(data)
            res.status(200).json({success: true, data})

        res.status(200).json({success: false})
    } catch (e) {
        next(e)
    }
}
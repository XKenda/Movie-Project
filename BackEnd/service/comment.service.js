import Comment from "../models/comment.model.js"
import Likes from "../models/like.model.js";



export const insertNewComment = async ({userId, movieId, text, parentId, username})=>{
    try {

        const newComment = Comment.create({userId, movieId, text, parentId, username});

        return newComment
    } catch (e) {
        throw new Error(e.message)
    }
}

export const selectComments = async (movieId) => {
    try {

        const allComments = await Comment.find({movieId});
        return allComments;
        
    } catch (e) {
        throw new Error(e.message)
    }
}

export const updateExistingComment = async (owner, commentId, text ) => {
    try {
        const comment = await Comment.findOneAndUpdate({_id : commentId, userId: owner}, {text}, {new: true})
        
        if(!comment) throw new Error('cannot update this comment')

        return comment;
    } catch (e) {
        throw new Error(e.message)
    }
}

export const deleteExistingComment = async (owner, commentId) => {
    try {
        const comment = await Comment.findOneAndDelete({_id : commentId, userId: owner});

        if(!comment) throw new Error('cannot delete this comment')

        return comment;
    } catch (e) {
        throw new Error(e.message)
    }
}

export const increaseCommentLikes = async ({commentId})=>{
    try {
        await Comment.findOneAndUpdate({_id: movieId}, {$inc : {likes: 1}})

        return true
    } catch (e) {
        return e
    }
}

export const decreaseCommentLikes = async ({commentId})=>{
    try {
        await Comment.findOneAndUpdate({_id: movieId}, {$inc : {likes: -1}})

        return true
    } catch (e) {
        return e
    }
}

export const saveUserLike = async ({userId, commentId}) => {
    try {
        const like = await Likes.create({userId, commentId})

        if(like)
            return true
    } catch (e) {
        return false
    }
}

export const deleteUserLike = async ({userId, commentId}) => {
    try {
        const like = await Likes.findOneAndDelete({userId, commentId})

        if(like)
            return true
    } catch (e) {
        return false
    }
}

export const getAllUserLikes = async ({userId}) => {
    try {
        const data = (await Likes.find({userId})).map(((comment) => {return comment.commentId}))
        return data
    } catch (e) {
        throw new Error(e.message)
    }
} 
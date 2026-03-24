import Comment from "../models/comment.model.js"



export const insertNewComment = async ({userId, movieId, text, parentId})=>{
    try {

        const newComment = Comment.create({userId, movieId, text, parentId});

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
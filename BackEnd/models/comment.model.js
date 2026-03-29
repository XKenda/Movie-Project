import { model, Schema } from "mongoose";

const commentSchema = new Schema({
    movieId: {
        type: Number,
        required: [true, 'movie id is required'],
    },
    userId: {
        type: Number,
        required: [true, 'user id is required'],
    },
    username: {
        type: String,
        required: [true, 'username is required']
    },
    text: {
        type: String,
        required: true,
        trim: true,
        minLength: 4
    },
    parentId: {
        type: Schema.Types.ObjectId,
        default: null,
    },
    likes: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {timestamps: true})

const Comment = model('Comment', commentSchema)

export default Comment;
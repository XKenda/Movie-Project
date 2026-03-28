import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: [true, 'userId is required']
    },
    commentId : {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'comment id is required']
    }
}, )

const Likes = mongoose.model('Like', likeSchema);

export default Likes;
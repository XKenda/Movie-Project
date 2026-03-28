import { useEffect, useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { decCommentLikes, incCommentLikes } from "../../API/authApi";

const Comment = ({comment, AllComments, userLikes, addOrRemoveLike})=>{
    let [likes, setLikes] = useState(comment.likes)
    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = async () => {
        addOrRemoveLike({commentId: comment._id})
        if(isLiked){
            setLikes(prev => prev - 1)
            await decCommentLikes({commentId: comment._id})
        } else{
            setLikes(prev => prev + 1)
            await incCommentLikes({commentId: comment._id})
        }
    } 

    useEffect(()=>{
        if(userLikes.includes(comment._id))
            setIsLiked(true)
        else
            setIsLiked(false)
    }, [userLikes, comment._id])

    return (
        <div className="comment my-10">
            <div className="comment-body flex gap-7">

            <div className="img-con">
                <img className="comment-img w-15 rounded-full" src="/profile-pic.jpg" alt={comment.username} />
            </div>
            <div className="comment-info text-2xl flex w-full justify-between">
                <div className="comment-info-details flex flex-col gap-2">
                <p className="comment-username text-gray-400">{comment.username}</p>
                <hr className="text-gray-600" />
                <p className="comment-text">{comment.text}</p>
                </div>
                <div className="comment-additional-info">
                    <p className="likes">{likes}</p>
                </div>
            </div>
            </div>
            <div className="comment-btns text-[18px] text-gray-600 flex  items-center justify-end gap-10">
                <button className="replay=btn btn">reply</button>
                <button
                  onClick={handleLikeClick}
                  className={`like-btn btn text-2xl ${isLiked ? "liked" : "notliked"}`}
                >
                  {isLiked ? <BiSolidLike className="text-amber-400" /> : <BiLike />}
                </button>
            </div>
        </div>
    )
}

export default Comment;
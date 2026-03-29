import { useEffect, useRef, useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { IoSend } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { AddComment, decCommentLikes, DeleteComment, incCommentLikes } from "../../API/authApi";

const Comment = ({user, comment, AllComments, userLikes, addOrRemoveLike, removeComment})=>{
    let [likes, setLikes] = useState(comment.likes)
    const [isLiked, setIsLiked] = useState(false);
    const [replyIsOpen, setReplyIsOpen] = useState(false);
    const [replies, setReplies] = useState([]);
    const replyInputRef = useRef(null);

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


    const deleteComment = async () => {
        const commentId = comment._id
        removeComment({commentId})
        if(user.id === comment.userId)
            await DeleteComment({commentId})

        
    }

    async function addingNewReply() {
    const replyText = replyInputRef.current.value

    await AddComment({movieId: comment.movieId, parentId: comment._id, text: replyText, username: `${user.firstName} ${user.lastName}`})
    setReplyIsOpen(false)

    }

    useEffect(()=>{
        if(userLikes.includes(comment._id))
            setIsLiked(true)
        else
            setIsLiked(false)
    }, [userLikes, comment._id])


    useEffect(()=>{
        const getReplies = ()=> {
            const CommentReplies = AllComments.filter((c => c.parentId == comment._id))
            setReplies(CommentReplies)
        }

        getReplies()
    }, [])

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
                <p className="comment-text text-[18px]">{comment.text}</p>
                </div>
                <div className="comment-additional-info">
                    <p className="likes text-[20px]">{likes}</p>
                </div>
            </div>
            </div>
            <div className="comment-btns text-[18px] text-gray-600 flex  items-center justify-end gap-10">
                <button onClick={()=> setReplyIsOpen(!replyIsOpen)} className="replay=btn btn">reply</button>
                <button
                    onClick={handleLikeClick}
                    className={`like-btn btn text-2xl ${isLiked ? "liked" : "notliked"}`}
                >
                    {isLiked ? <BiSolidLike className="text-amber-400" /> : <BiLike />}
                </button>
                {
                    comment.userId === user.id? 
                    <button onClick={deleteComment} className="trash-can btn"><FaRegTrashAlt /></button> : ''
                }
            </div>
            {
                replyIsOpen?
                <div className="comment-input-con w-full flex justify-evenly items-center gap-2 mt-5">
            <input
                ref={replyInputRef}
                id="comment"
                className="comment-input border-amber-400 border rounded-2xl px-4 py-4 text-gray-300 w-8/12 text-[22px]"
                type="text"
                placeholder="Add New reply"
                />
            <button onClick={addingNewReply} className="comment-send btn bg-amber-400 px-4 py-2 text-black rounded-2xl">
                <IoSend />
            </button>
            </div> : ""
            }
            {
                replies.length > 0?
                <div className="reply-con border-l-2 px-10">
                    {
                        replies.map((reply)=>(
                            <Comment
                            user={user} 
                            comment={reply} 
                            AllComments={AllComments}
                            userLikes={userLikes}
                            addOrRemoveLike={addOrRemoveLike}
                            removeComment={removeComment}
                            />
                        ))
                    }
                </div>
                : ""
            }
        </div>
    )
}

export default Comment;
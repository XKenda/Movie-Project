import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { AddComment, getComments, getUserLikes } from "../../API/authApi";
import Loading from "./Loading";
import Comment from "../components/Comment";

const MoviePage = ({user, moviesList, watchedIds, addWatchMovie }) => {
  const [comments, setComments] = useState([]);
  const [Allcomments, setAllComments] = useState([]);
  const [userLikes, setUserLikes] = useState([])
  const [commentsIsLoading, setCommentsIsLoading] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const CommentInputRef = useRef(null);

  const { id } = useParams();
  const movie = moviesList.find((movie) => movie.id == id);
  const {
    title,
    poster_path,
    adult,
    original_language,
    overview,
    release_date,
    vote_average,
  } = movie;

  useEffect(() => {
    function handleIsWatched() {
      if (watchedIds.includes(id)) setIsWatched(true);
    }

    handleIsWatched();
  }, [id, watchedIds]);

  async function HandleWatchedClick() {
    try {
      setIsWatched(true);
      await addWatchMovie({ movie });
    } catch (e) {
      console.log(e);
    }
  }

  const getAllComments = async (id) => {

    const commentRes = await getComments({movieId: id})
    const userLikesRes = await getUserLikes()
  
    if(commentRes.data.success){
      setAllComments(commentRes.data.data)
      setComments(commentRes.data.data.filter((c) => c.parentId == null))
    }

    if(userLikesRes.data.success)
      setUserLikes(userLikesRes.data.data)

  }

  const addOrRemoveLike = ({commentId}) => {
    if(userLikes.includes(commentId)) {
      setUserLikes(userLikes.filter(c => c !== commentId))
    }
    else{
        setUserLikes(prev => [...prev, commentId])
    }

  }

  async function addingNewComment() {
    const commentText = CommentInputRef.current.value

    await AddComment({movieId: id, text: commentText, username: `${user.firstName} ${user.lastName}`})

    await getAllComments(id)
  }

  async function removeComment({commentId}) {
  setComments(comments.filter(comment => comment._id !== commentId))
  }


  useEffect(() => {
    async function fun() {
      setCommentsIsLoading(true)
      await getAllComments(id)
      setCommentsIsLoading(false)
    }

    fun()
  }, [id]);

  return (
    <div className="movie-con text-white text-4xl px-20 py-40">
      <div className="movie border rounded-2xl p-15 border-amber-400 flex justify-between gap-10 flex-col lg:flex-row items-center">
        <div className="img-con flex flex-col gap-10 items-center">
          <img
            className="movie-poster w-90 rounded-2xl"
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : "/no-movie.png"
            }
            alt={title}
          />
          <h2 className="movie-title">{title}</h2>
        </div>
        <div className="movie-info-con max-w-150 flex flex-col gap-10 text-2xl">
          <p className="overview text-[20px] md:text-2xl">
            <span className="movie-page-span">Overview :</span> {overview}
          </p>
          <p className="adult-text">
            <span className="movie-page-span">Adult :</span>{" "}
            {adult ? "yes" : "no"}
          </p>
          <p className="language">
            <span className="movie-page-span">Language :</span>{" "}
            {original_language}
          </p>
          <p className="release-date">
            <span className="movie-page-span">Release Date : </span>
            {release_date}
          </p>
          <div className="rating flex ">
            <img src="/star.svg" className="w-5" alt="star icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>
          <div className="btn-con flex justify-center">
            <button
              onClick={HandleWatchedClick}
              disabled={isWatched ? true : false}
              className={
                "watched-btn text-center bg-amber-400 py-5 px-10 text-black rounded-2xl text-3xl btn "
              }
              id="watched"
            >
              {isWatched ? "Watched!" : "Watch"}
            </button>
          </div>
        </div>
      </div>
      <div className="comment-sec mt-20">
        <div className="comment-title-con">
          <h2 className="comment-title">Comments</h2>
          <hr className="w-60" />
        </div>
        <div className="comment-con my-10">
          {
            commentsIsLoading?
            <div className="spinner-con"><Loading /></div>
            : comments.length > 0?
            comments.map((comment) => (
              <Comment user={user} comment={comment} AllComments={Allcomments} userLikes={userLikes} addOrRemoveLike={addOrRemoveLike} removeComment={removeComment} />
            )) 
            : <div className="no-comment-con flex justify-center items-center text-2xl p-10 text-gray-500"><p className="no-comments">No Comments yet</p></div>
          }
        </div>
        <div className="comment-input-con w-full flex items-center gap-2">
          <input
            ref={CommentInputRef}
            id="comment"
            className="comment-input border-amber-400 border rounded-2xl px-4 py-4 text-gray-300 flex-1 text-[22px]"
            type="text"
            placeholder="Add New Comment"
          />
          <button onClick={addingNewComment} className="comment-send btn bg-amber-400 px-4 py-2 text-black rounded-2xl">
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;

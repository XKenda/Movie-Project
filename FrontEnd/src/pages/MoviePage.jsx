import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MoviePage = ({moviesList, watchedIds, addWatchMovie}) => {
  const [isWatched, setIsWatched] = useState(false)
  const { id } = useParams()
    const movie = moviesList.find(movie => movie.id == id)
    const {title, 
      poster_path, 
      adult, 
      original_language, 
      overview,
      release_date,
      vote_average} = movie

  useEffect(()=>{
    function handleIsWatched() {
      if(watchedIds.includes(id))
        setIsWatched(true)
    }

    handleIsWatched()
  }, [])

  async function HandleWatchedClick() {
    try {
      setIsWatched(true)
      await addWatchMovie({movie})
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="movie-con text-white text-4xl mx-20 py-40">
      <div className="movie border rounded-2xl p-15 border-amber-400 flex justify-between gap-10 flex-col lg:flex-row items-center">
        <div className="img-con flex flex-col gap-10 items-center">
          <img className="movie-poster w-90 rounded-2xl" src={poster_path? `https://image.tmdb.org/t/p/w500${poster_path}` : '/no-movie.png'} alt={title} />
          <h2 className="movie-title" >{title}</h2>
        </div>
        <div className="movie-info-con max-w-150 flex flex-col gap-10 text-2xl">
          <p className="overview text-[20px] md:text-2xl"><span className="movie-page-span">Overview :</span> {overview}</p>
          <p className="adult-text"><span className="movie-page-span">Adult :</span> {adult? "yes": "no"}</p>
          <p className="language"><span className="movie-page-span">Language :</span> {original_language}</p>
          <p className="release-date"><span className="movie-page-span">Release Date : </span>{release_date}</p>
          <div className="rating flex ">
            <img src="/star.svg" className="w-5" alt="star icon" />
            <p>{vote_average? vote_average.toFixed(1) : "N/A"}</p>
        </div>
          <div className="btn-con flex justify-center">
            <button onClick={HandleWatchedClick} disabled={isWatched? true: false} className={"watched-btn text-center bg-amber-400 py-5 px-10 text-black rounded-2xl text-3xl btn "} id="watched">{isWatched? "Watched!": "Watch"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const MovieCard = ({movie, favIds, deleteMovieFromFav, addMovieToFav}) => {

        const {id, title, vote_average, poster_path, release_date, original_language} = movie

        const [inFav, setInFav] = useState(false)
        const cls = `fav-icon-con btn ${inFav? 'text-red-600 red-heart-ani': 'text-gray-400 gray-heart-ani'}`
        
        useEffect(()=>{
            function handleInFav() {
                if(favIds.includes(id.toString()))
                    setInFav(true)
            }

            handleInFav()
        }, [favIds, id])

        const HandleFav = async () => {
            try {
                setInFav(!inFav)
                if(inFav){
                    await deleteMovieFromFav({movieId: id, title})
                } else {
                    await addMovieToFav({movie})
                }
            } catch (e) {
                setInFav(!inFav)
                console.log(e)
            }

            
        }

    
    return (
        <div className="movie-card">
            <NavLink className='btn' to={`/movie/${id}`}><img src={poster_path? `https://image.tmdb.org/t/p/w500${poster_path}` : '/no-movie.png'} alt={title} /></NavLink> 
            <div className="mt-4">
                <h3>{title}</h3>
            </div>
            <div className="details-con flex justify-between align-middle">
                <div className="movie-details content">

                    <div className="rating">
                        <img src="star.svg" alt="star icon" />
                        <p>{vote_average? vote_average.toFixed(1) : "N/A"}</p>
                    </div>
                    <span>•</span>
                    <p className="lang">{original_language}</p>
                    <span>•</span>
                    <p className="year">
                        {release_date? release_date.split('-')[0] : "N/A"}
                    </p>
                </div>
                <div className="btns-con">
                    <p className={cls} onClick={HandleFav}><MdFavorite className="w-10 text-3xl" /></p>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default MovieCard;
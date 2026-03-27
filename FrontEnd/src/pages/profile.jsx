import ProfileMovieCard from "../components/ProfileMovieCard";
import Marquee from "react-fast-marquee";
import ProfileWatchedMovieCard from "../components/ProfileWatchedMovieCard";
import { useEffect, useRef, useState } from "react";

export const Profile = ({user,
                        deleteMovieFromFav,
                        favMovies,
                        watchedMovies})=> {
    
    const MovieCardWidth = 240
    const favConRef = useRef(null);
    const watchedConRef = useRef(null);
    const [favAnimate, setFavAnimate] = useState(false);
    const [watchedAnimate, setWatchedAnimate] = useState(false);

    useEffect(()=>{
        async function getWidth() {

            const favConWidth = favConRef.current.offsetWidth
            const watchedConWidth = watchedConRef.current.offsetWidth
            
            const FavVisible = favConWidth / MovieCardWidth
            const WatchedVisible = watchedConWidth / MovieCardWidth;

            if(favMovies.length > FavVisible)
                setFavAnimate(true)
            else
                setFavAnimate(false)
            
            if(watchedMovies.length > WatchedVisible)
                setWatchedAnimate(true)
            else
                setWatchedAnimate(false)
        }


        getWidth()
    }, [favMovies, watchedMovies]);
    
    return (
        <div key={user.id} className="profile-con py-30 md:px-30 px-10">
            <div className="profile rounded-4xl border border-white p-20 text-white flex flex-row justify-around flex-wrap flex-auto">
                <div className="info-con mb-10">
                    <img className="rounded-full max-w-50" src={user?.picture || '/profile-pic.jpg'} alt={user?.username} />
                    <h3 className="profile-username text-center mt-5 text-2xl" >{user?.firstName + " " + user?.lastName}</h3>
                </div>
                <div></div>
                <div className="details-con text-[17px] md:text-[20px] text-gray-400 flex flex-col justify-center">
                    <p className="detail-field email">email : <span>{user?.email}</span></p>
                    <p className="detail-field rating my-5">age : <span>{user?.age}</span></p>
                    <p className="detail-field rating">rating : <span>{+(user?.rating)}</span></p>
                </div>
            </div>
            <div className="fav-movies mt-20 text-white">
                <h2 className="">Favourite Movies</h2>
                <hr className="text-white w-50 my-2" />
                    <div ref={favConRef}>
                {

                    favMovies.length > 0?
                    <Marquee  play={favAnimate? true : false} speed={20}  className="fav-movie-con flex">
                    { 
                        favMovies.map((favMovie)=>(
                            <ProfileMovieCard 
                            key={favMovie.movieId} 
                            movie={favMovie} 
                            deleteMovieFromFav={deleteMovieFromFav}
                            />
                        ))
                    } 
                </Marquee> 
                :
                <p className="no-fav-movies text-center text-3xl text-gray-400 mt-10">There is no favourite movies</p>
            }
                    </div>
            </div>
                <div className="fav-movies mt-20 text-white">
                <h2 className="">Watch History</h2>
                <hr className="text-white w-50 my-2" />
                <div ref={watchedConRef}>
                {

                    watchedMovies.length === 0?
                    <p className="no-fav-movies text-center text-3xl text-gray-400 mt-10">{user.firstName} has not watched something yet</p>
                    : 
                    <Marquee play={watchedAnimate? true : false} speed={20} className="fav-movie-con flex">
                    {
                        watchedMovies.map((Watched)=>(
                            <ProfileWatchedMovieCard key={Watched.movieId} movie={Watched} />
                        ))
                    }
                    </Marquee>
                }
                </div>
            </div>
        </div>
    )
}

export default Profile;
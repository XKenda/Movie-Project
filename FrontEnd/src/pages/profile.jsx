import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import ProfileMovieCard from "../components/ProfileMovieCard";
import LSpinner from "../components/spinner";
import Marquee from "react-fast-marquee";

export const Profile = ({user, favMovies, favIds, setFavIds, setFavMovies})=> {
    const [profileFavouriteMovies, setProfileFavouriteMovies] = useState([])

    useEffect(()=>{
        setProfileFavouriteMovies(favMovies)
    }, [favMovies])

    return (
        <div key={user.id} className="profile-con py-30 md:px-30 sm:px-10">
            <div className="profile rounded-4xl border border-white p-20 text-white flex flex-row justify-around flex-wrap flex-auto">
                <div className="info-con p-10">
                    <img className="rounded-full max-w-50" src={user?.picture || '/profile-pic.jpg'} alt={user?.username} />
                    <h3 className="profile-username text-center mt-5 text-2xl" >{user?.firstName + " " + user?.lastName}</h3>
                </div>
                <div></div>
                <div className="details-con text-[20px] text-gray-400 flex flex-col justify-center">
                    <p className="detail-field email">email : <span>{user?.email}</span></p>
                    <p className="detail-field rating my-5">age : <span>{user?.age}</span></p>
                    <p className="detail-field rating">rating : <span>{+(user?.rating)}</span></p>
                </div>
            </div>
            <div className="fav-movies mt-20 text-white">
                <h2 className="">Favourite Movies</h2>
                <hr className="text-white w-50 my-2" />
                {
                    profileFavouriteMovies.length > 0?
                    <Marquee play={profileFavouriteMovies.length > 5? true : false} speed={20} className="fav-movie-con flex">
                    { 
                        profileFavouriteMovies.map((favMovie)=>(
                            <ProfileMovieCard 
                            key={favMovie.movieId} 
                            movie={favMovie} 
                            favMovies={favMovies}
                            setFavMovies={setFavMovies}
                            favIds={favIds}
                            setFavIds={setFavIds}
                            />
                        ))
                    } 
                </Marquee> :
                <p className="no-fav-movies text-center text-3xl text-gray-400 mt-10">There is no favourite movies</p>
                }
            </div>
                <div className="fav-movies mt-20 text-white">
                <h2 className="">Watch History</h2>
                <hr className="text-white w-50 my-2" />
                {
                    // favIsLoading? <p className="fav-loading"><LSpinner /></p> :
                    // !favMovies.length?
                    // <p className="no-fav-movies text-center text-3xl text-gray-400 mt-10">{user.firstName} has not watched something yet</p>
                    // : 
                    // favMovies.map((favMovie)=>(
                    //     <MovieCard key={favMovie.movieId} movie={favMovie} />
                    // ))
                }
            </div>
        </div>
    )
}

export default Profile;
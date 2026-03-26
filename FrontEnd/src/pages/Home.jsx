import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Search from "../components/Search";
import MovieCard from "../components/MovieCard";
import LSpinner from "../components/spinner";
import { getTrendingMovies } from "../../API/authApi";
import TrendingMovieCard from "../components/trendingMovieCard";




export default function Home({favIds, deleteMovieFromFav, addMovieToFav, fetchMovies, moviesList, watchedIds}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [trendingMovies, setTrendingMovies] = useState([])
    const [trendingLoading, setTrendingLoading] = useState(false)

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);


    useEffect(() => {
        async function getData() {

            try{
                setIsLoading(true)
                const message = await fetchMovies(debouncedSearchTerm);
                if(message)
                    setErrorMessage(message)
            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false)
            }
        }

    getData()
    }, [debouncedSearchTerm,]);

    useEffect(()=>{
        async function getData() {
            setTrendingLoading(true)
            try {
                const res = await getTrendingMovies();
                
                if(res.data.success)
                    setTrendingMovies(res.data.data)
            } catch (e) {
                console.log(e.message)
            }
            setTrendingLoading(false)
        }

        getData()
    }, [])

    return (
        <main>
        <div className="Pattern absolute" />
        <div className="wrapper">
            <header>
            <img src="/hero.png" alt="Hero Banner" />
            <h2 className="text-center">
                Find <span className="text-gradient">Movies</span> You&apos;ll Enjoy
                Without Hassle
            </h2>

            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </header>

            {
                trendingLoading? <div className="trend-spinner-con"><LSpinner /></div>
                : 
                <section>
                    <div className="trending-movie-con py-10 trending">
                        <h2 className="trending-title mb-7">Trending</h2>
                        {
                            trendingMovies.length > 0?
                            <ul>
                                {
                                    trendingMovies.map((movie, index)=>(
                                        <li key={movie.movieId}>
                                            <p className="trend-index inline">{index + 1}</p>
                                            <TrendingMovieCard movie={movie} />
                                        </li>
                                    ))
                                }
                            </ul>
                            :
                            <p className="no-trend-text text-gray-400 text-center text-2xl">No trending movies at time</p>
                        }
                    </div>
                </section>
            }

            <section className="all-movies">
            <h2>All movies</h2>
            {isLoading ? (
                <LSpinner />
            ) : errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
            ) : (
                <ul>
                { moviesList.map((movie) => (
                    <MovieCard 
                        key={movie.id} 
                        movie={movie} 
                        deleteMovieFromFav={deleteMovieFromFav}
                        addMovieToFav={addMovieToFav}
                        favIds={favIds}
                        watchedIds={watchedIds}
                        />
                ))}
                </ul>
            )}
            </section>
        </div>
        </main>
    );
}

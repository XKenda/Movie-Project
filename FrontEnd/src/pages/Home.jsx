import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Search from "../components/Search";
import MovieCard from "../components/MovieCard";
import LSpinner from "../components/spinner";
import { getTrendingMovies, saveSearch } from "../../API/authApi";
import TrendingMovieCard from "../components/trendingMovieCard";


const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
};

export default function Home({favIds, deleteMovieFromFav, addMovieToFav}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [moviesList, setMoviesList] = useState([]);
    // const [favoruiteIds, setFavouriteIds] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [trendingMovies, setTrendingMovies] = useState([])
    const [trendingLoading, setTrendingLoading] = useState(false)

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

    const fetchMovies = async (query = "") => {
        setIsLoading(true);
        setErrorMessage("");

        try {
        const endpoint = query
            ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
            : `${API_BASE_URL}/discover/movie?sort-by=popularity.desc`;
        const response = await fetch(endpoint, API_OPTIONS);
        if (!response.ok) throw new Error("Failed to fetch movies");

        const data = await response.json();
        setMoviesList(data.results || []);
        if(query)
            await saveSearch({movie:data.results[0]})
        } catch (error) {
        console.error(error);
        setErrorMessage("Error fetching movies. Please try again later.");
        } finally {
        setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

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
                            <p className="no-trend-text text-white text-center text-2xl">No trending movies at time</p>
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
                        />
                ))}
                </ul>
            )}
            </section>
        </div>
        </main>
    );
}

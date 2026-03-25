import { useParams } from "react-router-dom";

const MoviePage = ({moviesList}) => {
  const { id } = useParams()
    const movie = moviesList.find(movie => movie.id == id)
    const {title, poster_path} = movie

  return (
    <div className="movie-con text-white text-4xl">
      <div className="img-con">
        <img className="movie-poster" src={poster_path? `https://image.tmdb.org/t/p/w500${poster_path}` : '/no-movie.png'} alt={title} />
      </div>
      <h2 className="movie-title" >{title}</h2>
    </div>
  );
};

export default MoviePage;
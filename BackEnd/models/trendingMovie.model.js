import { model, Schema } from "mongoose";


const TMovieSchema = new Schema({
    movieName: {
        type: String,
        required: true,
        trim: true
    },
    count: {
        type: Number,
        default: 1, 
    },
    posterUrl: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    score: {
        type: Number,
    },
    movieId: {
        type: Number,
        required: true,
    }
}, {timestamps: true})

TMovieSchema.pre("save", async function (){
    const movie = this

    movie.score = movie.views + movie.count
    console.log(movie.score)
})

const TMovie = model('trendingMovies', TMovieSchema) 

export default TMovie;


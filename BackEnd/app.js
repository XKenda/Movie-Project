import express from "express"
import cookieParser from "cookie-parser";
import logger from "morgan"
import cors from "cors";

import { PORT } from "./config/env.js";
import connectToMongoDB from "./DB/mongodb.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import movieRouter from "./routes/movie.route.js";
import { errorHandler } from "./middlewares/error.middleware.js"; 
import commentRouter from "./routes/comment.route.js";


var app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.options("*", cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/user', userRouter)
app.use('/api/v1/auth', authRouter) 
app.use('/api/v1/movie', movieRouter)
app.use('/api/v1/comment', commentRouter)

app.use(errorHandler)


app.listen(PORT, async ()=>{
    console.log(`Backend listend on http://localhost:${PORT}`)
    await connectToMongoDB();
})
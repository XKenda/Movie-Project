import { numeric, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const favouriteMovies = pgTable("favouirte_movies", {
    id: serial('id').primaryKey(),
    userId: numeric('user_id').notNull(),
    movieId: numeric('movie_id').notNull().unique(),
    movieTitle: varchar('movie_title', {length: 255}).notNull(),
    posterUrl: varchar('poster_url', {length: 255}),
    favouriteAt: timestamp('favourit_at').defaultNow()
})
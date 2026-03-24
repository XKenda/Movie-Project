import { numeric, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const latestWatched = pgTable("latest_watched", {
    id: serial('id').primaryKey(),
    userId: numeric('user_id').notNull(),
    movieId: numeric('movie_id').notNull().unique(),
    movieTitle: varchar('movie_title', {length: 255}).notNull(),
    posterUrl: varchar('poster_url', {length: 255}),
    watchedAt: timestamp('watched_at').defaultNow()
})
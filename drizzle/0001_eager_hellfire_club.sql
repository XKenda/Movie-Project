CREATE TABLE "tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" numeric NOT NULL,
	"refresh_Token" varchar NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "latest_watched" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" numeric NOT NULL,
	"movie_id" numeric NOT NULL,
	"watched_at" timestamp DEFAULT now(),
	CONSTRAINT "latest_watched_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "latest_watched_movie_id_unique" UNIQUE("movie_id")
);
--> statement-breakpoint
CREATE TABLE "favouirte_movies" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" numeric NOT NULL,
	"movie_id" numeric NOT NULL,
	CONSTRAINT "favouirte_movies_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "favouirte_movies_movie_id_unique" UNIQUE("movie_id")
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "username" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE varchar(255);
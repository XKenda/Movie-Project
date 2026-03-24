CREATE TYPE "public"."role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(20) NOT NULL,
	"email" varchar(20) NOT NULL,
	"password" varchar(255) NOT NULL,
	"age" numeric NOT NULL,
	"role" "role" DEFAULT 'user',
	"created_At" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

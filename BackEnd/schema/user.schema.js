import {pgTable, varchar, serial, timestamp, numeric, pgEnum} from "drizzle-orm/pg-core";
export const roleEnum = pgEnum('role', ['user', 'admin']);

export const users = pgTable("users",  {
    id: serial('id').primaryKey(),
    firstName: varchar('first_name', {length: 255}).notNull(),
    lastName: varchar('last_name', {length: 255}).notNull(),
    email: varchar('email', {length: 255}).unique().notNull(),
    password: varchar('password', {length: 255}).notNull(),
    age: numeric('age').notNull(),
    role: roleEnum('role').default('user'),
    rating: varchar('rating').default("0"),
    createdAt: timestamp("created_At").defaultNow(),
})

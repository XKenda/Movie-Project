import { numeric, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const tokens = pgTable('tokens', {
    id: serial('id').primaryKey(),
    userId: numeric('userId').notNull(),
    refreshToken: varchar('refresh_Token').notNull(),
    createdAt: timestamp("created_at").defaultNow(),
}) 
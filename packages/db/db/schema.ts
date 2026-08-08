import { pgTable, uuid, varchar, pgEnum, timestamp } from "drizzle-orm/pg-core";

export const Providers = pgEnum("provider", ["google", "email"]);

export const account = pgTable("account", {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    provider: Providers("provider").notNull(),
    createdAt: timestamp("created_at", { withTimezone: false }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: false }).defaultNow().notNull(),
});

export const org = pgTable("org", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    accountId: uuid("account_id")
        .notNull()
        .references(() => account.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: false }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: false }).defaultNow().notNull(),
});
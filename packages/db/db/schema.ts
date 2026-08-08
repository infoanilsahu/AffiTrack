import { pgTable, integer, uuid, varchar, pgEnum, timestamp } from "drizzle-orm/pg-core";

export const Providers = pgEnum("provider",["google", "email"])

export const account = pgTable("Account", {
    id: uuid().defaultRandom().primaryKey(),
    email: varchar().notNull(),
    provider: Providers().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const org = pgTable("Org", {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar().notNull(),
    accountId: uuid().notNull().references(() => account.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

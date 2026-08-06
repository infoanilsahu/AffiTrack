import { pgTable, integer, uuid, varchar, pgEnum, timestamp } from "drizzle-orm/pg-core";

const Providers = pgEnum("provider",["google", "email"])

export const account = pgTable("Account", {
    id: uuid().primaryKey(),
    email: varchar().notNull(),
    provider: Providers(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const org = pgTable("Org", {
    id: uuid().primaryKey(),
    name: varchar().notNull(),
    accountId: uuid().notNull().references(() => account.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

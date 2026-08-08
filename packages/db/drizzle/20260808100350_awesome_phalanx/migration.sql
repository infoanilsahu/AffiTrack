CREATE TYPE "provider" AS ENUM('google', 'email');--> statement-breakpoint
CREATE TABLE "Account" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"email" varchar NOT NULL,
	"provider" "provider" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Org" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar NOT NULL,
	"accountId" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Org" ADD CONSTRAINT "Org_accountId_Account_id_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id");
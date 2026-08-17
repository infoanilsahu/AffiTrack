ALTER TABLE "org" ADD COLUMN "slug" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "org" ADD CONSTRAINT "org_slug_unique" UNIQUE("slug");
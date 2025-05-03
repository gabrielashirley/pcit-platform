ALTER TABLE "utterances" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "utterances" DROP COLUMN "timestamp";
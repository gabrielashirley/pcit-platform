CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"date" timestamp DEFAULT now(),
	"praise" integer DEFAULT 0,
	"describe" integer DEFAULT 0,
	"question" integer DEFAULT 0,
	"command" integer DEFAULT 0,
	"negative_talk" integer DEFAULT 0
);

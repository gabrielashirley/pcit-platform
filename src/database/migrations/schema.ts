import { pgTable, foreignKey, uuid, text, boolean, timestamp, integer, real, unique, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const speakerType = pgEnum("speaker_type", ['parent', 'child'])


export const caregivers = pgTable("caregivers", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	userId: text("user_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "caregivers_user_id_users_id_fk"
		}).onDelete("cascade"),
]);

export const specialtimes = pgTable("specialtimes", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	completed: boolean().default(false).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	toys: text(),
	praise: integer().default(0).notNull(),
	reflect: integer().default(0).notNull(),
	describe: integer().default(0).notNull(),
	question: integer().default(0).notNull(),
	command: integer().default(0).notNull(),
	criticism: integer().default(0).notNull(),
	negativeTalk: integer("negative_talk").default(0).notNull(),
	duration: real().default(0).notNull(),
	caregiversid: uuid().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.caregiversid],
			foreignColumns: [caregivers.id],
			name: "specialtimes_caregiversid_caregivers_id_fk"
		}).onDelete("cascade"),
]);

export const utterances = pgTable("utterances", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	sessionId: uuid("session_id").notNull(),
	childUtterance: text("child_utterance"),
	parentUtterance: text("parent_utterance").notNull(),
	speaker: speakerType().notNull(),
	timestamp: timestamp({ mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.sessionId],
			foreignColumns: [specialtimes.id],
			name: "utterances_session_id_specialtimes_id_fk"
		}).onDelete("cascade"),
]);

export const users = pgTable("users", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: boolean("email_verified").notNull(),
	image: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	role: text(),
	banned: boolean(),
	banReason: text("ban_reason"),
	banExpires: timestamp("ban_expires", { mode: 'string' }),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

import { relations } from "drizzle-orm/relations";
import { users, caregivers, specialtimes, utterances } from "./schema";

export const caregiversRelations = relations(caregivers, ({one, many}) => ({
	user: one(users, {
		fields: [caregivers.userId],
		references: [users.id]
	}),
	specialtimes: many(specialtimes),
}));

export const usersRelations = relations(users, ({many}) => ({
	caregivers: many(caregivers),
}));

export const specialtimesRelations = relations(specialtimes, ({one, many}) => ({
	caregiver: one(caregivers, {
		fields: [specialtimes.caregiversid],
		references: [caregivers.id]
	}),
	utterances: many(utterances),
}));

export const utterancesRelations = relations(utterances, ({one}) => ({
	specialtime: one(specialtimes, {
		fields: [utterances.sessionId],
		references: [specialtimes.id]
	}),
}));
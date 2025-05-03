import { boolean, pgTable, text, integer, real, timestamp, uuid } from "drizzle-orm/pg-core"
import {caregivers} from "./caregivers"
import { relations } from "drizzle-orm"
import { createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const specialtime = pgTable("specialtimes", {
    id: uuid("id").primaryKey().defaultRandom(),
    completed: boolean("completed").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    toys: text("toys"),
    praise: integer("praise").notNull().default(0),
    reflect: integer("reflect").notNull().default(0),
    describe: integer("describe").notNull().default(0),  
    question: integer("question").notNull().default(0),
    command: integer("command").notNull().default(0),
    criticism: integer("criticism").notNull().default(0),
    negativeTalk: integer("negative_talk").notNull().default(0),
    duration: real("duration").notNull().default(0),

    caregiversId: uuid("caregiversid")
        .notNull()
        .references(() => caregivers.id, { onDelete: "cascade" })
})

export const specialtimeRelations = relations(caregivers, ({ many }) => ({
    todos: many(specialtime),
}))

export const caregiversToSpecialTimeRelations = relations(specialtime, ({ one }) => ({
    user: one(caregivers, {
        fields: [specialtime.caregiversId],
        references: [caregivers.id],
    }),
}))

export const selecCaregiversSpecialTimeSchema = createSelectSchema(caregivers);
export type CaregiverFromSpecialTime = z.infer<typeof selecCaregiversSpecialTimeSchema>;

export const selectSpecialTimeSchema = createSelectSchema(specialtime);
export type SpecialTime = z.infer<typeof selectSpecialTimeSchema>;

export default {
  specialtime,
  caregivers,
};
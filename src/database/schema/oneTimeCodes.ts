import { boolean, pgTable, text, integer, real,  timestamp, uuid } from "drizzle-orm/pg-core"
import { users } from "./auth"
import { relations } from "drizzle-orm"
import { createSelectSchema, createInsertSchema } from "drizzle-zod"
import { z } from "zod"
import {caregivers} from "./caregivers"

export const oneTimeCodes = pgTable("one_time_codes", {
    id: uuid("id").primaryKey().defaultRandom(),
    code: text("code").notNull(),
    clinicianId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
    caregiversId: uuid("caregivers_id")
    .references(() => caregivers.id, { onDelete: "cascade" }),
    used: boolean("used").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  });


  export const oneTimeCodesRelations = relations(oneTimeCodes, ({ one }) => ({
    caregiver: one(caregivers, {
      fields: [oneTimeCodes.caregiversId],
      references: [caregivers.id],
    }),
  }));
  

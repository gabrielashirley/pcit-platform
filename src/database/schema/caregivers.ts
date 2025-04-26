import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

import { users } from "./auth"
import { relations } from "drizzle-orm"
import { createSelectSchema, createInsertSchema } from "drizzle-zod"
import { z } from "zod"

export const caregivers = pgTable("caregivers", {
    id: uuid("id").primaryKey().defaultRandom(), 
    name: text('name').notNull(),
    clinicianId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" })
  });

  export const clinicianRelations = relations(users, ({ many }) => ({
    todos: many(caregivers),
}))

export const caregiversRelations = relations(caregivers, ({ one }) => ({
    user: one(users, {
      fields: [caregivers.clinicianId],
      references: [users.id],
    }),
  }));

export const selectClinicianSchema = createSelectSchema(users);
export type User = z.infer<typeof selectClinicianSchema>;

export const selectCaregiversSchema = createSelectSchema(caregivers);
export type Caregiver = z.infer<typeof selectCaregiversSchema>;

export const insertCaregiverSchema = createInsertSchema(caregivers, {
    name: (schema: z.ZodString) => schema.nonempty("Name cannot be empty"),
  });
export type NewTodo = z.infer<typeof insertCaregiverSchema>;

export default {
    users,
    caregivers,
  };
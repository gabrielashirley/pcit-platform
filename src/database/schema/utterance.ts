import { boolean, pgTable, text, integer, real,  timestamp, uuid } from "drizzle-orm/pg-core"

import {specialtime} from "./specialtime"
import { relations } from "drizzle-orm"
import { createSelectSchema, createInsertSchema } from "drizzle-zod"
import { z } from "zod"
import { pgEnum } from "drizzle-orm/pg-core";


export const speakerType = pgEnum('speaker_type', ['parent', 'child']);
export const skillType = pgEnum('speaker_type', ['LP','R', 'BD', 'Q', 'COM', 'CRI', 'NTA' ]);


export const utterances = pgTable("utterances", {
    id: uuid("id").primaryKey().defaultRandom(),  // Unique utterance ID
    sessionId: uuid("session_id").references(() => specialtime.id, { onDelete: "cascade" }).notNull(), 
    child_utteranceText: text("child_utterance"),
    parent_utteranceText: text("parent_utterance").notNull(), 
    skillCode: skillType('speaker').notNull(),  
    timestamp: timestamp("timestamp").defaultNow(), 
  });
  
  export const utterancesRelations = relations(utterances, ({ one }) => ({
    session: one(specialtime, {
      fields: [utterances.sessionId],
      references: [specialtime.id],
    }),
  }));
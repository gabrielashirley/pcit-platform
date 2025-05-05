import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import {specialtime} from "./specialtime"
import { relations } from "drizzle-orm"
import { pgEnum } from "drizzle-orm/pg-core";

// export const speakerType = pgEnum('speaker_type', ['parent', 'child']);
export const skillType = pgEnum('skilltype', ['LP','R', 'BD', 'Q', 'COM', 'CRI', 'NTA' ]);

export const utterances = pgTable("utterances", {
    id: uuid("id").primaryKey().defaultRandom(),  // Unique utterance ID
    sessionId: uuid("session_id").references(() => specialtime.id, { onDelete: "cascade" }).notNull(), 
    child_utterance: text("child_utterance"),
    parent_utterance: text("parent_utterance").notNull(), 
    skillcode: skillType('skillcode').notNull(),  
    created_at: timestamp("created_at").defaultNow(), 
  });
  
  export const utterancesRelations = relations(utterances, ({ one }) => ({
    session: one(specialtime, {
      fields: [utterances.sessionId],
      references: [specialtime.id],
    }),
  }));
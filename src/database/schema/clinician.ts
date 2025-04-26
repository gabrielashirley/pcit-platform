import { pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  date: timestamp('date').defaultNow(),
  praise: integer('praise').default(0),
  describe: integer('describe').default(0),
  question: integer('question').default(0),
  command: integer('command').default(0),
  negativeTalk: integer('negative_talk').default(0),
});

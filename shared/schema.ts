import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  image: text("image"),
  authorId: integer("author_id"),
});

export const insertEventSchema = createInsertSchema(events)
  .omit({
    id: true,
  })
  .extend({
    // Override the date field to accept ISO strings as well
    date: z.string().or(z.date()),
  });

export const eventFilterSchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
// Define a more specific type for InsertEvent that includes the date field as either Date or string
export type InsertEvent = Omit<z.infer<typeof insertEventSchema>, 'date'> & {
  date: Date | string;
};
export type Event = typeof events.$inferSelect;
export type EventFilter = z.infer<typeof eventFilterSchema>;

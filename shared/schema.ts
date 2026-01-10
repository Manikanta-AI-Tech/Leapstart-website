import { pgTable, text, serial, timestamp, jsonb, integer, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  studentName: text("student_name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  studentClass: text("student_class").notNull(),
  city: text("city").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

// Users table - stores unique user information identified by email
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  parentName: text("parent_name").notNull(),
  collegeName: text("college_name").notNull(),
  mobileNumber: text("mobile_number").notNull(),
  email: text("email").notNull().unique(), // Unique constraint at database level
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Test details table - one-to-one relationship with users
export const testDetails = pgTable("test_details", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique().references(() => users.id, { onDelete: "cascade" }), // One-to-one: unique foreign key
  answers: jsonb("answers"), // Store test answers as JSON
  score: text("score"), // Store score if needed
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTestDetailsSchema = createInsertSchema(testDetails).omit({
  id: true,
  createdAt: true,
  answers: true,
  score: true,
});

export type InsertTestDetails = z.infer<typeof insertTestDetailsSchema>;
export type TestDetails = typeof testDetails.$inferSelect;

// Define relations for Drizzle ORM querying
export const usersRelations = relations(users, ({ one }) => ({
  testDetail: one(testDetails, {
    fields: [users.id],
    references: [testDetails.userId],
  }),
}));

export const testDetailsRelations = relations(testDetails, ({ one }) => ({
  user: one(users, {
    fields: [testDetails.userId],
    references: [users.id],
  }),
}));

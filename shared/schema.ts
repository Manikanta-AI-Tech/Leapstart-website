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

export const insertBookingSchema = createInsertSchema(bookings)
  .omit({
    id: true,
    createdAt: true,
  })
  .extend({
    studentName: z.string().min(2, "Student name must be at least 2 characters").trim(),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .refine(
        (val) => {
          const cleaned = val.replace(/[\s-]/g, "").replace(/^\+91/, "");
          return /^[6-9]\d{9}$/.test(cleaned);
        },
        { message: "Please enter a valid 10-digit mobile number starting with 6-9" }
      )
      .transform((val) => val.replace(/[\s-]/g, "").replace(/^\+91/, "")),
    studentClass: z.string().min(1, "Class is required").trim(),
    city: z.string().min(2, "City must be at least 2 characters").trim(),
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

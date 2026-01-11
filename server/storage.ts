import { db } from "./db";
import { desc, eq, inArray } from "drizzle-orm";
import {
  bookings,
  type InsertBooking,
  type Booking,
  testDetails,
  type InsertTestDetails,
  type TestDetails,
  users,
  type InsertUser,
  type User
} from "@shared/schema";

export interface IStorage {
  createBooking(booking: InsertBooking): Promise<Booking>;
  getAllBookings(): Promise<Booking[]>;
  checkEmailExists(email: string): Promise<boolean>;
  createUser(user: InsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: number): Promise<User | null>;
  createTestDetails(testDetail: InsertTestDetails & { answers?: any; score?: string }): Promise<TestDetails>;
  getAllTestDetails(): Promise<Array<TestDetails & { user: User }>>;
}

export class DatabaseStorage implements IStorage {
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db
      .insert(bookings)
      .values(insertBooking)
      .returning();
    return booking;
  }

  async getAllBookings(): Promise<Booking[]> {
    return await db
      .select()
      .from(bookings)
      .orderBy(desc(bookings.createdAt));
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const normalizedEmail = email.toLowerCase().trim();
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, normalizedEmail))
      .limit(1);
    return result.length > 0;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const normalizedEmail = email.toLowerCase().trim();
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, normalizedEmail))
      .limit(1);
    return result[0] || null;
  }

  async getUserById(id: number): Promise<User | null> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    return result[0] || null;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Normalize email to lowercase and trim
    const normalizedEmail = insertUser.email.toLowerCase().trim();
    
    // Check if email already exists (application-level check)
    const exists = await this.checkEmailExists(normalizedEmail);
    if (exists) {
      throw new Error("Test has already been recorded. Please use another email.");
    }

    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        email: normalizedEmail,
      })
      .returning();
    return user;
  }

  async createTestDetails(insertTestDetail: InsertTestDetails & { answers?: any; score?: string }): Promise<TestDetails> {
    // Verify user exists and doesn't already have a test
    const existingTest = await db
      .select()
      .from(testDetails)
      .where(eq(testDetails.userId, insertTestDetail.userId))
      .limit(1);

    if (existingTest.length > 0) {
      throw new Error("Test has already been submitted for this user.");
    }

    const [testDetail] = await db
      .insert(testDetails)
      .values({
        userId: insertTestDetail.userId,
        answers: insertTestDetail.answers !== undefined ? insertTestDetail.answers : null,
        score: insertTestDetail.score || null,
      })
      .returning();
    return testDetail;
  }

  async getAllTestDetails(): Promise<Array<TestDetails & { user: User }>> {
    // Get all test details with their associated users
    const allTests = await db
      .select()
      .from(testDetails)
      .orderBy(desc(testDetails.createdAt));

    if (allTests.length === 0) {
      return [];
    }

    // Get unique user IDs
    const userIds = [...new Set(allTests.map(t => t.userId))];
    
    // Fetch all users at once using IN clause
    const allUsers = await db
      .select()
      .from(users)
      .where(inArray(users.id, userIds));
    
    const usersMap = new Map<number, User>();
    allUsers.forEach(user => {
      usersMap.set(user.id, user);
    });

    // Combine test details with user information
    return allTests
      .map(test => ({
        ...test,
        user: usersMap.get(test.userId)!,
      }))
      .filter(item => item.user !== undefined);
  }
}

export const storage = new DatabaseStorage();

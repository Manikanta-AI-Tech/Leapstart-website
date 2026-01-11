import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.bookings.create.path, async (req, res) => {
    try {
      const input = api.bookings.create.input.parse(req.body);
      const booking = await storage.createBooking(input);
      res.status(201).json(booking);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      console.error("Error creating booking:", err);
      return res.status(500).json({
        message: err instanceof Error ? err.message : "Failed to create booking",
      });
    }
  });

  app.get(api.bookings.list.path, async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.status(200).json(bookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      return res.status(500).json({
        message: err instanceof Error ? err.message : "Failed to fetch bookings",
      });
    }
  });

  // Check email and create user endpoint
  app.post(api.users.checkAndCreate.path, async (req, res) => {
    try {
      const input = api.users.checkAndCreate.input.parse(req.body);
      
      // Check if email already exists (application-level validation)
      const emailExists = await storage.checkEmailExists(input.email);
      if (emailExists) {
        return res.status(409).json({
          message: "Test has already been recorded. Please use another email.",
          email: input.email,
        });
      }

      // Create user if email doesn't exist
      const user = await storage.createUser(input);
      res.status(201).json(user);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      
      // Handle unique constraint violation (database-level check)
      if (err instanceof Error && err.message.includes("already been recorded")) {
        return res.status(409).json({
          message: err.message,
          email: req.body.email,
        });
      }

      // Handle PostgreSQL unique constraint error
      if (err && typeof err === 'object' && 'code' in err && err.code === '23505') {
        return res.status(409).json({
          message: "Test has already been recorded. Please use another email.",
          email: req.body.email,
        });
      }

      console.error("Error creating user:", err);
      return res.status(500).json({
        message: err instanceof Error ? err.message : "Failed to create user",
      });
    }
  });

  app.post(api.testDetails.create.path, async (req, res) => {
    try {
      const input = api.testDetails.create.input.parse(req.body);
      
      // Verify user exists
      const user = await storage.getUserById(input.userId);
      if (!user) {
        return res.status(404).json({
          message: "User not found. Please complete the form first.",
        });
      }

      const testDetail = await storage.createTestDetails(input);
      res.status(201).json(testDetail);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }

      // Handle duplicate test submission
      if (err instanceof Error && err.message.includes("already been submitted")) {
        return res.status(409).json({
          message: err.message,
        });
      }

      // Handle unique constraint violation for userId
      if (err && typeof err === 'object' && 'code' in err && err.code === '23505') {
        return res.status(409).json({
          message: "Test has already been submitted for this user.",
        });
      }

      console.error("Error creating test details:", err);
      return res.status(500).json({
        message: err instanceof Error ? err.message : "Failed to create test details",
      });
    }
  });

  app.get(api.testDetails.list.path, async (req, res) => {
    try {
      const allTests = await storage.getAllTestDetails();
      res.status(200).json(allTests);
    } catch (err) {
      console.error("Error fetching test details:", err);
      return res.status(500).json({
        message: err instanceof Error ? err.message : "Failed to fetch test details",
      });
    }
  });

  return httpServer;
}

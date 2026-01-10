import { z } from 'zod';
import { insertBookingSchema, bookings, insertTestDetailsSchema, testDetails, insertUserSchema, users } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  bookings: {
    create: {
      method: 'POST' as const,
      path: '/api/bookings',
      input: insertBookingSchema,
      responses: {
        201: z.custom<typeof bookings.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  users: {
    checkAndCreate: {
      method: 'POST' as const,
      path: '/api/users/check-email',
      input: insertUserSchema,
      responses: {
        201: z.custom<typeof users.$inferSelect>(),
        400: errorSchemas.validation,
        409: z.object({
          message: z.string(),
          email: z.string(),
        }),
      },
    },
  },
  testDetails: {
    create: {
      method: 'POST' as const,
      path: '/api/test-details',
      input: insertTestDetailsSchema.extend({
        userId: z.number(),
        answers: z.any().optional(),
        score: z.string().optional(),
      }),
      responses: {
        201: z.custom<typeof testDetails.$inferSelect>(),
        400: errorSchemas.validation,
        404: z.object({
          message: z.string(),
        }),
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/test-details',
      input: z.void(),
      responses: {
        200: z.array(z.any()), // Will include joined user data
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

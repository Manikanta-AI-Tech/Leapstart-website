# LeapStart School of Technology

## Overview

LeapStart is a modern educational technology website targeting intermediate (+2) students and parents focused on long-term career security in fields like CSE, AI, ML, and Data Science. The application is a full-stack React + Express project with a PostgreSQL database, featuring a booking/demo request system where prospective students can submit their information.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using functional components
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for theming (dark blue/indigo/slate tech-focused palette)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **State Management**: TanStack React Query for server state management
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers
- **Animations**: Framer Motion for scroll reveals and complex animations
- **Build Tool**: Vite with path aliases (@/ for client/src, @shared/ for shared)

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Pattern**: REST API with typed route definitions in shared/routes.ts
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod
- **Development**: tsx for running TypeScript directly, Vite dev server with HMR

### Shared Code Layer
- **Location**: `/shared` directory contains code used by both frontend and backend
- **Schema**: Database schema definitions with Drizzle, exported Zod schemas for validation
- **Routes**: Typed API route definitions with input/output schemas for type-safe API calls

### Project Structure
```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/   # React components including shadcn/ui
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities and query client
│   │   └── pages/        # Page components
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route handlers
│   ├── storage.ts    # Database operations
│   └── db.ts         # Database connection
├── shared/           # Shared code between client/server
│   ├── schema.ts     # Drizzle schema + Zod types
│   └── routes.ts     # Typed API route definitions
└── migrations/       # Drizzle database migrations
```

### Build System
- **Development**: `npm run dev` runs tsx with Vite middleware for HMR
- **Production Build**: Custom build script using esbuild for server, Vite for client
- **Database**: `npm run db:push` pushes schema changes to PostgreSQL

## External Dependencies

### Database
- **PostgreSQL**: Primary database via DATABASE_URL environment variable
- **Drizzle ORM**: Schema management and query building
- **connect-pg-simple**: Session storage (available but may not be in use)

### Key NPM Packages
- **@tanstack/react-query**: Async state management
- **framer-motion**: Animation library
- **react-hook-form**: Form management
- **zod**: Runtime type validation
- **drizzle-orm / drizzle-zod**: Database ORM and schema-to-zod generation
- **wouter**: Lightweight React router

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development banner
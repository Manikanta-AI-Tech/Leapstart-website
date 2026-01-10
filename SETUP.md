# Local Development Setup Guide

This guide will help you set up the project locally using Neon database (no local PostgreSQL installation needed).

## Prerequisites

- Node.js (v20 or higher)
- npm or pnpm
- Git
- A Neon database connection string (from your colleague)

## Step 1: Clone and Install Dependencies

```bash
# If you haven't already cloned the repo
git clone <your-repo-url>
cd Leapstart-website

# Install dependencies
npm install
# or
pnpm install
```

## Step 2: Set Up Environment Variables

1. Create a `.env` file in the root directory:

```bash
touch .env
```

2. Add your environment variables to `.env`:

```env
# Database Configuration
# Get this from your colleague - it should be a Neon connection string
# Format: postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
DATABASE_URL=postgresql://your-neon-connection-string-here

# Server Configuration
PORT=5000
NODE_ENV=development
```

**Important:** 
- The `.env` file is already in `.gitignore` - never commit it!
- Get the `DATABASE_URL` from your colleague (they should have it from Replit)

## Step 3: Push Database Schema

After setting up your `.env` file, push the database schema to your Neon database:

```bash
npm run db:push
```

This command will:
- Read your schema from `shared/schema.ts`
- Create/update tables in your Neon database
- Keep your database in sync with your schema

## Step 4: Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

## Working with Database Changes

### When you modify the schema (`shared/schema.ts`):

1. Make your changes to the schema file
2. Run `npm run db:push` to apply changes to the database
3. The changes will be reflected immediately in your Neon database

### Example workflow:

```bash
# 1. Edit shared/schema.ts (add a new column, table, etc.)
# 2. Push changes to database
npm run db:push

# 3. Start/restart your dev server
npm run dev
```

## Deployment

When you push to your repository and deploy:

1. **Make sure your deployment environment has `DATABASE_URL` set** - this should be the same Neon connection string
2. The database schema will be the same as what you've pushed locally
3. If you need to run migrations on deployment, you can add a build step:
   ```bash
   npm run db:push
   ```

## Troubleshooting

### "DATABASE_URL must be set" error
- Make sure you created a `.env` file in the root directory
- Verify the `DATABASE_URL` is correctly set in your `.env` file
- Check that the connection string is valid (starts with `postgresql://`)

### Database connection issues
- Verify your Neon connection string is correct
- Check that your Neon database is active (not paused)
- Ensure your IP is allowed (Neon usually allows all IPs by default)

### Schema changes not reflecting
- Run `npm run db:push` after making schema changes
- Check the console for any errors during the push
- Verify your `DATABASE_URL` points to the correct database

## Notes

- **No local PostgreSQL needed!** Everything works with Neon cloud database
- The `.env` file is gitignored - your secrets stay local
- All database operations use the same Neon database (shared with your colleague)
- Schema changes are applied immediately with `db:push` (no migration files needed for development)

# How to View Test Details in Database

There are **3 ways** to view the test details and user information stored in your Neon database:

## Method 1: Admin Page (Easiest - Recommended) 🎯

I've created a simple admin page for you to view all test submissions.

### Access the Admin Page:
1. Make sure your dev server is running: `npm run dev`
2. Open your browser and go to: **http://localhost:3000/admin/test-details**

### Features:
- ✅ View all test submissions in a nice card layout
- ✅ See user details: Name, Parent Name, College, Mobile, Email
- ✅ View test scores
- ✅ See test answers (expandable)
- ✅ Export data to CSV
- ✅ Refresh button to reload data
- ✅ Click on phone/email to contact users

## Method 2: Drizzle Studio (Visual Database Browser) 🗄️

Drizzle Studio provides a visual interface to browse your entire database.

### Steps:
1. Open a new terminal window
2. Run: `npm run db:studio`
3. This will open Drizzle Studio in your browser (usually at `http://localhost:4983`)
4. You'll see all your tables including:
   - `bookings` - Demo booking requests
   - `test_details` - All test submissions with user details and answers

### What you can do:
- Browse all tables
- View, edit, and delete records
- Filter and search data
- See relationships between tables

## Method 3: Direct API Call (For Developers) 🔧

You can also fetch the data programmatically using the API endpoint.

### Using Browser Console:
1. Open your website in browser
2. Open Developer Tools (F12)
3. Go to Console tab
4. Run this command:
```javascript
fetch('/api/test-details')
  .then(res => res.json())
  .then(data => console.table(data))
```

### Using curl (Terminal):
```bash
curl http://localhost:3000/api/test-details
```

### Using Postman/Insomnia:
- Method: GET
- URL: `http://localhost:3000/api/test-details`

## What Data is Stored?

For each test submission, the database stores:

1. **User Details:**
   - Name
   - Parent Name
   - College Name
   - Mobile Number
   - Email Address

2. **Test Data:**
   - All answers (as JSON)
   - Score (e.g., "12/15")
   - Submission timestamp

## Database Schema

The `test_details` table has these columns:
- `id` - Unique identifier
- `name` - Student name
- `parent_name` - Parent's name
- `college_name` - College name
- `mobile_number` - Contact number
- `email` - Email address
- `answers` - JSON object with all test answers
- `score` - Test score (e.g., "12/15")
- `created_at` - When the test was submitted

## Quick Start

**To view test data right now:**

1. **Admin Page (Easiest):**
   ```
   Open: http://localhost:3000/admin/test-details
   ```

2. **Drizzle Studio (Full Database Access):**
   ```bash
   npm run db:studio
   ```

3. **API Endpoint:**
   ```
   GET http://localhost:3000/api/test-details
   ```

## Notes

- The admin page is accessible to anyone who knows the URL. In production, you should add authentication.
- Drizzle Studio is a development tool - don't use it in production.
- All data is stored in your Neon database and persists across server restarts.

# 🔧 Quick Setup - 3 Steps Only

## Your Project Already Configured ✅
Your `.env` file has Supabase credentials:
- Project ID: `xdbtofsbfmqcrcwdmrqn`
- URL: `https://xdbtofsbfmqcrcwdmrqn.supabase.co`

## What You Need to Do

### Step 1: Go to Supabase Dashboard
**https://app.supabase.com**

Log in or create account. You should see a project called "DreamClean" (or similar).

If you DON'T see any project:
- Click **New Project**
- Name it "DreamClean"
- Choose a region
- Create project
- Copy credentials to `.env` file

### Step 2: Create Database Tables
In Supabase:
1. Click **SQL Editor** (left side)
2. Click **+ New Query**
3. Copy-paste the SQL from file: `SUPABASE_SETUP_GUIDE.md`
4. Click **Run**
5. Wait for success

### Step 3: Enable Email Auth
In Supabase:
1. Click **Authentication** (left side)
2. Click **Providers**
3. Make sure **Email** is enabled (toggle ON)

---

## Done! 

Restart your app:
```
npm run dev
```

Go to http://localhost:8080 and test:
- Sign up with any email
- Login as admin: `admin@dreamclean.com` / `admin123`
- Assign members on admin dashboard
- See everything work! ✅

---

## Still stuck?

Full guide: `SUPABASE_SETUP_GUIDE.md` in project root

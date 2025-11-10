# PlantHub 🌱

A full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) for managing and tracking plants.

---

## 📋 Prerequisites

Before you begin, make sure you have the following installed on your computer:

### Required Software

1. **Node.js and npm**
   - Download from: https://nodejs.org/
   - Install the LTS (Long Term Support) version
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```
   - You should see version numbers (e.g., v18.x.x or higher)

2. **Git**
   - Download from: https://git-scm.com/downloads
   - Verify installation:
     ```bash
     git --version
     ```

3. **MongoDB**
   - **Option A: MongoDB Compass (Recommended for beginners)**
     - Download from: https://www.mongodb.com/try/download/compass
     - Install and keep it running in the background
   
   - **Option B: MongoDB Atlas (Cloud)**
     - Create a free account at: https://www.mongodb.com/cloud/atlas/register
     - Follow the cloud setup instructions below

4. **Code Editor (Recommended)**
   - VS Code: https://code.visualstudio.com/

---

## 🚀 Getting Started

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/PlantHub.git

# Navigate into the project directory
cd PlantHub
```

---

### Step 2: Backend Setup

#### 2.1 Navigate to Backend Folder
```bash
cd backend
```

#### 2.2 Install Backend Dependencies
```bash
npm install
```

This will install all required packages:
- express (web framework)
- mongoose (MongoDB driver)
- cors (handle cross-origin requests)
- dotenv (environment variables)
- nodemon (auto-restart server during development)

#### 2.3 Create Environment File

Create a file named `.env` in the `backend` folder:

```bash
# For Windows Command Prompt
type nul > .env

# For Mac/Linux or Git Bash
touch .env
```

#### 2.4 Configure Environment Variables

Open `backend/.env` and add the following:

**For Local MongoDB:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/planthub
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/planthub?retryWrites=true&w=majority
NODE_ENV=development
```

> ⚠️ **Important:** 
> - Replace `YOUR_USERNAME` and `YOUR_PASSWORD` with your MongoDB Atlas credentials
> - Never commit the `.env` file to GitHub (it's already in `.gitignore`)

---

### Step 3: MongoDB Setup

Choose ONE of the following options:

#### Option A: Local MongoDB (Using MongoDB Compass)

1. **Open MongoDB Compass**
2. **Connect to localhost:**
   - Connection string: `mongodb://localhost:27017`
   - Click "Connect"
3. **Create Database:**
   - Click "Create Database" (+ icon)
   - Database name: `planthub`
   - Collection name: `plants`
   - Click "Create Database"

#### Option B: MongoDB Atlas (Cloud)

1. **Create Account:** https://www.mongodb.com/cloud/atlas/register
2. **Create Cluster:**
   - Choose FREE tier (M0)
   - Select region closest to you
   - Click "Create Cluster" (takes 3-5 minutes)
3. **Create Database User:**
   - Go to "Database Access" (left sidebar)
   - Click "Add New Database User"
   - Username: `planthub_user` (or your choice)
   - Password: Create strong password (save it!)
   - User Privileges: "Read and write to any database"
   - Click "Add User"
4. **Whitelist IP Address:**
   - Go to "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"
5. **Get Connection String:**
   - Go to "Database" (left sidebar)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Add to `backend/.env` as shown in Step 2.4

---

### Step 4: Frontend Setup

#### 4.1 Navigate to Frontend Folder
```bash
# From backend folder, go back to root
cd ..

# Navigate to frontend
cd frontend
```

#### 4.2 Install Frontend Dependencies
```bash
npm install
```

This will install:
- React and React DOM
- Vite (build tool)
- axios (HTTP client)
- react-router-dom (routing)

#### 4.3 Create Frontend Environment File

Create a file named `.env` in the `frontend` folder:

```bash
# For Windows Command Prompt
type nul > .env

# For Mac/Linux or Git Bash
touch .env
```

#### 4.4 Configure Frontend Environment

Open `frontend/.env` and add:

```env
VITE_API_URL=http://localhost:5000
```

> ⚠️ **Note:** In Vite, environment variables must start with `VITE_` to be accessible!

---

### Step 5: Start the Application

You need to run BOTH backend and frontend simultaneously.

#### 5.1 Start Backend Server

Open a terminal and run:

```bash
# Navigate to backend folder
cd backend

# Start the server with nodemon (auto-restart on changes)
npm run dev
```

**Expected output:**
```
[nodemon] starting `node server.js`
✅ Connected to MongoDB
✅ Server running on port 5000
```

> ✅ Keep this terminal running!

#### 5.2 Start Frontend Development Server

Open a **NEW terminal window** and run:

```bash
# Navigate to frontend folder
cd frontend

# Start Vite dev server
npm run dev
```

**Expected output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

> ✅ Keep this terminal running too!

#### 5.3 Open in Browser

Open your browser and go to: **http://localhost:5173/**

You should see:
- **PlantHub** heading
- **"Backend is working!"** message in green
- **"Frontend and Backend are connected! 🌱"**

---

## 🧪 Testing the Setup

### Test Backend Directly

Open your browser and visit these URLs:

1. **Root endpoint:** http://localhost:5000/
   - Should show: `{"message":"Welcome to PlantHub API"}`

2. **Test endpoint:** http://localhost:5000/api/test
   - Should show: `{"message":"Backend is working!","timestamp":"..."}`

### Test MongoDB Connection

1. **Open MongoDB Compass**
2. **Refresh databases** (circular arrow icon)
3. **Look for `planthub` database**
4. You should see it listed (even if empty)

---

## 📁 Project Structure

```
PlantHub/
├── backend/                 # Backend server
│   ├── node_modules/       # Backend dependencies (auto-generated)
│   ├── .env               # Environment variables (DO NOT COMMIT)
│   ├── .gitignore         # Files to ignore
│   ├── package.json       # Backend dependencies list
│   └── server.js          # Main server file
├── frontend/               # Frontend application
│   ├── node_modules/      # Frontend dependencies (auto-generated)
│   ├── public/            # Static files
│   ├── src/               # React source code
│   │   ├── config/
│   │   │   └── api.js    # Axios API configuration
│   │   ├── App.jsx       # Main React component
│   │   ├── main.jsx      # React entry point
│   │   └── App.css       # Styles
│   ├── .env              # Frontend environment variables (DO NOT COMMIT)
│   ├── index.html        # HTML entry point
│   ├── package.json      # Frontend dependencies list
│   └── vite.config.js    # Vite configuration
├── .gitignore            # Project-wide ignore file
└── README.md             # This file
```

---

## 🔧 Common Issues & Solutions

### Issue 1: "npm: command not found"

**Solution:** Node.js is not installed or not in PATH
- Reinstall Node.js from https://nodejs.org/
- Restart your terminal after installation

### Issue 2: "Port 5000 already in use"

**Solution:** Another application is using port 5000
1. Change port in `backend/.env`:
   ```env
   PORT=5001
   ```
2. Update `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:5001
   ```
3. Restart both servers

### Issue 3: "MongoDB connection error"

**Solutions:**

**For Local MongoDB:**
- Make sure MongoDB is running
- Check MongoDB Compass is connected
- Verify connection string: `mongodb://localhost:27017/planthub`

**For MongoDB Atlas:**
- Check username and password are correct
- Ensure IP address is whitelisted (or use 0.0.0.0/0 for development)
- Verify connection string format

### Issue 4: "Cannot GET /api/test" or CORS error

**Solution:** Backend server is not running
- Make sure you started the backend with `npm run dev`
- Check terminal for error messages
- Verify backend is running on http://localhost:5000

### Issue 5: "Module not found" errors

**Solution:** Dependencies not installed
```bash
# In backend folder
cd backend
npm install

# In frontend folder
cd frontend
npm install
```

### Issue 6: `.env` file not working

**Solution:** 
- Make sure `.env` is in the correct folder (`backend/.env` and `frontend/.env`)
- No spaces around `=` sign (e.g., `PORT=5000` not `PORT = 5000`)
- Restart the servers after changing `.env` files
- For Vite, variables must start with `VITE_`

---

## 🤝 Contributing & Making Pull Requests

### Step 1: Create a New Branch

**Never work directly on the `main` branch!** Always create a feature branch:

```bash
# Make sure you're on main and it's up to date
git checkout main
git pull origin main

# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Examples:
# git checkout -b feature/add-login
# git checkout -b feature/plant-detail-page
# git checkout -b bugfix/fix-navbar
```

### Step 2: Make Your Changes

1. Write your code
2. Test it thoroughly locally
3. Make sure both frontend and backend run without errors

### Step 3: Commit Your Changes

```bash
# Check what files you changed
git status

# Stage the files you want to commit
git add .
# Or add specific files:
# git add backend/server.js frontend/src/App.jsx

# Commit with a descriptive message
git commit -m "Add descriptive commit message"

# Examples of good commit messages:
# git commit -m "Add plant detail page component"
# git commit -m "Fix navbar responsive design"
# git commit -m "Implement user authentication"
```

### Step 4: Push Your Branch to GitHub

```bash
# Push your branch to GitHub
git push origin feature/your-feature-name
```

### Step 5: Create a Pull Request

1. **Go to GitHub repository** in your browser
2. **You'll see a notification** about your recently pushed branch
3. **Click "Compare & pull request"**
4. **Fill in the PR details:**
   - **Title:** Brief description of changes
   - **Description:** Explain what you changed and why
   - **Screenshots:** If you changed UI, add screenshots
5. **Click "Create Pull Request"**

### Step 6: Wait for Review

- Team members will review your code
- Make any requested changes
- Once approved, your code will be merged!

### Pull Request Template

Use this template when creating PRs:

```markdown
## Description
Brief description of what this PR does

## Changes Made
- List your changes
- Be specific about what you added/modified/deleted

## How to Test
1. Step-by-step instructions to test your changes
2. Include any setup needed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project structure
- [ ] Tested locally (both frontend and backend)
- [ ] No console errors
- [ ] Updated documentation if needed
```

---

## 📚 Useful Commands Reference

### Backend Commands
```bash
npm run dev          # Start backend with auto-restart
npm start           # Start backend normally
```

### Frontend Commands
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
```

### Git Commands
```bash
git status                              # Check current status
git add .                              # Stage all changes
git add <filename>                     # Stage specific file
git commit -m "message"                # Commit changes
git push origin <branch-name>          # Push to GitHub
git pull origin main                   # Get latest changes
git checkout -b feature/name           # Create new branch
git checkout main                      # Switch to main branch
git branch                             # List all branches
git branch -d feature/name             # Delete branch locally
```

### NPM Commands
```bash
npm install                    # Install all dependencies
npm install <package-name>     # Install specific package
npm uninstall <package-name>   # Remove package
npm update                     # Update packages
```

---

## 🐛 Debugging Tips

1. **Always check both terminals** (backend and frontend) for error messages
2. **Use `console.log()`** liberally to debug
3. **Check browser console** (F12 or Ctrl+Shift+I) for frontend errors
4. **Verify `.env` files** have correct values
5. **Restart servers** after changing `.env` files
6. **Check MongoDB Compass** to verify database connection
7. **Read error messages carefully** - they usually tell you what's wrong!

---

## 📞 Getting Help

If you're stuck:

1. **Check this README** first
2. **Search for the error message** on Google or Stack Overflow
3. **Ask your team members** on your communication platform
4. **Create an issue** on GitHub with:
   - What you were trying to do
   - What happened instead
   - Error messages (full text)
   - Screenshots if relevant

---

## 📝 Environment Variables Reference

### Backend `.env`
```env
PORT=5000                                    # Server port
MONGODB_URI=mongodb://localhost:27017/planthub   # Database connection
NODE_ENV=development                         # Environment mode
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000          # Backend URL
```

---

## 🎯 Next Steps After Setup

Once your environment is working:

1. **Explore the code** - Understand how everything connects
2. **Read the project documentation** - Check any additional docs
3. **Pick a task** - Look at issues or ask what needs to be done
4. **Create a branch** - Never work on main!
5. **Start coding** - Have fun! 🚀

---

## 📄 License

[Add your license here]

---

## 👥 Contributors

[Add contributor names here]

---

## 🙏 Acknowledgments

Built with the MERN stack:
- MongoDB - Database
- Express - Backend framework
- React - Frontend library
- Node.js - JavaScript runtime
- Vite - Build tool

---

**Happy Coding! 🌱**

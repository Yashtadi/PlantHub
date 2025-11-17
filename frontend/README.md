# Frontend setup
1. We will be using react+vite for our frontend, run the following commands in your terminal to complete the intital setup and download the required dependancies 
2. cd frontend ->npm create vite@latest . -- --template react -> npm install -> npm install react-router-dom axios
3. After this create .env and declare a new environment varibale : "VITE_API_URL=http://localhost:5000/api"
    {explain what this environment variable does}

4. Then i created some folders for the frontend inside frontend/src, namely:
    - components
    - pages
    - context
    - api
    - styles

# API configuration (frontend/src/api/axios.js)
We are using a api called axios and hence we write the code to import that and implement that in this file
Axios is a promise-based HTTP client used in full-stack websites to facilitate communication between the client-side (frontend) and the server-side (backend).
Since it is promise-based , it makes handling asynchronous HTTP requests easily.

# Context Providers (frontend/src/context/AuthContext.jsx) (frontend/src/context/CartContext.jsx)
{explain}

# Protected Route component (frontend/src/components/ProtectedRoute.jsx)
{explain}

# Navbar component (frontend/src/components/Navbar.jsx)
{explain}

# Authentication pages (frontend/src/pages/Login.jsx) (frontend/src/pages/Signup.jsx) (frontend/src/pages/ForgotPassword.jsx) (frontend/src/pages/ResetPassword.jsx)
{explain}

# Home page
{explain}

# Plant listing page with filters

1. Plant card compoent (frontend/src/components/PlantCard.jsx)
    {explain}

2. Plants page file (frontend/src/pages/Plants.jsx)
    {explain}

# Plant Details page (PlantDetails.jsx)
{explain}

# Cart Page (CartItem.jsx)
{explain}








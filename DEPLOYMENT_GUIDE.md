# 🚀 FoodMain - Complete Deployment Guide

## 📋 Project Overview
A full-stack food donation and surplus management platform built with React + Vite (frontend) and Node.js + Express + MongoDB (backend).

## ✅ Completed Tasks

### 1. Frontend-Backend Connection
- ✅ Frontend API calls configured to `http://localhost:5000/api`
- ✅ CORS configured for local development
- ✅ Socket.io integration for real-time features

### 2. Local Development Setup
- ✅ Node.js installed via winget
- ✅ Dependencies installed for both frontend and backend
- ✅ Local servers running:
  - Frontend: `http://localhost:5173`
  - Backend: `http://localhost:5000`

### 3. GitHub Repository Setup
- ✅ Repository: `https://github.com/dharani-telagamsetti/foodmain.git`
- ✅ All project files committed and pushed
- ✅ Git history maintained

### 4. Frontend Deployment (GitHub Pages)
- ✅ Built with Vite using `base: './'` for relative paths
- ✅ Deployed to `docs/` folder in repository
- ✅ GitHub Pages configured for `gh-pages` branch
- ✅ Live URL: `https://dharani-telagamsetti.github.io/foodmain/`

### 5. Backend Deployment (Railway)
**Status**: Ready for deployment

#### Railway Setup Steps:
1. Go to [Railway.app](https://railway.app) and sign in
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect to `dharani-telagamsetti/foodmain`
4. Set Root Directory to `backend`
5. Add Railway MongoDB plugin or use external MongoDB Atlas

#### Environment Variables for Railway:
```
MONGO_URI=your_mongodb_connection_string
CORS_ORIGIN=https://dharani-telagamsetti.github.io
JWT_SECRET=your_secure_jwt_secret_here
NODE_ENV=production
```

#### After Deployment:
- Railway will provide a backend URL (e.g., `https://foodmain-production.up.railway.app`)
- Update frontend's `VITE_API_BASE_URL` to the Railway URL
- Rebuild and redeploy frontend

## 🔗 Live URLs

### Current Status:
- **Frontend**: ✅ Deployed - `https://dharani-telagamsetti.github.io/foodmain/`
- **Backend**: ⏳ Ready for Railway deployment

### Final URLs (After Backend Deployment):
- **Frontend**: `https://dharani-telagamsetti.github.io/foodmain/`
- **Backend API**: `https://[your-railway-app].up.railway.app`

## 🛠️ Tech Stack

### Frontend:
- React 19 + Vite
- Tailwind CSS + Framer Motion
- Axios for API calls
- Socket.io client

### Backend:
- Node.js + Express 5
- MongoDB (Atlas or Railway)
- JWT authentication
- Socket.io for real-time
- QR code generation

## 📱 Mobile Access
Once fully deployed, access the app on mobile by opening the frontend URL in your browser.

## 🔧 Next Steps for Full Deployment

1. **Deploy Backend on Railway** (follow steps above)
2. **Update Frontend API URL**:
   ```javascript
   // In frontend/src/services/api.js
   baseURL: 'https://[your-railway-app].up.railway.app/api'
   ```
3. **Rebuild Frontend**:
   ```bash
   cd frontend
   npm run build
   ```
4. **Push Updated Frontend** to trigger GitHub Pages redeploy

## 🐛 Troubleshooting

### Frontend Issues:
- Ensure GitHub Pages source is set to `gh-pages` branch, `/` folder
- Check browser console for CORS or API errors

### Backend Issues:
- Verify environment variables in Railway
- Check Railway logs for connection errors
- Ensure MongoDB connection string is correct

### Database Issues:
- For Railway MongoDB: Use `DATABASE_URL` variable
- For Atlas: Replace `<db_password>` with actual password

## 📞 Support
If you encounter any issues, check the Railway and GitHub documentation, or provide error logs for assistance.
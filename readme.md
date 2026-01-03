
# 📇 Contact Manager - MERN Stack Web App

[![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-20-green?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-orange?style=for-the-badge&logo=mongodb)](https://mongodb.com)
[![Express.js](https://img.shields.io/badge/Express.js-4.19-red?style=for-the-badge&logo=express)](https://expressjs.com)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-blueviolet?style=for-the-badge&logo=tailwind)](https://tailwindcss.com)

A **modern, responsive Contact Management Web Application** built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). Perfect for internships, portfolios, or production-ready contact forms.

## ✨ **Demo**

> **Live Preview**: [click here](https://contact-management-n3rt.onrender.com/) 

### Screenshots

| Desktop View | Mobile View |
|--------------|-------------|
| ![Desktop](https://via.placeholder.com/1200x800/3B82F6/FFFFFF?text=Desktop+View) | ![Mobile](https://via.placeholder.com/400x800/3B82F6/FFFFFF?text=Mobile+View) |

**Replace placeholders with actual screenshots** (e.g., from `npm run build` or tools like Vercel).

## 🚀 **Features**

- **✅ Contact Form**: Client + server-side validation (name, email, phone required; email format check)
- **📋 Contact List**: Real-time fetch, optimistic updates
- **🔍 Search & Filter**: Search by name/email/phone; Sort (newest/oldest/A-Z/Z-A)
- **🎨 Dual Views**: Toggle between **Table** & **Card** layouts
- **🗑️ Delete Contacts**: Confirmation modal + optimistic UI
- **📱 Fully Responsive**: Mobile-first design (Tailwind CSS)
- **🎉 Modern UI/UX**:
  - Toast notifications
  - Skeleton loaders
  - Smooth animations & transitions
  - Empty states with illustrations
  - Gradient backgrounds & shadows
- **⚡ Performance**: useState/useEffect only (no Redux), instant UI updates
- **🔒 Secure**: Backend validation, CORS, proper error handling
- **☁️ Cloud-Ready**: MongoDB Atlas support (no local MongoDB needed)

## 🛠️ **Tech Stack**

| Frontend | Backend | Database | Styling | Other |
|----------|---------|----------|---------|-------|
| React 18+ (Vite) | Node.js + Express | MongoDB (Mongoose) | Tailwind CSS | CORS, dotenv, nodemon |

**No TypeScript, Redux, Next.js, Firebase** – Pure MERN fundamentals as per requirements.

## 📁 **Project Structure**

```
contact-manager/
├── backend/
│   ├── config/          # DB connection
│   ├── models/          # Mongoose schemas
│   ├── controllers/     # Business logic
│   ├── routes/          # API routes
│   ├── server.js        # Entry point
│   └── .env             # Environment vars
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI (Form, List, Toast, Modal)
    │   ├── api.js       # API calls
    │   ├── App.jsx      # Main app
    │   └── main.jsx     # Entry
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## 📦 **Installation & Setup**

### Prerequisites
- [Node.js](https://nodejs.org) (v18+)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier)
- [Git](https://git-scm.com)

```bash
# Clone the repo
git clone <https://github.com/owsam22/contact-management-system>
cd contact-manager

# Backend setup
cd backend
npm install

# Frontend setup
cd ../frontend
npm install
```

### Environment Variables

#### `backend/.env`
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.abcde.mongodb.net/contact_manager?retryWrites=true&w=majority
CLIENT_ORIGIN=http://localhost:5173
```

> **Get MONGO_URI**: MongoDB Atlas → Connect → Drivers → Copy & replace credentials.

#### `frontend/.env` (optional)
```env
VITE_API_BASE_URL=http://localhost:5000
```

## ▶️ **Running the Application**

1. **Start Backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```
   > `Server running on port 5000` + `MongoDB connected`

2. **Start Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```
   > Opens `http://localhost:5173`

3. **Open Browser**: `http://localhost:5173`

**Production Build**:
```bash
cd frontend
npm run build  # Creates /dist folder
```

## 🌐 **API Endpoints**

| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| `POST` | `/api/contacts`   | Create new contact      |
| `GET`  | `/api/contacts`   | Get all contacts (sorted newest first) |
| `DELETE` | `/api/contacts/:id` | Delete contact by ID |

**Example Request** (POST):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "message": "Hello!"
}
```

## 🗄️ **Database Schema**

```javascript
{
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  message: { type: String, default: "", trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

## 📱 **Responsive Design**

- **Desktop**: Side-by-side form + list (3-col grid)
- **Tablet**: Stacked with responsive tables
- **Mobile**: Full-width cards, touch-friendly buttons

## 🔧 **Troubleshooting**

| Issue | Solution |
|-------|----------|
| `querySrv ENOTFOUND` | URL-encode password (`@` → `%40`), check Atlas IP whitelist |
| CORS error | Verify `CLIENT_ORIGIN` in `.env` |
| Form not submitting | Check browser console + backend logs |
| No data in Atlas | Verify `MONGO_URI` + create `/contact_manager` DB |
| Tailwind not working | `npm install` + restart dev server |

**Logs**: Check browser DevTools (F12) & backend terminal.

## 🚀 **Deployment**

### Backend (Render/Heroku/Railway)
1. Push to GitHub.
2. Set `MONGO_URI` + `PORT` in env vars.
3. `npm start`.

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy /dist folder
```
Set `VITE_API_BASE_URL=https://your-backend.com`.

## 🤝 **Contributing**

1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit changes (`git commit -m 'Add some AmazingFeature'`).
4. Push & PR.

## 📄 **License**

This project is [MIT](LICENSE) licensed.

## 👨‍💻 **Author**

**Your Name**  
[LinkedIn](https://linkedin.com/in/samarpan22) | [Portfolio](https://owsam22.github.io/portfolio) | [GitHub](https://github.com/owsam22)

**Built for MERN Stack Internship Assessment** ⭐

---

<div align="center">
  <sub>made by sam with ☕</sub>
</div>





🌌 APOLLO FRONTEND – FULLSTACK BOOK PLATFORM (REACT + VITE)


📖 PROJECT SUMMARY
-------------------
Apollo is a full-stack book-sharing platform designed for two types of users:
1. 📚 Readers – Browse and read books via a clean and responsive UI.
2. ✍️ Publishers – Upload and manage books with file upload and metadata handling.

This frontend is built using:
- React.js + Vite
- TypeScript
- Material UI (MUI)
- Axios
- Supabase (for storage)
It connects to a REST API built with Node.js + Express, and uses Supabase for securely storing uploaded files (PDF, EPUB, Thumbnails).

🎯 KEY FEATURES
---------------
- ✅ JWT + Refresh Token–based Authentication
- ✅ Role-based Access and Redirection (Reader / Publisher)
- ✅ Book Upload (PDF/EPUB or External URL)
- ✅ Supabase Storage Integration
- ✅ Real-time Upload Progress
- ✅ Drag-and-Drop File Upload
- ✅ Responsive UI with Material UI

🔧 TECHNOLOGIES USED
---------------------
- React.js with Vite (Frontend Framework)
- TypeScript (Type Safety)
- Material UI (Component Library)
- Axios (API Communication)
- Supabase (File Storage)
- React Router DOM (Routing)
- LocalStorage (Token Management)

- ![image](https://github.com/user-attachments/assets/8e920189-d2bb-46f7-ae25-01bc080169fb)

🔐 AUTHENTICATION FLOW
-----------------------
- User logs in or registers → Receives JWT & Refresh Token
- Tokens stored in `localStorage`:
  - `token` → Access Token
  - `refreshToken` → Refresh Token
  - `user` → User object (role-based data)
- Token auto-attached in axios headers
- Role-based redirection:
  - Reader → /reader/dashboard
  - Publisher → /publisher/dashboard

📤 BOOK UPLOAD MODULE
-----------------------
Publishers can:
- Upload books via file (.pdf / .epub) OR external URL
- Upload thumbnails (with preview)
- Fill in metadata:
  - title, author, description, language, ISBN, page count, published date
- Drag-and-drop file upload with real-time progress bar
- Validation and upload status notifications

📦 SUPABASE STORAGE BUCKETS
----------------------------
- `books` → For book files (PDF / EPUB)
- `thumbnails` → For book cover images

🧾 ENVIRONMENT VARIABLES (.env)
--------------------------------

⚙️ SETUP INSTRUCTIONS
-----------------------
1. Clone the repository:
   git clone 
   cd apollo-frontend

2. Install dependencies:
   npm install

3. Create a `.env` file and add the required Supabase and API configs (see above)

4. Start the development server:
   npm run dev

5. Build for production:
   npm run build

📌 API ENDPOINTS USED
-----------------------
- POST `/auth/register` – Register user
- POST `/auth/login` – Login and receive tokens
- POST `/auth/refresh-token` – Get new access token
- POST `/books/add-book` – Upload book (multipart/form-data)
- GET `/books/list` – Fetch books for reader view (planned)

🚧 FUTURE FEATURES
-------------------
- Admin Dashboard (User + Book management)
- Built-in EPUB/PDF reader
- Reader reading progress tracker
- Ratings and review system
- Payment integration (Stripe)
- Chat or feedback via WebSocket (Socket.io)

🧪 TESTING
-----------
- All API requests tested with Postman
- Auth flow manually verified
- Token refresh logic verified on expiry
- File upload stress tested with large PDFs/EPUBs

🧑‍💻 DEVELOPED BY
------------------
- Apollo Team, 2025  
- Lead Frontend Developer: Supun Devendra 
- Email: supundevendra1207@gmail.com  


📜 LICENSE
-----------
This project is licensed under the MIT License.


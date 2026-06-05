# Mess Management System - Fixes & Reminders

This document serves as a reminder for common issues encountered during development and their solutions.

## 1. MongoDB Connection Issue (ENOTFOUND / Invalid Password)
**Issue:** The server failed to connect to MongoDB Atlas because the password contained special characters like `@`.
**Fix:** Special characters in the MongoDB URI must be **URL-encoded**.
- `@` becomes `%40`
- `:` becomes `%3A`
- `/` becomes `%2F`

**Correct URI Format in `.env`:**
```env
MONGO_URI=mongodb+srv://username:password%40withSpecialChars@cluster.mongodb.net/dbname
```

## 2. Server Startup Command
**Issue:** Using `node run dev` resulted in `MODULE_NOT_FOUND`.
**Explanation:** 
- `node` is used to run a specific JavaScript file (e.g., `node server.js`).
- `npm run` is used to execute scripts defined in the `package.json` file.

**Correct Commands:**
- **Primary:** `npm run dev` (Runs the backend with auto-restart using nodemon)
- **Shortcut:** `./dev` (I created a `dev.ps1` file for quick execution in PowerShell)

## 3. Firebase Removal
**Issue:** Project was previously using Firebase; we migrated to a custom MongoDB + Node.js backend.
**Action taken:**
- Removed `firebase` dependency from `package.json`.
- Deleted `src/firebase.js` and `firestore.rules`.
- Replaced Firebase Auth with JWT-based authentication in the custom backend.

## 4. CORS Issues
**Issue:** Frontend was unable to call backend APIs due to Cross-Origin Resource Sharing (CORS) restrictions.
**Fix:** Installed and configured the `cors` package in the backend `app.js`.

---
*Last Updated: June 5, 2026*

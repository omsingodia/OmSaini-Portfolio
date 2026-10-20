# Om Saini — MERN Portfolio

A responsive cream-and-white personal portfolio built with **React + Vite**, **Node.js + Express**, **MongoDB + Mongoose**, and **Framer Motion**. Content is based on the supplied Om Saini CV and the MERN assignment brief.

## Features
- Animated hero with typewriter text and scroll-reveal sections
- Responsive navigation and dark/light mode toggle
- Skills grouped by category with animated visual indicators
- Projects, experience timeline, education, volunteering, and certifications
- Contact form connected to `POST /api/contact`; messages are stored in MongoDB when configured
- Resume download endpoints: `GET /api/resume/pdf` and `GET /api/resume/docx`
- Health endpoint: `GET /api/health`
- Security basics: Helmet, input validation, rate limiting, environment variables, and ignored `.env` files

## Folder structure
```text
om-saini-mern-portfolio/
├── client/                 # React + Vite frontend
│   ├── public/_redirects   # SPA fallback hint for static hosting
│   └── src/
├── server/                 # Express API
│   ├── models/ContactMessage.js
│   ├── routes/contact.js
│   ├── resumes/             # Supplied DOCX and generated PDF rendition
│   ├── .env.example
│   └── index.js
└── README.md
```

## Requirements
- Node.js 20 or later recommended
- npm
- MongoDB Atlas account (or a local MongoDB server)

## Run locally
Open two terminals from the project root.

### 1. Configure the backend
```bash
cd server
npm install
```
Copy `.env.example` to `.env` and fill in your private MongoDB connection string:
- Windows PowerShell: `Copy-Item .env.example .env`
- macOS/Linux: `cp .env.example .env`

Edit `server/.env`:
```env
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb+srv://DB_USER:DB_PASSWORD@YOUR_CLUSTER.mongodb.net/om_portfolio?retryWrites=true&w=majority
```
Do not commit `.env` or share its connection string. Keep `.env.example` as a template only.
```bash
npm run dev
```
Check `http://localhost:5000/api/health`. It should report `database: "connected"` only after the database connection succeeds.

### 2. Run the frontend
In a second terminal:
```bash
cd client
npm install
```
Create `client/.env` only if the API will run at a different host:
```env
VITE_API_URL=http://localhost:5000
```
Vite proxies `/api` requests to `http://localhost:5000` by default, so local development works without `VITE_API_URL`. Set `VITE_API_URL` only when the backend is hosted at a different origin.
```bash
npm run dev
```
Open `http://localhost:5173`.

## MongoDB Atlas setup
1. Create a free MongoDB Atlas project and cluster.
2. In **Database Access**, create a database user and set a strong password.
3. In **Network Access**, add your current public IP for development. Avoid leaving broad access enabled longer than needed.
4. Open **Connect → Drivers**, choose Node.js, and copy the connection URI.
5. Replace the username, password and cluster placeholder in `server/.env`; URL-encode special characters in the password.
6. Use database name `om_portfolio` in the URI, restart the server, then check `/api/health`.
7. Submit a test message through the website. Check Atlas Data Explorer for the `contactmessages` collection.

The app deliberately does not accept or expose a database URI in the frontend. Contact messages are not readable through a public API route.

## Resume downloads
- `GET /api/resume/pdf`
- `GET /api/resume/docx`

The DOCX is the supplied CV. The PDF is a generated text rendition of that CV; review its layout and wording before submitting it as your official resume.

## Add project links and certificate links
Edit `client/src/data.js`.
- For each project, add a verified URL to `github` and `demo`.
- For each certificate, add the verified certificate URL to `link`.
- Leave unavailable links empty; the UI displays “link to add” rather than inventing a URL.

The skill-bar numbers in `data.js` are visual draft indicators only. Adjust them to accurately reflect your proficiency before submitting.

## Add a profile photo
Add your chosen image to `client/public/` (for example, `profile.jpg`) and replace the `portrait-placeholder` block in `client/src/pages/Home.jsx` with an `<img src="/profile.jpg" alt="Om Saini" />`. Add a matching CSS rule to `client/src/styles.css`.

## Deploy
### Backend — Render
1. Push this repository to a **public GitHub repository** after reviewing it.
2. Create a Render Web Service from the repository.
3. Set **Root Directory** to `server`, **Build Command** to `npm install`, and **Start Command** to `npm start`.
4. Add `MONGODB_URI`, `CLIENT_ORIGIN` (your Vercel URL), and `NODE_ENV=production` as Render environment variables.
5. Deploy, then check `https://YOUR-BACKEND.onrender.com/api/health`.

### Frontend — Vercel
1. Import the repository in Vercel.
2. Set **Root Directory** to `client`, framework preset Vite, build command `npm run build`, output directory `dist`.
3. Add `VITE_API_URL=https://YOUR-BACKEND.onrender.com` as an environment variable (no trailing slash).
4. Deploy and test the form and both CV downloads on the public site.

After deployment, update `CLIENT_ORIGIN` in Render to the exact frontend origin (no path), save and redeploy/restart the backend.

## Before submission checklist
- [ ] Add and verify project GitHub + live demo links
- [ ] Add certificate links/images if available
- [ ] Add a profile photo (if desired)
- [ ] Review the generated PDF CV
- [ ] Adjust skill-bar indicators to your real proficiency
- [ ] Run the client production build and test both CV downloads
- [ ] Configure MongoDB and test a real form submission
- [ ] Deploy frontend and backend; test public URLs
- [ ] Confirm `.env` is ignored and never committed
- [ ] Add live URLs and setup instructions to this README

## Important
This source package is prepared but **not deployed**. MongoDB is **not connected** until you configure `server/.env`. Project demo/repository and certificate links are intentionally left pending because they have not been supplied yet.

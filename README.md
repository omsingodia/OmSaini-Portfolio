# Om Saini — MERN Portfolio

A responsive personal portfolio built with **React, Vite, Node.js, Express, and MongoDB**.

## 🌐 Live Website
[**Visit My Portfolio**](https://om-saini-portfolio.vercel.app/)

## ✨ Features
- Responsive design with dark/light mode
- Animated sections and skills
- Projects, education, experience, and certifications
- Contact form connected to MongoDB
- PDF and Word CV downloads

## 🛠️ Tech Stack
React · Vite · Node.js · Express · MongoDB · Mongoose · Framer Motion

## 📁 Project Structure
- `client/` — React frontend
- `server/` — Express backend and API

## 🚀 Run Locally

**Backend**
```bash
cd server
npm install
```

Create `server/.env` using `.env.example` and configure `MONGODB_URI`, `PORT`, and `CLIENT_ORIGIN`. Then run:

```bash
npm run dev
```

**Frontend** (in a second terminal)
```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`.

## 🔗 Repository
[GitHub — OmSaini-Portfolio](https://github.com/omsingodia/OmSaini-Portfolio)

## 📌 Note
Configure the backend and MongoDB before testing the contact form and CV downloads on the live website. Never commit `.env` files.

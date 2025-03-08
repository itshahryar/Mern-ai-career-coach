# 🏆 AI Career Coach - Full Stack React (Next.js 15, Tailwind, Prisma, Clerk, Inngest, Gemini AI)

A **Full Stack AI-Powered Career Coach** built using modern technologies, helping users generate cover letters, resumes, and prepare for interviews using AI.

## 🚀 Features
- ✅ **AI-Powered Cover Letter Generator**  
- ✅ **Resume Builder with Markdown & PDF Export**  
- ✅ **AI-Generated Career Insights**  
- ✅ **Mock Interview Preparation & AI-Powered Questions**  
- ✅ **Authentication with Clerk**  
- ✅ **Database using Prisma + NeonDB**  
- ✅ **Server Actions with Inngest**  
- ✅ **Modern UI with Next.js 15 & Shadcn UI**  
- ✅ **Weekly Career Insights via Cron Jobs**  

## 🛠 Tech Stack
- **Frontend:** Next.js 15 (React 19), Tailwind CSS, Shadcn UI  
- **Backend:** Next.js API Routes, Prisma ORM, NeonDB  
- **Authentication:** Clerk  
- **AI Integration:** Gemini AI (Google's AI API)  
- **State Management:** React Hooks & Context API  
- **Server Actions:** Inngest  
- **Libraries Used:** mdEditor, html2pdf, react-recharts, date-fns  

## 📦 Installation
### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/itshahryar/Mern-ai-career-coach.git
cd Mern-ai-career-coach
```

### 2️⃣ Install Dependencies  
```sh
npm install
```

### 3️⃣ Set Up Environment Variables  
Create a `.env.local` file in the root directory and add:  
```env
DATABASE_URL=your_neon_db_connection_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
GEMINI_API_KEY=your_gemini_api_key

# Redirects users to /sign-in when they try to log in.
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# After logging in, users are redirected to /onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

### 4️⃣ Run Database Migrations  
```sh
npx prisma migrate dev
```

### 5️⃣ Start the Development Server  
```sh
npm run dev
```
Now visit **[http://localhost:3000](http://localhost:3000)** in your browser.

### 4️⃣ Screen Shots:
<img width="938" alt="1" src="https://github.com/user-attachments/assets/6bb3f20d-1e13-4960-8874-51dd7700c458" />


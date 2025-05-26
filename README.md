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

### Screen Shots:
<img width="938" alt="1" src="https://github.com/user-attachments/assets/6bb3f20d-1e13-4960-8874-51dd7700c458" />
<img width="937" alt="2" src="https://github.com/user-attachments/assets/a7e4fdac-0b39-42bf-a9c4-7a8c37af7c4a" />

Industry:
<img width="937" alt="industry 1" src="https://github.com/user-attachments/assets/a1b76b4b-2c6c-4bca-9101-95665abb56ca" />
<img width="932" alt="industry 2" src="https://github.com/user-attachments/assets/cc0bba41-b8be-40d8-8624-2b5ecefd9aff" />

Interview Prepration / Quiz:
<img width="919" alt="interview 1" src="https://github.com/user-attachments/assets/523e582e-c53a-47db-9f7b-033d40059498" />
<img width="938" alt="interview 2" src="https://github.com/user-attachments/assets/f593c38f-c896-464f-bf17-810f8e4e8ab0" />
<img width="578" alt="Quiz result" src="https://github.com/user-attachments/assets/4ca04a2b-e068-4b5c-86d1-f412910cb2bb" />
<img width="923" alt="start quiz" src="https://github.com/user-attachments/assets/38e308d8-10f5-48fa-9c67-316f45e81297" />
<img width="932" alt="quiz Questions" src="https://github.com/user-attachments/assets/c93becfa-949a-4bee-a158-8a896c4457ab" />

Resume:
<img width="932" alt="resume" src="https://github.com/user-attachments/assets/0c2a2d1a-bd74-46f4-a0d8-5eb8b63b06a5" />

Cover Letter:
<img width="921" alt="Cover Letter 1" src="https://github.com/user-attachments/assets/6c86d6dc-aed3-4407-8f67-535dbd91c279" />
<img width="934" alt="Create a cover letter" src="https://github.com/user-attachments/assets/ea9cab04-897a-42fb-9c6c-4f33ad9f2f5d" />
<img width="935" alt="View Cover Letter" src="https://github.com/user-attachments/assets/85622c0d-5dae-48f5-913f-eb557fb5f0aa" />

---

### 📝 Added Comments in My Code for Learners

- ✅ I have **added helpful comments throughout the codebase** to explain how each part works.
- 👨‍🎓 These comments are written in **simple language**, making it easier for **students and beginners** to follow along.
- 🔍 You’ll find **explanations near important logics**.
- 📚 This project is not just for use — it’s also a great resource to **learn full-stack development** with AI features!

![Learner Friendly](https://img.shields.io/badge/learner-friendly-blue)

---


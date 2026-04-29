🚀 AI Resume Enhancer (Next.js + Groq)
An AI‑powered web app that helps candidates improve their resumes with clear, actionable suggestions.
Built with Next.js 16, Tailwind CSS, and Groq LLaMA‑3 inference API.

✨ Features :-
- Upload a PDF resume or paste text directly.
- Extracts resume text automatically.
- Sends content to Groq LLaMA‑3 for enhancement.
- Displays professional suggestions for language, structure, and ATS‑friendliness.
- Secure API key management with .env.local.

🛠️ Tech Stack:-

Frontend (React + Tailwind) → clean UI for uploading or pasting resumes.
Backend (Next.js API Routes) → PDF text extraction and Groq API calls.
AI Layer (Groq LLaMA‑3) → generates professional resume suggestions.
Deployment (Vercel) → live demo link for recruiters to test instantly. 

🖥️ Frontend (Client Side)
Everything that runs in the browser — your UI and user interactions.
built it with React (via Next.js) and styled it using Tailwind CSS.
Frontend folders:
app/page.tsx → main UI page
components/ResumeInput.tsx → textarea, file upload, and button
components/Suggestions.tsx → displays AI feedback
styles/globals.css → Tailwind base styles
tailwind.config.js + postcss.config.js → Tailwind/PostCSS setup

⚙️ Backend (Server Side)
Everything that runs on the server — built it using Next.js API Routes (serverless functions) to handle logic.
Backend folders:
app/api/enhance/route.ts → calls Groq API, processes resume text
app/api/upload/route.ts → extracts text from uploaded PDF
These files act like mini server endpoints.
When you call /api/enhance or /api/upload from the frontend, Next.js runs these routes on the server.

⚙️ Setup Instructions 
1. Clone the Repository :-
git clone https://github.com/Nkita2024/resume-enhancer.git
cd resume-enhancer
2. Install Dependencies :-
npm install
npx create-next-app@latest resume-enhancer --typescript --use-npm
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
3. Add Environment Variables :-
GROQ_API_KEY=your_actual_groq_api_key_here
4. Build for Production :-
npm run build

🧩 Architecture Overview :-
resume-enhancer/
├── app/
│   ├── page.tsx                # Main UI (Frontend)
│   └── api/
│       ├── upload/route.ts     # PDF upload & text extraction (Backend)
│       └── enhance/route.ts    # Groq API call (Backend)
│
├── components/
│   ├── ResumeInput.tsx         # Textarea + file upload + button (Frontend)
│   └── Suggestions.tsx         # Displays AI feedback (Frontend)
│
├── public/                     # Static assets (logos, icons, etc.)
│
├── styles/
│   └── globals.css             # Tailwind base styles
│
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS setup for Tailwind
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
├── .env.local                  # Environment variables (ignored in Git)
├── .gitignore                  # Ignore node_modules, .env.local, etc.
└── README.md                   # Project documentation

🧑‍💻 Git Workflow :-
1. git add .
2. git commit -m "commnets"
3. git remote add origin https://github.com/yourusername/resume-enhancer.git
4. git push -u origin main

🚀 Deployment (Vercel)
1️⃣ Connect GitHub Repo
Go to Vercel.
Import your GitHub repo (resume-enhancer).
2️⃣ Configure Environment Variables
In Vercel dashboard → Project → Settings → Environment Variables.
Add:
GROQ_API_KEY=your_actual_groq_api_key_here
Scope: Production (and optionally Preview/Development).
3️⃣ Deploy
Vercel automatically builds and deploys on every push to main.
After deployment, you’ll get a live URL , for this project the url is : https://ai-powered-resume-enhancer.vercel.app/
4️⃣ Verify
Paste text or upload a PDF.
Click Enhance Resume

🚀 AI Resume Enhancer (Next.js + Groq)
An AI‑powered web app that helps candidates improve their resumes with clear, actionable suggestions.
Built with Next.js 16, Tailwind CSS, and Groq LLaMA‑3 inference API.

✨ Features :-
- Upload a PDF resume or paste text directly.
- Extracts resume text automatically.
- Ats score matching and rating your resume quality with highlight the missing skills.
- you can easily download your enhanced resume suggestion and feedback in txt format.
- Sends content to Groq LLaMA‑3 for enhancement.
- Displays professional suggestions for language, structure, and ATS‑friendliness.
- Secure API key management with .env.local.

🛠️ Tech Stack:-

Frontend (React + Tailwind) → clean UI for uploading or pasting resumes.
Backend (Next.js API Routes) → PDF text extraction and Groq API calls.
AI Layer (Groq LLaMA‑3) → generates professional resume suggestions.
Deployment (AWS EC2) → live demo link for recruiters to test instantly. 

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
. git clone https://github.com/Nkita2024/resume-enhancer.git
. cd resume-enhancer
2. Install Dependencies :-
. npm install
. npx create-next-app@latest resume-enhancer --typescript --use-npm
. npm install -D tailwindcss postcss autoprefixer
. npx tailwindcss init -p
3. Add Environment Variables :-
. GROQ_API_KEY=your_actual_groq_api_key_here
4.Git Workflow :-
. git add .
. git commit -m "commnets"
. git remote add origin https://github.com/yourusername/resume-enhancer.git
. git push -u origin main
5. Build for Production :-
. npm install
. npm run dev
. npm run build
. npm run start
6. Deployment (AWS EC2) :-
  connect your instance using -> ssh -i key.pem ubuntu@<public-ip> , inside instance run 
. sudo apt update
. curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
. sudo apt install -y nodejs
. sudo apt install -y nginx
. sudo apt install certbot python3-certbot-nginx -y
. git clone https://github.com/yourusername/resume-enhancer.git
. cd resume-enhancer
. nano .env.local
  Add: GROQ_API_KEY=your_key_here
. Reverse proxy traffic to Next.js.
  sudo apt install nginx
finally run
npm run build & npm run start
then you can assecc it from your instance public ip address .
For this project you can assecc it in your browser by  airesumeenhancer.duckdns.org

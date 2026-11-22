export const techCategories = [
  {
    id: "ai-ml",
    label: "AI & Deep Learning",
    items: [
      { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "PyTorch", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
      { name: "Scikit-Learn", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
      { name: "Pandas", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
      { name: "NumPy", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
      { name: "Matplotlib", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg" },
      { name: "Seaborn", src: "https://seaborn.pydata.org/_static/logo-wide-lightbg.svg" },
      { name: "HuggingFace", src: "https://cdn.simpleicons.org/huggingface" },
      { name: "W&B", src: "https://cdn.simpleicons.org/weightsandbiases" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "Next.js", src: "https://cdn.simpleicons.org/nextdotjs/white" },
      { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "Vue.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" },
      { name: "Tailwind", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Bootstrap", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
      { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
      { name: "Lovable", src: "https://th.bing.com/th/id/OIP.o709InyfJU_GvORAGDAHOAHaHa?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },
    ],
  },
  {
    id: "backend",
    label: "Backend & Systems",
    items: [
      { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "FastAPI", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
      { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
      { name: "Supabase", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
      { name: "Prisma", src: "https://cdn.simpleicons.org/prisma/white" },
      { name: "Redis", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
      { name: "n8n", src: "https://cdn.simpleicons.org/n8n" },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Workflow",
    items: [
      { name: "Cursor", src: "https://cdn.simpleicons.org/cursor/white" },
      { name: "VS Code", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
      { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
      { name: "Linux", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
      { name: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
      { name: "GH Actions", src: "https://cdn.simpleicons.org/githubactions" },
    ],
  },
];

export const projects = [
  {
    name: "Anivara Cinema",
    kind: "Streaming · Media",
    desc: "A premium streaming experience built with Next.js — AI-powered recommendations, watch history, voice assistance, seamless API integrations and an immersive cinematic dark interface.",
    tags: ["Next.js", "AI Recs", "Voice", "APIs"],
    href: "https://anivaratv.vercel.app",
    cta: "Visit live site",
    image: "/anivara-cinema.png",
    device: true,
    accent: "#ff4d5e",
    tone: "#1a0b0e",
    year: "2025",
  },
  {
    name: "Audixa",
    kind: "Music · Platform",
    desc: "A modern music streaming platform powered by Next.js and YouTube Music — AI-curated recommendations, voice controls and ad-free listening.",
    tags: ["Next.js", "YT Music", "Recommendation"],
    href: "https://audixa-music.vercel.app",
    cta: "Visit live site",
    image: "/audixa-music.png",
    device: true,
    accent: "#2fd3e0",
    tone: "#07171a",
    year: "2025",
  },
  {
    name: "Auxly",
    kind: "Discord Bot · Music & Fun",
    desc: "A Discord music & fun bot — crystal-clear audio playback, queue management, games and seamless controls that keep a server grooving 24/7.",
    tags: ["Discord", "Audio", "Node.js"],
    href: "https://top.gg/bot/1510901062117359656/vote",
    cta: "Vote on Top.gg",
    image: "https://cdn.discordapp.com/banners/1510901062117359656/d14a7d5f3b3bf045d28a806f7b7752f3.webp?size=1024",
    avatar:
      "https://images-ext-1.discordapp.net/external/oOcUOxV95ww-Iov3dgp7QlKoZDUiLyBxL5rT9z_TOx0/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1510901062117359656/a_c9f99ca5d1649151598ac840e74facf5.gif?width=281&height=281",
    accent: "#b583ff",
    tone: "#120c1c",
    year: "2026",
  },
  {
    name: "Music Classifier",
    kind: "Deep Learning · Audio",
    desc: "A deep-learning genre classifier built for noisy mashup environments — leveraging stem separation and synthetic audio mixtures.",
    tags: ["PyTorch", "ResNet50", "Spectrograms"],
    href: "https://23f2001705-musicclassifier.hf.space",
    cta: "Try the model",
    image: "/mussic.png",
    accent: "#ffb020",
    tone: "#1a1306",
    year: "2026",
  },
];

export const inProgress = [
  {
    name: "StudiQ Quiz",
    desc: "An intelligent education platform and interactive quiz system, built to transform how students learn and practise for exams.",
  },
  {
    name: "CogniTutor",
    desc: "A personalised AI learning platform that turns a learner's goals into structured, engaging, adaptive learning paths.",
  },
];

export const kaggleRepos = [
  {
    name: "Face Gender & Age Prediction",
    desc: "Custom CNN from scratch — predicts gender (classification) and age (regression) from face images.",
    tech: ["PyTorch", "CNN", "Computer Vision"],
    myScore: 0.75,
    topScore: 0.85,
    metric: "Accuracy",
    github: "https://github.com/coderadvikjain/face-analysis-cnn",
  },
  {
    name: "Hotel Booking Prediction",
    desc: "End-to-end ML pipeline — EDA, feature engineering, 8-model comparison with GridSearchCV tuning.",
    tech: ["Scikit-learn", "XGBoost", "Pandas"],
    myScore: 0.88,
    topScore: 0.9,
    metric: "Accuracy",
    github: "https://github.com/coderadvikjain/hotel-booking-status-prediction",
  },
  {
    name: "Sentiment Analysis NLP",
    desc: "Multi-class sentiment classification using dual TF-IDF (word + char) with a Voting Classifier ensemble.",
    tech: ["TF-IDF", "NLP", "Scikit-learn"],
    myScore: 0.638,
    topScore: 0.7,
    metric: "Accuracy",
    github: "https://github.com/coderadvikjain/sentiment-analysis-nlp",
  },
  {
    name: "Comment Category Prediction",
    desc: "80+ engineered features, dual TF-IDF, chi-squared selection — LinearSVC with class balancing.",
    tech: ["NLP", "Feature Eng.", "LinearSVC"],
    myScore: 0.836,
    topScore: 0.87,
    metric: "Macro F1",
    github: "https://github.com/coderadvikjain/comment-category-prediction",
  },
  {
    name: "Protein Structure Prediction",
    desc: "Bi-RNN, Bi-GRU and CNN-LSTM for Q3/Q8 protein secondary structure — sequence-to-sequence deep learning.",
    tech: ["PyTorch", "RNN", "LSTM"],
    myScore: 0.49,
    topScore: 0.51,
    metric: "Score",
    github: "https://github.com/coderadvikjain/protein-structure-prediction",
  },
  {
    name: "Messy Mashup Genre Classifier",
    desc: "Music genre from noisy mashups — ResNet50 on mel-spectrograms, 10 iterative experiments, heavy TTA.",
    tech: ["PyTorch", "ResNet50", "Audio ML"],
    myScore: 0.906,
    topScore: 0.99,
    metric: "Macro F1",
    github: "https://github.com/coderadvikjain/messy-mashup-genre-classification",
  },
];

export const socials = [
  { name: "GitHub", handle: "coderadvikjain", href: "https://github.com/coderadvikjain" },
  { name: "LinkedIn", handle: "jatinnahatajain", href: "https://linkedin.com/in/jatinnahatajain" },
  { name: "Kaggle", handle: "jatinnahatajain", href: "https://kaggle.com/jatinnahatajain" },
  { name: "Instagram", handle: "itz._advik17", href: "https://www.instagram.com/itz._advik17" },
  { name: "YouTube", handle: "Beyond360Travel", href: "https://www.youtube.com/@Beyond360Travel" },
  { name: "Facebook", handle: "jatinnahatajain", href: "https://facebook.com/jatinnahatajain" },
];

export const EMAIL = "advikjain24@yahoo.com";

export const navItems = [
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "work", label: "Work" },
  { id: "labs", label: "Labs" },
  { id: "likes", label: "Off-clock" },
  { id: "connect", label: "Contact" },
];

// seconds, so the hero starts right as the preloader leaves
export const INTRO_DELAY = 2.5;

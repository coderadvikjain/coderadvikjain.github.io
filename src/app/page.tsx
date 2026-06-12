"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, Variants } from "framer-motion";
import {
  Sparkles,
  Disc3,
  Film,
  ArrowUpRight,
  Hexagon,
  Code2,
  Image as ImageIcon,
  User,
  Play,
  Pause,
  Mountain,
  Gamepad2,
  Terminal,
  ChevronDown,
  Cpu,
  Activity,
  Zap,
  Mail,
  Globe,
  ExternalLink,
  Layers,
  Menu,
  X,
  Music,
  Bot,
} from "lucide-react";

import MiniGame from "./minigame";

/*SVG icons*/
const GithubIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const KaggleIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    stroke="none"
    className={className}
  >
    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-5.641-2.915 2.846v2.76c0 .188-.093.282-.281.282H4.281c-.188 0-.281-.094-.281-.282V.281C4 .093 4.093 0 4.281 0h2.258c.188 0 .281.093.281.281v15.63l8.36-8.204c.164-.187.328-.281.492-.281h3.28c.14 0 .234.047.281.14.046.07.023.164-.07.282L10.292 8.358l8.604 15.22c.093.116.07.21-.071.28z"/>
  </svg>
);

const YoutubeIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);
/*TECH STACK DATA*/
const techCategories = [
  {
    id: "ai-ml",
    label: "AI & Deep Learning",
    color: "purple",
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
    ]
  },
  {
    id: "frontend",
    label: "Frontend Architecture",
    color: "cyan",
    items: [
      { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "Next.js", src: "https://cdn.simpleicons.org/nextdotjs/white" },
      { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "Vue.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" },
      { name: "Tailwind", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Bootstrap", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
      { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
      { name: "Lovable", src: "https://th.bing.com/th/id/OIP.o709InyfJU_GvORAGDAHOAHaHa?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },
    ]
  },
  {
    id: "backend",
    label: "Backend & Systems",
    color: "green",
    items: [
      { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "FastAPI", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
      { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
      { name: "Supabase", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
      { name: "Prisma", src: "https://cdn.simpleicons.org/prisma" },
      { name: "Redis", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
      { name: "n8n", src: "https://cdn.simpleicons.org/n8n" },
    ]
  },
  {
    id: "devops",
    label: "DevOps & Workflow",
    color: "rose",
    items: [
      { name: "Cursor", src: "https://cdn.simpleicons.org/cursor/white" },
      { name: "VS Code", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
      { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
      { name: "Linux", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
      { name: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
      { name: "GH Actions", src: "https://cdn.simpleicons.org/githubactions" },
    ]
  }
];

/* ANIMATION VARIANTS */

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* MAIN COMPONENT */
export default function Home() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) =>
      setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      // Fallback to 0 if undefined
      const current = audioRef.current.currentTime || 0; 
      const total = audioRef.current.duration || 0;

      setCurrentTime(current);

      // Failsafe: Only calculate if total is a valid, positive number
      if (total > 0 && !isNaN(total)) {
        setDuration(total); // Forces duration to sync even if onLoadedMetadata missed the boat
        setProgress((current / total) * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const formatTime = (t: number) => {
    if (isNaN(t)) return "00:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const carouselRef = useRef<HTMLDivElement>(null);
  const [dragWidth, setDragWidth] = useState(0);

  useEffect(() => {
    const calc = () => {
      if (carouselRef.current)
        setDragWidth(
          carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
        );
    };
    calc();
    window.addEventListener("resize", calc);
    setTimeout(calc, 100);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const [clock, setClock] = useState("");
  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* Terminal */
  const [termInput, setTermInput] = useState("");
  const [termHistory, setTermHistory] = useState<
    { type: string; content: React.ReactNode }[]
  >([
    { type: "output", content: "Advik_OS v1.0.0 initialized." },
    {
      type: "output",
      content: "Type 'help' for a list of commands, or 'ls' to view files.",
    },
    { type: "input", content: "advik@system:~$ cat about.txt" },
    {
      type: "output",
      content:
        "I'm a full-stack developer who has turned years of freelancing into a full-time career. Beyond the screen, I am also an active trader and investor navigating the equity, debt and commodity markets, with a strong foundation in technical chart analysis and fundamental research. I specialize in developing robust, scalable architectures that handle complex operations efficiently.",
    },
  ]);
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalContainerRef.current)
      terminalContainerRef.current.scrollTop =
        terminalContainerRef.current.scrollHeight;
  }, [termHistory]);

  const handleTerminalCommand = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") return;
      const cmd = termInput.trim();
      setTermInput("");

      const newHistory = [
        ...termHistory,
        { type: "input", content: `advik@system:~$ ${cmd}` },
      ];

      if (cmd === "") {
        setTermHistory(newHistory);
        return;
      }

      const args = cmd.split(" ");
      const baseCmd = args[0].toLowerCase();

      switch (baseCmd) {
        case "help":
          newHistory.push({
            type: "output",
            content:
              "Available commands: help, clear, ls, cat [filename], whoami, resume",
          });
          break;
        case "clear":
          setTermHistory([]);
          return;
        case "ls":
          newHistory.push({
            type: "output",
            content: (
              <div className="text-cyan-400">
                about.txt   ai_module.md   philosophy.log   projects.md
              </div>
            ),
          });
          break;
        case "whoami":
          newHistory.push({
            type: "output",
            content:
              "Advik Jain — Full-Stack Developer, AI Enthusiast, & Visionary",
          });
          break;
        case "resume":
          newHistory.push({
            type: "output",
            content: (
              <span className="text-green-400">
                Initiating secure download: Advik_Jain_Resume.pdf ... [OK]
              </span>
            ),
          });
          {
            const link = document.createElement("a");
            link.href = "/resume.pdf";
            link.download = "Advik_Jain_Resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
          break;
        case "cat":
          if (args.length < 2) {
            newHistory.push({
              type: "error",
              content: "cat: missing operand. Try 'cat about.txt'",
            });
          } else {
            const file = args[1];
            if (file === "about.txt") {
              newHistory.push({
                type: "output",
                content:
                  "I'm a full-stack developer who has turned years of freelancing into a full-time career. Being a full-stack developer allows me to build both client-facing applications and the powerful backend systems that support them. I specialize in developing robust, scalable architectures that handle complex operations efficiently.",
              });
            } else if (file === "ai_module.md") {
              newHistory.push({
                type: "output",
                content: (
                  <span>
                    Recently, my core focus has expanded into Artificial
                    Intelligence. I have cultivated a deep understanding of{" "}
                    <span className="text-white font-bold">
                      Machine Learning (ML)
                    </span>{" "}
                    and{" "}
                    <span className="text-white font-bold">
                      Deep Learning (DL)
                    </span>
                    , actively training, fine-tuning, and deploying intelligent
                    models. Currently, I am channeling this expertise into
                    building{" "}
                    <span className="text-purple-300 bg-purple-950/50 px-1 border border-purple-900/50">
                      educational AI products
                    </span>
                    .
                  </span>
                ),
              });
            } else if (file === "philosophy.log") {
              newHistory.push({
                type: "output",
                content: (
                  <div className="flex flex-col gap-3 mt-2 border-l-2 border-zinc-700 pl-4 py-2 bg-black/20">
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      <span className="text-purple-400 font-bold text-xs tracking-widest uppercase block mb-1">
                        [/] The_Mission
                      </span>
                      I dream of a world with accessible, high-tier education
                      for everyone, especially kids who have the drive but lack
                      the financial means. Charity and true empowerment are my
                      ultimate endgame. I want to build things that help people.
                    </p>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      <span className="text-cyan-400 font-bold text-xs tracking-widest uppercase block mb-1">
                        [/] The_Tribe
                      </span>
                      Endless appreciation for my favorite person and those who
                      relentlessly support my vision. Great dreams require a
                      solid foundation of people who believe in them.
                    </p>
                  </div>
                ),
              });
            } else if (file === "projects.md") {
              newHistory.push({
                type: "output",
                content: "Refer to the specific UI section for Deployed.Modules and Under_Development stacks below.",
              });
            } else {
              newHistory.push({
                type: "error",
                content: `cat: ${file}: No such file or directory`,
              });
            }
          }
          break;
        default:
          newHistory.push({
            type: "error",
            content: `bash: ${baseCmd}: command not found`,
          });
      }
      setTermHistory(newHistory);
    },
    [termInput, termHistory]
  );

  const [showScroll, setShowScroll] = useState(true);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) =>
      setShowScroll(v < 0.05)
    );
    return unsub;
  }, [scrollYProgress]);

  /* Nav */
  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    ["about", "tech", "work", "likes", "gallery", "connect"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const navLink = (href: string, label: string) => {
    const id = href.replace("#", "");
    const isActive = activeSection === id;
    return (
      <a
        href={href}
        className={`text-[11px] uppercase px-3 py-1.5 transition-all duration-200 tracking-[0.2em] font-bold ${
          isActive
            ? "text-green-400 bg-green-950/40 border border-green-800/50"
            : "text-zinc-500 hover:text-white hover:bg-zinc-800 border border-transparent"
        }`}
      >
        {label}
      </a>
    );
  };

  const uptimeHours = Math.max(
    0,
    Math.floor(
      (Date.now() - new Date("2026-05-01T00:00:00Z").getTime()) / 3600000
    )
  );

  const kaggleRepos = [
  {
    name: "Face Gender & Age Prediction",
    desc: "Custom CNN from scratch — predicts gender (classification) & age (regression) from face images.",
    tech: ["PyTorch", "CNN", "Computer Vision"],
    myScore: 0.75,
    topScore: 0.85,
    metric: "Accuracy",
    github: "https://github.com/coderadvikjain/face-analysis-cnn",
    color: "purple",
  },
  {
    name: "Hotel Booking Prediction",
    desc: "End-to-end ML pipeline — EDA, feature engineering, 8 model comparison with GridSearchCV tuning.",
    tech: ["Scikit-learn", "XGBoost", "Pandas"],
    myScore: 0.88,
    topScore: 0.90,
    metric: "Accuracy",
    github: "https://github.com/coderadvikjain/hotel-booking-status-prediction",
    color: "green",
  },
  {
    name: "Sentiment Analysis NLP",
    desc: "Multi-class sentiment classification using dual TF-IDF (word + char) with Voting Classifier ensemble.",
    tech: ["TF-IDF", "NLP", "Scikit-learn"],
    myScore: 0.638,
    topScore: 0.70,
    metric: "Accuracy",
    github: "https://github.com/coderadvikjain/sentiment-analysis-nlp",
    color: "cyan",
  },
  {
    name: "Comment Category Prediction",
    desc: "80+ engineered features, dual TF-IDF, chi-squared selection — LinearSVC with class balancing.",
    tech: ["NLP", "Feature Eng.", "LinearSVC"],
    myScore: 0.836,
    topScore: 0.87,
    metric: "Macro F1",
    github: "https://github.com/coderadvikjain/comment-category-prediction",
    color: "rose",
  },
  {
    name: "Protein Structure Prediction",
    desc: "Bi-RNN, Bi-GRU & CNN-LSTM for Q3/Q8 protein secondary structure — sequence-to-sequence deep learning.",
    tech: ["PyTorch", "RNN", "LSTM"],
    myScore: 0.49,
    topScore: 0.51,
    metric: "Score",
    github: "https://github.com/coderadvikjain/protein-structure-prediction",
    color: "blue",
  },
  {
    name: "Messy Mashup Genre Classifier",
    desc: "Music genre from noisy mashups — ResNet50 on mel-spectrograms, 10 iterative experiments, heavy TTA.",
    tech: ["PyTorch", "ResNet50", "Audio ML"],
    myScore: 0.906,
    topScore: 0.99,
    metric: "Macro F1",
    github: "https://github.com/coderadvikjain/messy-mashup-genre-classification",
    color: "amber",
  },
];

  return (
    <main className="relative min-h-screen bg-[#000000] text-zinc-100 overflow-hidden font-mono selection:bg-green-500 selection:text-black">
      {/* THEME */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 mix-blend-screen">
        <motion.div
          animate={{ x: mousePos.x - 150, y: mousePos.y - 150 }}
          transition={{ type: "spring", damping: 30, stiffness: 60 }}
          className="absolute w-[300px] h-[300px] border-4 border-dashed border-green-950 bg-green-950/20"
        />
        <motion.div
          animate={{ x: mousePos.x - 80, y: mousePos.y - 80 }}
          transition={{ type: "spring", damping: 40, stiffness: 80 }}
          className="absolute w-[160px] h-[160px] border border-purple-950/60 bg-purple-950/10 rotate-45"
        />
        <div className="absolute top-[10%] right-[10%] w-[20vw] h-[20vh] border-2 border-solid border-blue-950 bg-blue-950/10" />
      </div>

      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90vw] md:w-max max-w-3xl"
      >
        {/* Main Navbar */}
        <div className="flex items-center justify-between md:justify-center gap-2 md:gap-4 px-4 md:px-6 py-2.5 bg-[#0a0a0a]/90 backdrop-blur-md border-2 border-solid border-zinc-800 shadow-[4px_4px_0px_#000]">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-green-400 flex items-center gap-2 md:pr-2">
            <Terminal size={14} />
            <span>Advik_OS</span>
          </span>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2 md:gap-4">
            <div className="h-4 w-[1px] bg-zinc-700 mx-1" />
            {navLink("#about", "About")}
            {navLink("#tech", "Tech")}
            {navLink("#work", "Work")}
            {navLink("#likes", "Like")}
            {navLink("#gallery", "Gallery")}
            {navLink("#connect", "Connect")}
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-zinc-400 hover:text-green-400 transition-colors cursor-pointer flex items-center justify-center p-1"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-3 bg-[#0a0a0a]/95 backdrop-blur-xl border-2 border-solid border-zinc-800 shadow-[4px_4px_0px_#000] flex flex-col p-2 md:hidden"
            >
              {[
                { id: "about", label: "About" },
                { id: "tech", label: "Tech" },
                { id: "work", label: "Work" },
                { id: "likes", label: "Like" },
                { id: "gallery", label: "Gallery" },
                { id: "connect", label: "Connect" },
              ].map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-[11px] uppercase px-4 py-3 transition-all duration-200 tracking-[0.2em] font-bold border-l-2 ${
                      isActive
                        ? "text-green-400 border-green-500 bg-green-950/20"
                        : "text-zinc-500 hover:text-white hover:bg-zinc-900 border-transparent"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      <motion.section
        style={{ y: yHero, opacity: opacityHero }}
        className="relative z-10 h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-950/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-purple-950/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col items-center max-w-7xl w-full"
        >
          {/* Terminal design */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-sm mb-8 flex items-center gap-2 text-zinc-500"
          >
            <span className="text-green-500 font-bold">advik@system:~$</span>{" "}
            ./ident.sh --verbose --direct
            <span className="animate-pulse inline-block w-2 h-4 bg-green-500 ml-1" />
          </motion.div>

          {/* Name + sidebars */}
          <div className="relative flex items-center justify-center gap-6 w-full font-mono">
            <motion.div
              variants={slideRight}
              initial="hidden"
              animate="visible"
              className="text-[11px] space-y-2 text-left w-48 text-zinc-600 hidden md:block"
            >
              <p className="flex items-center gap-2">
                <Activity size={10} className="text-green-500" />
                System Status: [ONLINE]
              </p>
              <p>Uptime: {uptimeHours}h</p>
              <p>Location: Gujarat, IN</p>
              <p>Kernel: Advik_OS 1.0.0</p>
            </motion.div>

            <div className="relative group flex flex-col items-center">
              <div className="absolute inset-0 border-4 border-solid border-purple-950/50 bg-purple-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -m-4 pointer-events-none" />

              <motion.h1
                animate={{
                  x: [0, -2, 2, -1, 0],
                  opacity: [0.2, 0.5, 0.3, 0.6, 0.2],
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: Math.random() * 5 + 3,
                }}
                className="absolute text-[12vw] md:text-[10vw] leading-[0.8] font-black tracking-tighter uppercase font-sans text-purple-600/20 blur-[2px]"
              >
                ADV_IK
              </motion.h1>

              <h1 className="relative text-[12vw] md:text-[10vw] leading-[0.8] font-black tracking-tighter uppercase font-sans text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400 drop-shadow-[4px_4px_0px_#a855f7]">
                ADV_IK
              </h1>
            </div>

            <motion.div
              variants={slideLeft}
              initial="hidden"
              animate="visible"
              className="text-[11px] space-y-2 text-right w-48 text-zinc-600 hidden md:block"
            >
              <p className="flex items-center gap-2 justify-end">
                <Cpu size={10} className="text-purple-500" />
                Core Directive: AI_Education
              </p>
              <p>Memory Usage: 4.19 TB</p>
              <p>System Clock: {clock}</p>
              <p>Referral Code: active/valid</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 font-mono text-center max-w-2xl bg-zinc-950/80 p-4 border-2 border-dashed border-zinc-700 shadow-[6px_6px_0px_#000]"
          >
            <span className="text-purple-400 text-xs font-bold tracking-[0.4em] uppercase block mb-3">
              // Core.Modules :: Loaded
            </span>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs md:text-sm justify-center text-zinc-300">
              {[
                "Full-Stack Architecture",
                "Machine Learning",
                "Educational Products",
                "FastAPI",
                "PyTorch",
              ].map((mod, i) => (
                <motion.span
                  key={mod}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 + i * 0.1 }}
                  className="text-zinc-300"
                >
                  &gt; {mod}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Resume */}
          <motion.a
            href="/resume.pdf"
            download="Advik_Jain_Resume.pdf"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 flex items-center gap-3 group bg-black p-3 px-8 border-2 border-solid border-green-900 hover:bg-green-950/30 hover:border-green-500 transition-all duration-300 shadow-[6px_6px_0px_#000] cursor-pointer"
          >
            <Zap
              size={14}
              className="text-green-500 group-hover:animate-pulse"
            />
            <span className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-green-500 group-hover:text-green-400">
              Download_Resume.sh
            </span>
          </motion.a>
        </motion.div>

        <AnimatePresence>
          {showScroll && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold">
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown size={14} className="text-zinc-600" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
      
      {/* ABOUT */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 md:px-6 pb-32 flex flex-col gap-20">        
        <section id="about" className="w-full flex justify-center pt-8">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="w-full md:w-[80%] max-w-4xl p-6 md:p-8 bg-zinc-950 border-2 border-dashed border-zinc-700 shadow-[6px_6px_0px_rgba(0,0,0,0.5)] flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <User className="text-purple-400" size={20} />
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold">
                Identity // System Info
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-sans font-black mb-6 uppercase tracking-tight text-white drop-shadow-[2px_2px_0px_#a855f7]">
              USER PROFILE.exe
            </h2>

            <div className="border border-zinc-800 shadow-[4px_4px_0px_#000] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 border-b border-zinc-800">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 text-[10px] text-zinc-500 uppercase tracking-widest">
                  bash — advik@system
                </span>
              </div>

              <div
                ref={terminalContainerRef}
                className="text-sm md:text-base text-zinc-300 font-mono bg-[#0a0a0a] p-4 md:p-6 flex flex-col h-[350px] overflow-y-auto cursor-text [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                onClick={() => inputRef.current?.focus()}
              >
                {termHistory.map((line, idx) => (
                  <div
                    key={idx}
                    className={`mb-3 ${
                      line.type === "error"
                        ? "text-red-400"
                        : line.type === "input"
                        ? "text-white"
                        : "text-zinc-400"
                    }`}
                  >
                    {line.type === "input" ? (
                      <span>
                        <span className="text-green-400 font-bold">
                          advik@system:~$
                        </span>{" "}
                        {(line.content as string).replace(
                          "advik@system:~$ ",
                          ""
                        )}
                      </span>
                    ) : (
                      line.content
                    )}
                  </div>
                ))}

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-green-400 font-bold shrink-0">
                    advik@system:~$
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={termInput}
                    onChange={(e) => setTermInput(e.target.value)}
                    onKeyDown={handleTerminalCommand}
                    className="bg-transparent border-none outline-none flex-1 text-zinc-100 font-mono focus:ring-0 w-full"
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>
              </div>
            </div>

            <div className="text-purple-400 text-xs mt-6 flex justify-between items-center">
              <span>&gt; [SYSTEM]: Optimized by Paneer & Lofi.</span>
              <span className="text-green-500 border border-green-500/50 bg-green-500/10 px-2 py-1 uppercase tracking-widest text-[10px] animate-pulse">
                Status: Active Shell
              </span>
            </div>
          </motion.div>
        </section>

        {/* TECH */}
        <section id="tech" className="pt-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-10 border-b border-solid border-zinc-800 pb-4"
          >
            <Layers className="text-zinc-500" size={24} />
            <h3 className="text-xs md:text-sm uppercase tracking-[0.3em] text-zinc-400 font-bold">
              Languages & Tools // System.Dependencies
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-900/20 blur-[120px] pointer-events-none" />
            {techCategories.map((category, idx) => {
              const colorMap: Record<string, { text: string; glow: string; line: string }> = {
                purple: { text: "text-purple-400", glow: "bg-purple-500/20", line: "bg-purple-500" },
                cyan: { text: "text-cyan-400", glow: "bg-cyan-500/20", line: "bg-cyan-500" },
                green: { text: "text-green-400", glow: "bg-green-500/20", line: "bg-green-500" },
                rose: { text: "text-rose-400", glow: "bg-rose-500/20", line: "bg-rose-500" },
              };
              
              const styles = colorMap[category.color] || { text: "text-zinc-400", glow: "bg-zinc-500/20", line: "bg-zinc-500" };

              return (
                <motion.div
                  key={category.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative bg-[#030303] border border-zinc-800/80 p-6 md:p-8 overflow-hidden hover:border-zinc-700 transition-colors duration-500 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
                >
                  <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                  <div className={`absolute -top-24 -right-24 w-64 h-64 ${styles.glow} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full`} />
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div>
                      <span className={`text-[10px] ${styles.text} font-mono tracking-[0.2em] uppercase mb-1.5 block`}>
                        // {category.id}.sys
                      </span>
                      <h4 className="text-xl font-sans font-black text-white uppercase tracking-tight drop-shadow-md">
                        {category.label}
                      </h4>
                    </div>
                    <div className="flex gap-1.5 mt-2">
                      <div className={`w-1.5 h-1.5 ${styles.line} animate-pulse`} />
                      <div className="w-1.5 h-1.5 bg-zinc-800" />
                      <div className="w-1.5 h-1.5 bg-zinc-800 group-hover:bg-zinc-600 transition-colors" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 relative z-10">
                    {category.items.map((tool, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2.5 px-3 py-2 bg-black/50 backdrop-blur-md border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900 transition-all duration-300 cursor-crosshair group/badge"
                      >
                        <div className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center relative">
                          <img 
                            src={tool.src} 
                            alt={tool.name} 
                            className="w-full h-full object-contain filter grayscale opacity-70 group-hover/badge:grayscale-0 group-hover/badge:opacity-100 transition-all duration-300 drop-shadow-md"
                          />
                        </div>
                        <span className="text-[10px] md:text-xs font-mono text-zinc-400 group-hover/badge:text-white uppercase tracking-wider transition-colors duration-300">
                          {tool.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full ${styles.line} transition-all duration-700 ease-in-out`} />
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* WORK / PROJECTS */}
        <section id="work" className="flex flex-col gap-10 pt-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-2 border-b border-solid border-zinc-800 pb-4"
          >
            <Code2 className="text-zinc-500" size={24} />
            <h3 className="text-xs md:text-sm uppercase tracking-[0.3em] text-zinc-400 font-bold">
              Deployed.Modules // Work
            </h3>
          </motion.div>

          {/* Anivara TV */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="w-full p-8 md:p-12 bg-black border-2 border-solid border-rose-900 relative flex flex-col md:flex-row items-center gap-10 shadow-[6px_6px_0px_rgba(0,0,0,0.5)]"
          >
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2 relative z-10"
            >
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-3 mb-4 bg-rose-950 p-2 border border-solid border-rose-800 inline-flex"
              >
                <Film className="text-rose-400" size={16} />
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-rose-400 font-bold">
                  Featured.Proj // Media
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-sans font-black uppercase mb-4 tracking-tight text-white drop-shadow-[2px_2px_0px_#e11d48]"
              >
                Anivara TV
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-sm text-zinc-300 leading-relaxed font-mono mb-6 bg-zinc-950/80 p-4 border-l-2 border-rose-900"
              >
                $ Premium media streaming experience built with Next.js —
                featuring AI-powered recommendations, watch history, voice
                assistance, seamless API integrations, and an immersive
                cinematic dark interface.
              </motion.p>
              <motion.div variants={fadeUp} className="mb-6">
                <span className="text-rose-400 text-[10px] font-bold tracking-[0.2em] border border-rose-900/50 bg-rose-950/30 px-3 py-1 uppercase animate-pulse">
                  [STATUS: ONLINE]
                </span>
              </motion.div>
              <motion.a
                variants={fadeUp}
                href="https://anivaratv.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 group/btn w-fit bg-rose-950 p-2.5 px-5 border-2 border-solid border-rose-800 hover:bg-white hover:text-black hover:border-white transition-colors shadow-[4px_4px_0px_#000]"
              >
                <span className="text-xs font-bold uppercase tracking-widest">
                  Execute Launch
                </span>
                <div className="h-6 w-6 border-2 border-solid border-rose-400 flex items-center justify-center group-hover/btn:border-black transition-colors">
                  <ArrowUpRight size={14} />
                </div>
              </motion.a>
            </motion.div>

            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full md:w-1/2 aspect-video border-2 border-solid border-rose-950 relative overflow-hidden bg-black group shadow-[8px_8px_0px_rgba(225,29,72,0.15)]"
            >
              <img
                src="/anivara.png"
                alt="Anivara TV Preview"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
              />
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(225,29,72,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(225,29,72,0.4)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              <div className="absolute inset-0 border-2 border-solid border-transparent group-hover:border-rose-500/50 transition-colors m-4 pointer-events-none" />
            </motion.div>
          </motion.div>

          {/* Audixa */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="w-full p-8 md:p-12 bg-black border-2 border-solid border-cyan-900 relative flex flex-col md:flex-row items-center gap-10 shadow-[6px_6px_0px_rgba(0,0,0,0.5)]"
          >
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2 relative z-10"
            >
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-3 mb-4 bg-cyan-950 p-2 border border-solid border-cyan-800 inline-flex"
              >
                <Music className="text-cyan-400" size={16} />
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-cyan-400 font-bold">
                  Featured.Proj // Music
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-sans font-black uppercase mb-4 tracking-tight text-white drop-shadow-[2px_2px_0px_#06b6d4]"
              >
                Audixa
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-sm text-zinc-300 leading-relaxed font-mono mb-6 bg-zinc-950/80 p-4 border-l-2 border-cyan-900"
              >
                $ Modern music streaming platform powered by Next.js and
                YouTube Music — AI-curated recommendations, voice controls,
                ad-free listening.
              </motion.p>
              <motion.div variants={fadeUp} className="mb-6">
                <span className="text-cyan-400 text-[10px] font-bold tracking-[0.2em] border border-cyan-900/50 bg-cyan-950/30 px-3 py-1 uppercase animate-pulse">
                  [STATUS: ONLINE]
                </span>
              </motion.div>
              <motion.a
                variants={fadeUp}
                href="https://audixa-music.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 group/btn w-fit bg-cyan-950 p-2.5 px-5 border-2 border-solid border-cyan-800 hover:bg-white hover:text-black hover:border-white transition-colors shadow-[4px_4px_0px_#000]"
              >
                <span className="text-xs font-bold uppercase tracking-widest">
                  Execute Launch
                </span>
                <div className="h-6 w-6 border-2 border-solid border-cyan-400 flex items-center justify-center group-hover/btn:border-black transition-colors">
                  <ArrowUpRight size={14} />
                </div>
              </motion.a>
            </motion.div>

            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full md:w-1/2 aspect-video border-2 border-solid border-cyan-950 relative overflow-hidden bg-black group shadow-[8px_8px_0px_rgba(6,182,212,0.15)]"
            >
              <img
                src="/audixa.png"
                alt="Audixa Preview"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
              />
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(6,182,212,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.4)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              <div className="absolute inset-0 border-2 border-solid border-transparent group-hover:border-cyan-500/50 transition-colors m-4 pointer-events-none" />
            </motion.div>
          </motion.div>

          {/* Auxly */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="w-full p-8 md:p-12 bg-black border-2 border-solid border-purple-900 relative flex flex-col md:flex-row items-center gap-10 shadow-[6px_6px_0px_rgba(0,0,0,0.5)]"
          >
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2 relative z-10"
            >
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-3 mb-4 bg-purple-950 p-2 border border-solid border-purple-800 inline-flex"
              >
                <Bot className="text-purple-400" size={16} />
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-purple-400 font-bold">
                  Discord.Bot // Music & Fun
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-sans font-black uppercase mb-4 tracking-tight text-white drop-shadow-[2px_2px_0px_#a855f7]"
              >
                Auxly
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-sm text-zinc-300 leading-relaxed font-mono mb-6 bg-zinc-950/80 p-4 border-l-2 border-purple-900"
              >
                $ A Discord music &amp; fun bot — crystal-clear audio playback,
                queue management, games, and seamless controls to keep your
                server grooving and entertained 24/7.
              </motion.p>
              <motion.div variants={fadeUp} className="mb-6">
                <span className="text-purple-400 text-[10px] font-bold tracking-[0.2em] border border-purple-900/50 bg-purple-950/30 px-3 py-1 uppercase animate-pulse">
                  [STATUS: ONLINE]
                </span>
              </motion.div>
              <motion.a
                variants={fadeUp}
                href="https://top.gg/bot/1510901062117359656/vote"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 group/btn w-fit bg-purple-950 p-2.5 px-5 border-2 border-solid border-purple-800 hover:bg-white hover:text-black hover:border-white transition-colors shadow-[4px_4px_0px_#000]"
              >
                <span className="text-xs font-bold uppercase tracking-widest">
                  Vote on Top.gg
                </span>
                <div className="h-6 w-6 border-2 border-solid border-purple-400 flex items-center justify-center group-hover/btn:border-black transition-colors">
                  <ArrowUpRight size={14} />
                </div>
              </motion.a>
            </motion.div>

            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full md:w-1/2 aspect-video border-2 border-solid border-purple-950 relative overflow-hidden bg-black group shadow-[8px_8px_0px_rgba(168,85,247,0.15)] flex items-center justify-center"
            >
              <img
                src="https://cdn.discordapp.com/banners/1510901062117359656/d14a7d5f3b3bf045d28a806f7b7752f3.webp?size=1024"
                alt="Auxly Banner"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-all duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-black/30" />
              <img
                src="https://images-ext-1.discordapp.net/external/oOcUOxV95ww-Iov3dgp7QlKoZDUiLyBxL5rT9z_TOx0/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1510901062117359656/a_c9f99ca5d1649151598ac840e74facf5.gif?width=281&height=281"
                alt="Auxly Bot Avatar"
                className="relative z-10 w-24 h-24 rounded-full object-cover border-4 border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.6)] group-hover:scale-105 transition-all duration-500 ease-out"
              />
              <div className="absolute inset-0 border-2 border-solid border-transparent group-hover:border-purple-500/50 transition-colors m-4 pointer-events-none" />
            </motion.div>
          </motion.div>

          {/* Music Classifier */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="w-full p-8 md:p-12 bg-black border-2 border-solid border-blue-900 relative flex flex-col md:flex-row items-center gap-10 shadow-[6px_6px_0px_rgba(0,0,0,0.5)]"
          >
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2 relative z-10"
            >
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-3 mb-4 bg-blue-950 p-2 border border-solid border-blue-800 inline-flex"
              >
                <Activity className="text-blue-400" size={16} />
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-blue-400 font-bold">
                  DL.Proj // Model
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-sans font-black uppercase mb-4 tracking-tight text-white drop-shadow-[2px_2px_0px_#3b82f6]"
              >
                Music Classifier
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-sm text-zinc-300 leading-relaxed font-mono mb-6 bg-zinc-950/80 p-4 border-l-2 border-blue-900"
              >
                $ Deep learning based music genre classifier designed for noisy
                mashup environments, leveraging stem separation and synthetic
                audio mixtures.
              </motion.p>
              <motion.div variants={fadeUp} className="mb-6">
                <span className="text-blue-400 text-[10px] font-bold tracking-[0.2em] border border-blue-900/50 bg-blue-950/30 px-3 py-1 uppercase animate-pulse">
                  [STATUS: ONLINE]
                </span>
              </motion.div>
              <motion.a
                variants={fadeUp}
                href="https://23f2001705-musicclassifier.hf.space"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 group/btn w-fit bg-blue-950 p-2.5 px-5 border-2 border-solid border-blue-800 hover:bg-white hover:text-black hover:border-white transition-colors shadow-[4px_4px_0px_#000]"
              >
                <span className="text-xs font-bold uppercase tracking-widest">
                  Execute Launch
                </span>
                <div className="h-6 w-6 border-2 border-solid border-blue-400 flex items-center justify-center group-hover/btn:border-black transition-colors">
                  <ArrowUpRight size={14} />
                </div>
              </motion.a>
            </motion.div>

            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full md:w-1/2 aspect-video border-2 border-solid border-blue-950 relative overflow-hidden bg-black group shadow-[8px_8px_0px_rgba(59,130,246,0.15)]"
            >
              <img
                src="/mussic.png"
                alt="Music Classifier Preview"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
              />
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(59,130,246,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.4)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              <div className="absolute inset-0 border-2 border-solid border-transparent group-hover:border-blue-500/50 transition-colors m-4 pointer-events-none" />
            </motion.div>
          </motion.div>

          {/* Under Development */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                color: "purple",
                hex: "#a855f7",
                name: "StudiQ Quiz",
                desc: "Intelligent educational platform and interactive quiz system. Built to transform how students learn and practice for their exams.",
                status: "UNDER_DEVELOPMENT",
              },
              {
                color: "yellow",  
                hex: "#eab308",
                name: "CogniTutor",
                desc: "Personalized AI learning platform that transforms user goals into structured, engaging, and adaptive learning experiences.",
                status: "UNDER_DEVELOPMENT",
              },
            ].map((p, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`border border-solid border-${p.color}-900/50 p-6 bg-[#0a0a0a] border-l-4 border-l-${p.color}-500 shadow-[4px_4px_0px_rgba(0,0,0,0.5)] flex flex-col justify-between`}
              >
                <div>
                  <h4
                    className={`text-sm text-${p.color}-400 font-bold uppercase tracking-[0.2em] mb-3`}
                  >
                    {p.name}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                    {p.desc}
                  </p>
                </div>
                <span className="text-[10px] text-zinc-600 mt-6 block font-bold tracking-widest uppercase">
                  [STATUS: {p.status}]
                </span>
              </motion.div>
            ))}
          </motion.div>
      
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center gap-3 mt-16 mb-2 border-b border-solid border-zinc-800 pb-4"
          >
            <Activity className="text-zinc-500" size={24} />
            <h3 className="text-xs md:text-sm uppercase tracking-[0.3em] text-zinc-400 font-bold">
              Kaggle.Notebooks // ML_Models
            </h3>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {kaggleRepos.map((repo, i) => {
              const pct = Math.round((repo.myScore / repo.topScore) * 100);

              const colorMap: Record<string, {
                border: string; text: string; bg: string; bar: string; glow: string;
              }> = {
                purple: {
                  border: "border-purple-900/60 hover:border-purple-500",
                  text: "text-purple-400",
                  bg: "bg-purple-950/30",
                  bar: "bg-purple-500",
                  glow: "shadow-[0_0_20px_rgba(168,85,247,0.1)]",
                },
                green: {
                  border: "border-green-900/60 hover:border-green-500",
                  text: "text-green-400",
                  bg: "bg-green-950/30",
                  bar: "bg-green-500",
                  glow: "shadow-[0_0_20px_rgba(34,197,94,0.1)]",
                },
                cyan: {
                  border: "border-cyan-900/60 hover:border-cyan-500",
                  text: "text-cyan-400",
                  bg: "bg-cyan-950/30",
                  bar: "bg-cyan-500",
                  glow: "shadow-[0_0_20px_rgba(6,182,212,0.1)]",
                },
                rose: {
                  border: "border-rose-900/60 hover:border-rose-500",
                  text: "text-rose-400",
                  bg: "bg-rose-950/30",
                  bar: "bg-rose-500",
                  glow: "shadow-[0_0_20px_rgba(244,63,94,0.1)]",
                },
                blue: {
                  border: "border-blue-900/60 hover:border-blue-500",
                  text: "text-blue-400",
                  bg: "bg-blue-950/30",
                  bar: "bg-blue-500",
                  glow: "shadow-[0_0_20px_rgba(59,130,246,0.1)]",
                },
                amber: {
                  border: "border-amber-900/60 hover:border-amber-500",
                  text: "text-amber-400",
                  bg: "bg-amber-950/30",
                  bar: "bg-amber-500",
                  glow: "shadow-[0_0_20px_rgba(245,158,11,0.1)]",
                },
              };

              const c = colorMap[repo.color] || colorMap.green;

              return (
                <motion.a
                  key={i}
                  variants={fadeUp}
                  href={repo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative bg-[#050505] border border-solid ${c.border} p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-[4px_4px_0px_rgba(0,0,0,0.5)] hover:${c.glow} overflow-hidden min-h-[260px]`}
                >
                  {/* Grid background */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[9px] ${c.text} font-bold tracking-[0.2em] uppercase ${c.bg} border border-current/20 px-2 py-0.5`}>
                        // kaggle
                      </span>
                      <GithubIcon size={14} className="text-zinc-700 group-hover:text-white transition-colors" />
                    </div>

                    {/* Title */}
                    <h4 className="text-sm font-sans font-black uppercase tracking-tight text-white mb-2 leading-tight group-hover:drop-shadow-md transition-all">
                      {repo.name}
                    </h4>

                    {/* Description */}
                    <p className="text-[11px] text-zinc-500 font-mono leading-relaxed mb-4">
                      {repo.desc}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {repo.tech.map((t, j) => (
                        <span
                          key={j}
                          className="text-[9px] font-mono text-zinc-600 border border-zinc-800 px-1.5 py-0.5 uppercase tracking-wider group-hover:text-zinc-400 group-hover:border-zinc-700 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Score bar */}
                  <div className="relative z-10">
                    <div className="flex justify-between items-end mb-1.5">
                      <span className="text-[10px] font-mono font-bold text-zinc-400">
                        {repo.metric}
                      </span>
                      <div className="flex items-center gap-3 text-[10px] font-mono">
                        <span className={`${c.text} font-bold`}>
                          Mine: {repo.myScore}
                        </span>
                        <span className="text-zinc-600">
                          Top: {repo.topScore}
                        </span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-[6px] bg-zinc-900 border border-zinc-800 relative overflow-hidden">
                      <div
                        className={`absolute inset-y-0 left-0 ${c.bar} transition-all duration-700 ease-out`}
                        style={{ width: `${pct}%` }}
                      />
                      {/* Top score marker */}
                      <div className="absolute inset-y-0 right-0 w-[2px] bg-white/30" />
                    </div>

                    <div className="flex justify-between mt-1">
                      <span className="text-[9px] font-mono text-zinc-700">0</span>
                      <span className={`text-[9px] font-mono ${c.text} font-bold`}>
                        {pct}% of top
                      </span>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full ${c.bar} transition-all duration-500 ease-out`} />
                </motion.a>
              );
            })}
          </motion.div>
        </section>
        

        {/* CORRZEN LABS */}
        <section id="labs" className="pt-10">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="w-full p-8 md:p-12 bg-[#050505] border-2 border-dashed border-green-900 relative overflow-hidden group shadow-[6px_6px_0px_rgba(255,255,255,0.08)]"
          >
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(34,197,94,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.2)_1px,transparent_1px)] bg-[size:16px_16px]" />
            <div className="absolute -bottom-20 -right-20 opacity-5 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
              <Hexagon
                size={350}
                strokeWidth={0.2}
                className="text-green-500 animate-[spin_40s_linear_infinite]"
              />
            </div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative z-10 md:w-[85%]"
            >
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-3 mb-5 bg-green-950/50 p-2 border border-solid border-green-800 inline-flex"
              >
                <Sparkles className="text-green-400" size={16} />
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-green-400 font-bold">
                  Startup_OS // R&D Division
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-sans font-black mb-6 uppercase tracking-tight text-white drop-shadow-[2px_2px_0px_#22c55e]"
              >
                CorrZen Labs
              </motion.h2>

              <motion.div variants={fadeUp} className="space-y-4 font-mono">
                <p className="text-sm text-zinc-300 leading-relaxed bg-black/80 p-5 border border-solid border-green-900/50 shadow-[4px_4px_0px_#000]">
                  &gt; An independent research and development ecosystem.
                  CorrZen Labs is where complex backend engineering meets
                  futuristic digital design. I am pioneering high-performance
                  infrastructure, integrating AI pipelines, and experimenting
                  with next-generation web platforms to engineer scalable
                  digital experiences.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.p
                    variants={fadeUp}
                    className="text-xs md:text-sm text-zinc-400 leading-relaxed bg-black/80 p-4 border border-solid border-zinc-800 border-l-4 border-l-green-500 shadow-[4px_4px_0px_#000]"
                  >
                    <span className="text-green-400 font-bold uppercase tracking-widest text-[10px] block mb-2">
                      [/] Core_Architecture
                    </span>
                    Designing distributed backend systems and predictive ML
                    pipelines that act as the unseen, high-velocity engine for
                    modern B2C applications.
                  </motion.p>
                  
                  <motion.p
                    variants={fadeUp}
                    className="text-xs md:text-sm text-zinc-400 leading-relaxed bg-black/80 p-4 border border-solid border-zinc-800 border-l-4 border-l-amber-500 shadow-[4px_4px_0px_#000]"
                  >
                    <span className="text-amber-500 font-bold uppercase tracking-widest text-[10px] block mb-2">
                      [/] Active_Build: Audixa
                    </span>
                    Currently architecting a modern, high-performance music
                    streaming platform. Designing AI-curated recommendation
                    pipelines and seamless playback systems.
                  </motion.p>
                </div>

                {/* ─ Custom CTA Button ─ */}
                <motion.div variants={fadeUp} className="pt-4">
                  <a
                    href="https://corrzenlabs.vercel.app/connect"
                    className="inline-flex items-center gap-3 group/btn w-fit bg-green-950/20 p-3 px-6 border-2 border-solid border-green-900 hover:bg-green-500 hover:border-green-500 transition-colors shadow-[4px_4px_0px_#000] cursor-pointer"
                  >
                    <Terminal size={16} className="text-green-500 group-hover/btn:text-black transition-colors" />
                    <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-green-500 group-hover/btn:text-black transition-colors">
                      Connect_To_CorrZen.sh
                    </span>
                  </a>
                </motion.div>

              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* WHAT I LIKE */}
        <section id="likes" className="pt-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center mb-10 border-t border-zinc-900 pt-16"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-bold mb-3"
            >
              // Visual.Freq.db
            </motion.span>
          </motion.div>

          <motion.div
            ref={carouselRef}
            className="w-full overflow-hidden cursor-grab active:cursor-grabbing pb-12 pt-4 -mt-4"
          >
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -dragWidth }}
              dragElastic={0.1}
              className="flex items-center w-max pl-4 md:pl-12 pr-[15vw]"
            >
              {/* Card 1 */}
              <motion.div
                initial={{ rotate: -5 }}
                whileHover={{ rotate: 0, y: -15, zIndex: 50, scale: 1.05 }}
                transition={{ duration: 0.15, ease: "backOut" }}
                className="w-[80vw] md:w-[340px] shrink-0 p-6 bg-black border-2 border-solid border-cyan-800 drop-shadow-[6px_6px_0px_rgba(6,182,212,0.15)] z-10 relative overflow-hidden h-[300px] flex flex-col justify-between group/card"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 border-2 border-solid border-cyan-950 bg-cyan-950/20 pointer-events-none" />

                <div className="flex justify-between items-start mb-4 relative z-10 pointer-events-none">
                  <Mountain className="text-cyan-500" size={28} />
                  <div className="w-14 h-14 border-2 border-solid border-cyan-800 p-1 bg-black shrink-0 shadow-[4px_4px_0px_rgba(6,182,212,0.3)]">
                    <img
                      src="https://tse3.mm.bing.net/th/id/OIP._SnsAlV-OLiK9DXyAOU7pgHaFZ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                      alt="Gilgit Mountains"
                      className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>

                <div className="text-zinc-100 relative z-10">
                  <p className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-1 pointer-events-none">
                    / Destination /
                  </p>
                  <h4 className="text-3xl font-sans font-black uppercase mb-2 tracking-tight drop-shadow-[2px_2px_0px_#06b6d4] pointer-events-none">
                    Gilgit
                  </h4>
                  <ul className="text-zinc-300 text-xs space-y-1.5 font-mono mb-4 pointer-events-none">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-500" /> High Altitudes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-500" /> Mountainscapes
                    </li>
                  </ul>
                  <a
                    href="https://maps.app.goo.gl/D9u2SPbYddHfsrN17"
                    target="_blank"
                    rel="noopener noreferrer"
                    onPointerDown={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 bg-cyan-950/30 border border-solid border-cyan-800 p-2 px-3 hover:bg-cyan-500 hover:text-black transition-colors shadow-[4px_4px_0px_rgba(6,182,212,0.2)] cursor-pointer active:translate-y-1"
                  >
                    <span className="w-1.5 h-1.5 bg-cyan-400 animate-pulse" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">
                      // Open_Map.exe
                    </span>
                  </a>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                initial={{ rotate: -2 }}
                whileHover={{ rotate: 0, y: -15, zIndex: 50, scale: 1.05 }}
                transition={{ duration: 0.15, ease: "backOut" }}
                className="w-[80vw] md:w-[340px] shrink-0 p-6 bg-black border-2 border-solid border-rose-800 drop-shadow-[6px_6px_0px_rgba(225,29,72,0.15)] z-20 md:-ml-20 relative overflow-hidden h-[300px] flex flex-col justify-between group/card"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 border-2 border-solid border-rose-950 bg-rose-950/20 pointer-events-none" />

                <div className="flex justify-between items-start mb-4 relative z-10 pointer-events-none">
                  <Gamepad2 className="text-rose-500" size={28} />
                  <div className="w-14 h-14 border-2 border-solid border-rose-800 p-1 bg-black shrink-0 shadow-[4px_4px_0px_rgba(225,29,72,0.3)]">
                    <img
                      src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop"
                      alt="PUBG Gameplay"
                      className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>

                <div className="text-zinc-100 relative z-10">
                  <p className="text-rose-400 text-[10px] font-bold tracking-widest uppercase mb-1 pointer-events-none">
                    / Battle Royale /
                  </p>
                  <h4 className="text-3xl font-sans font-black uppercase mb-2 tracking-tight drop-shadow-[2px_2px_0px_#e11d48] pointer-events-none">
                    PUBG
                  </h4>
                  <ul className="text-zinc-300 text-xs space-y-1.5 font-mono mb-4 pointer-events-none">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-rose-500" /> Erangel Drops
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-rose-500" /> Tactical Survival
                    </li>
                  </ul>
                  <a
                    href="https://pubg.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onPointerDown={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 bg-rose-950/30 border border-solid border-rose-800 p-2 px-3 hover:bg-rose-500 hover:text-black transition-colors shadow-[4px_4px_0px_rgba(225,29,72,0.2)] cursor-pointer active:translate-y-1"
                  >
                    <span className="w-1.5 h-1.5 bg-rose-400 animate-pulse" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">
                      // Play_Now.exe
                    </span>
                  </a>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                initial={{ rotate: 2 }}
                whileHover={{ rotate: 0, y: -15, zIndex: 50, scale: 1.05 }}
                transition={{ duration: 0.15, ease: "backOut" }}
                className="w-[80vw] md:w-[340px] shrink-0 p-6 bg-black border-2 border-solid border-purple-900 drop-shadow-[6px_6px_0px_rgba(168,85,247,0.15)] z-30 md:-ml-20 relative overflow-hidden h-[300px] flex flex-col justify-between group/card"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 border-2 border-solid border-purple-950 bg-purple-950/20 pointer-events-none" />

                <div className="flex justify-between items-start mb-4 relative z-10 pointer-events-none">
                  <Film className="text-purple-500" size={28} />
                  <div className="w-14 h-14 border-2 border-solid border-purple-800 p-1 bg-black shrink-0 shadow-[4px_4px_0px_rgba(168,85,247,0.3)]">
                    <img
                      src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&h=200&fit=crop"
                      alt="Cinema Reel"
                      className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>

                <div className="text-zinc-100 relative z-10">
                  <p className="text-purple-400 text-[10px] font-bold tracking-widest uppercase mb-1 pointer-events-none">
                    / Favorite Movie /
                  </p>
                  <h4 className="text-2xl font-sans font-black uppercase mb-2 tracking-tight drop-shadow-[2px_2px_0px_#a855f7] pointer-events-none">
                    Sita Ramam
                  </h4>
                  <ul className="text-zinc-300 text-xs space-y-1.5 font-mono mb-4 pointer-events-none">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-500" /> Dir: Hanu Raghavapudi
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-500" /> Romance // Drama // War
                    </li>
                  </ul>
                  <a
                    href="https://youtu.be/PFcE1Rw5lmo?si=AWyaKHTsdIYffYsn"
                    target="_blank"
                    rel="noopener noreferrer"
                    onPointerDown={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 bg-purple-950/30 border border-solid border-purple-800 p-2 px-3 hover:bg-purple-500 hover:text-black transition-colors shadow-[4px_4px_0px_rgba(168,85,247,0.2)] cursor-pointer active:translate-y-1"
                  >
                    <span className="w-1.5 h-1.5 bg-purple-400 animate-pulse" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">
                      // Watch_Trailer.mp4
                    </span>
                  </a>
                </div>
              </motion.div>

              {/* Card 4 */}
              <motion.div
                initial={{ rotate: 5 }}
                whileHover={{ rotate: 0, y: -15, zIndex: 50, scale: 1.05 }}
                transition={{ duration: 0.15, ease: "backOut" }}
                className="w-[80vw] md:w-[340px] shrink-0 p-6 bg-black border-2 border-solid border-green-800 drop-shadow-[6px_6px_0px_rgba(34,197,94,0.15)] z-40 md:-ml-20 relative overflow-hidden h-[300px] flex flex-col justify-between group/card"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 border-2 border-solid border-green-950 bg-green-950/20 pointer-events-none" />

                <div className="flex justify-between items-start mb-4 relative z-10 pointer-events-none">
                  <Disc3
                    className={`text-green-400 ${
                      isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
                    }`}
                    size={28}
                  />
                  <div className="w-14 h-14 border-2 border-solid border-green-800 p-1 bg-black shrink-0 shadow-[4px_4px_0px_rgba(34,197,94,0.3)]">
                    <img
                      src="https://lh3.googleusercontent.com/UOY2VeiYo2WNdKr2JKYPHYFmWOrY3UQ6kr6haU4IleuP-6k9nWgpv-d7cZZ4plUTHiDQzWmnfm2PUPqY"
                      alt="Kajra Re"
                      className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>

                <div className="relative z-10 text-white">
                  <audio
                    ref={audioRef}
                    src="/songs.m4a"
                    loop
                    preload="metadata"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                  />

                  <p className="text-green-400 text-[10px] font-bold tracking-widest uppercase mb-1 pointer-events-none">
                    / Audio.Amp /
                  </p>
                  <h4 className="text-3xl font-sans font-black uppercase mb-1 truncate pointer-events-none drop-shadow-[2px_2px_0px_#22c55e]">
                    Dekhha tenu
                  </h4>
                  <p className="text-xs text-zinc-400 mb-4 truncate pointer-events-none font-mono">
                    Station: Audixa // 99.9fm
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={togglePlay}
                      className="h-10 w-10 bg-green-500 text-black flex items-center justify-center hover:bg-white transition-colors shrink-0 cursor-pointer border-2 border-solid border-green-800 active:translate-y-1"
                    >
                      {isPlaying ? (
                        <Pause size={18} fill="black" />
                      ) : (
                        <Play size={18} className="ml-1" fill="black" />
                      )}
                    </button>

                    <div className="flex-1 flex flex-col gap-1.5 pointer-events-none">
                      <div className="w-full h-[4px] bg-green-950 relative overflow-hidden border border-solid border-green-800">
                        <div
                          className="absolute inset-y-0 left-0 bg-green-400 transition-all duration-100 ease-linear"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between w-full text-[9px] font-mono font-bold text-green-500 tracking-widest">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="w-12 shrink-0 md:hidden" />
            </motion.div>
          </motion.div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="pt-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8 border-b border-solid border-zinc-800 pb-4"
          >
            <ImageIcon className="text-zinc-500" size={24} />
            <h3 className="text-xs md:text-sm uppercase tracking-[0.3em] text-zinc-400 font-bold">
              Visual Fragments // raw.buffer
            </h3>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {[
              { src: "/gallery1.jpg", offset: "md:mt-8", caption: "SYS.FRAG_01" },
              { src: "/gallery2.png", offset: "", caption: "SYS.FRAG_02" },
              { src: "/gallery3.jpg", offset: "md:mt-8", caption: "SYS.FRAG_03" },
              { src: "/gallery4.jpg", offset: "", caption: "SYS.FRAG_04" },
            ].map((img, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "backOut" }}
                className={`aspect-[3/4] bg-black border-2 border-solid border-zinc-700 relative overflow-hidden ${img.offset} group shadow-[4px_4px_0px_#000]`}
              >
                <img
                  src={img.src}
                  alt={`Visual Fragment ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                
                {/* Caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-300 uppercase block">
                    {img.caption}
                  </span>
                </div>

                {/* CRT scanlines */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[size:100%_4px] pointer-events-none z-10" />
                {/* Flash overlay */}
                <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors duration-300 z-10 pointer-events-none" />
                {/* Hover frame */}
                <div className="absolute inset-2 border border-solid border-transparent group-hover:border-white/20 transition-colors duration-300 z-10 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CONNECT / SOCIALS */}
        <section id="connect" className="pt-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8 border-b border-solid border-zinc-800 pb-4"
          >
            <Globe className="text-zinc-500" size={24} />
            <h3 className="text-xs md:text-sm uppercase tracking-[0.3em] text-zinc-400 font-bold">
              Network.Ports // Open Connections
            </h3>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          >
            {/* GitHub */}
            <motion.a
              variants={fadeUp}
              href="https://github.com/coderadvikjain"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="md:col-span-2 group relative overflow-hidden bg-[#050505] border-2 border-dashed border-green-900 p-6 md:p-8 shadow-[4px_4px_0px_rgba(34,197,94,0.1)] flex items-center gap-6 cursor-pointer transition-colors hover:border-green-500"
            >
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity bg-[linear-gradient(rgba(34,197,94,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.3)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

              <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 bg-green-950/40 border-2 border-solid border-green-800 flex items-center justify-center shrink-0 group-hover:bg-green-500 group-hover:border-green-400 transition-all duration-300">
                <GithubIcon
                  size={24}
                  className="text-green-400 group-hover:text-black transition-colors duration-300 md:w-8 md:h-8"
                />
              </div>

              <div className="relative z-10 flex-1">
                <span className="text-green-400 text-[10px] font-bold tracking-widest uppercase block mb-1">
                  // Primary_Repo
                </span>
                <h4 className="text-xl md:text-2xl font-sans font-black uppercase tracking-tight text-white mb-1.5 drop-shadow-[2px_2px_0px_#22c55e]">
                  GitHub
                </h4>
                <p className="text-xs md:text-sm text-zinc-400 font-mono leading-relaxed">
                  $ Browse source code, open-source contributions, and project repositories.
                </p>
              </div>

              <div className="relative z-10 hidden md:flex items-center gap-2 text-zinc-600 group-hover:text-green-400 transition-colors">
                <span className="text-[10px] uppercase tracking-widest font-bold">
                  Open
                </span>
                <ExternalLink size={14} />
              </div>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              variants={fadeUp}
              href="https://linkedin.com/in/jatinnahatajain"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden bg-black border-2 border-solid border-blue-900 p-5 md:p-6 shadow-[4px_4px_0px_rgba(59,130,246,0.1)] flex items-center gap-5 cursor-pointer transition-colors hover:border-blue-500"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-solid border-blue-950 bg-blue-950/20 pointer-events-none" />

              <div className="relative z-10 w-12 h-12 bg-blue-950/40 border-2 border-solid border-blue-800 flex items-center justify-center shrink-0 group-hover:bg-blue-500 group-hover:border-blue-400 transition-all duration-300">
                <LinkedinIcon
                  size={20}
                  className="text-blue-400 group-hover:text-black transition-colors duration-300"
                />
              </div>

              <div className="relative z-10 flex-1 min-w-0">
                <span className="text-blue-400 text-[9px] font-bold tracking-widest uppercase block mb-1">
                  // Professional
                </span>
                <h4 className="text-lg font-sans font-black uppercase tracking-tight text-white drop-shadow-[2px_2px_0px_#3b82f6]">
                  LinkedIn
                </h4>
                <p className="text-[11px] text-zinc-500 font-mono mt-1 truncate">
                  Career & network
                </p>
              </div>

              <ExternalLink
                size={14}
                className="relative z-10 text-zinc-700 group-hover:text-blue-400 transition-colors shrink-0"
              />
            </motion.a>

            {/* Instagram */}
            <motion.a
              variants={fadeUp}
              href="https://www.instagram.com/itz._advik17` "
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden bg-black border-2 border-solid border-pink-900 p-5 md:p-6 shadow-[4px_4px_0px_rgba(236,72,153,0.1)] flex items-center gap-5 cursor-pointer transition-colors hover:border-pink-500"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-solid border-pink-950 bg-pink-950/20 pointer-events-none" />

              <div className="relative z-10 w-12 h-12 bg-pink-950/40 border-2 border-solid border-pink-800 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-amber-500 group-hover:border-pink-400 transition-all duration-300">
                <InstagramIcon
                  size={20}
                  className="text-pink-400 group-hover:text-white transition-colors duration-300"
                />
              </div>

              <div className="relative z-10 flex-1 min-w-0">
                <span className="text-pink-400 text-[9px] font-bold tracking-widest uppercase block mb-1">
                  // Visual_Feed
                </span>
                <h4 className="text-lg font-sans font-black uppercase tracking-tight text-white drop-shadow-[2px_2px_0px_#ec4899]">
                  Instagram
                </h4>
                <p className="text-[11px] text-zinc-500 font-mono mt-1 truncate">
                  Photos & stories
                </p>
              </div>

              <ExternalLink
                size={14}
                className="relative z-10 text-zinc-700 group-hover:text-pink-400 transition-colors shrink-0"
              />
            </motion.a>

            {/* Facebook */}
            <motion.a
              variants={fadeUp}
              href="https://facebook.com/jatinnahatajain"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden bg-black border-2 border-solid border-sky-900 p-5 md:p-6 shadow-[4px_4px_0px_rgba(14,165,233,0.1)] flex items-center gap-5 cursor-pointer transition-colors hover:border-sky-500"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-solid border-sky-950 bg-sky-950/20 pointer-events-none" />

              <div className="relative z-10 w-12 h-12 bg-sky-950/40 border-2 border-solid border-sky-800 flex items-center justify-center shrink-0 group-hover:bg-sky-500 group-hover:border-sky-400 transition-all duration-300">
                <FacebookIcon
                  size={20}
                  className="text-sky-400 group-hover:text-black transition-colors duration-300"
                />
              </div>

              <div className="relative z-10 flex-1 min-w-0">
                <span className="text-sky-400 text-[9px] font-bold tracking-widest uppercase block mb-1">
                  // Social_Net
                </span>
                <h4 className="text-lg font-sans font-black uppercase tracking-tight text-white drop-shadow-[2px_2px_0px_#0ea5e9]">
                  Facebook
                </h4>
                <p className="text-[11px] text-zinc-500 font-mono mt-1 truncate">
                  Updates & community
                </p>
              </div>

              <ExternalLink
                size={14}
                className="relative z-10 text-zinc-700 group-hover:text-sky-400 transition-colors shrink-0"
              />
            </motion.a>
            

             {/* Kaggle */}
            <motion.a
              variants={fadeUp}
              href="https://kaggle.com/jatinnahatajain"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden bg-black border-2 border-solid border-cyan-900 p-5 md:p-6 shadow-[4px_4px_0px_rgba(6,182,212,0.1)] flex items-center gap-5 cursor-pointer transition-colors hover:border-cyan-500"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-solid border-cyan-950 bg-cyan-950/20 pointer-events-none" />

              <div className="relative z-10 w-12 h-12 bg-cyan-950/40 border-2 border-solid border-cyan-800 flex items-center justify-center shrink-0 group-hover:bg-cyan-500 group-hover:border-cyan-400 transition-all duration-300">
                <KaggleIcon
                  size={20}
                  className="text-cyan-400 group-hover:text-black transition-colors duration-300"
                />
              </div>

              <div className="relative z-10 flex-1 min-w-0">
                <span className="text-cyan-400 text-[9px] font-bold tracking-widest uppercase block mb-1">
                  // ML_Platform
                </span>
                <h4 className="text-lg font-sans font-black uppercase tracking-tight text-white drop-shadow-[2px_2px_0px_#06b6d4]">
                  Kaggle
                </h4>
                <p className="text-[11px] text-zinc-500 font-mono mt-1 truncate">
                  Notebooks & Datasets
                </p>
              </div>

              <ExternalLink
                size={14}
                className="relative z-10 text-zinc-700 group-hover:text-cyan-400 transition-colors shrink-0"
              />
            </motion.a>

            {/* ─ YouTube ─ */}
            <motion.a
              variants={fadeUp}
              href="https://www.youtube.com/@Beyond360Travel"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden bg-black border-2 border-solid border-red-900 p-5 md:p-6 shadow-[4px_4px_0px_rgba(239,68,68,0.1)] flex items-center gap-5 cursor-pointer transition-colors hover:border-red-500"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-solid border-red-950 bg-red-950/20 pointer-events-none" />

              <div className="relative z-10 w-12 h-12 bg-red-950/40 border-2 border-solid border-red-800 flex items-center justify-center shrink-0 group-hover:bg-red-500 group-hover:border-red-400 transition-all duration-300">
                <YoutubeIcon
                  size={20}
                  className="text-red-400 group-hover:text-black transition-colors duration-300"
                />
              </div>

              <div className="relative z-10 flex-1 min-w-0">
                <span className="text-red-400 text-[9px] font-bold tracking-widest uppercase block mb-1">
                  // Video_Feed
                </span>
                <h4 className="text-lg font-sans font-black uppercase tracking-tight text-white drop-shadow-[2px_2px_0px_#ef4444]">
                  YouTube
                </h4>
                <p className="text-[11px] text-zinc-500 font-mono mt-1 truncate">
                  Travel & shorts
                </p>
              </div>

              <ExternalLink
                size={14}
                className="relative z-10 text-zinc-700 group-hover:text-red-400 transition-colors shrink-0"
              />
            </motion.a>
            
            {/* Email */}
            <motion.a
              variants={fadeUp}
              href="mailto:advikjain24@yahoo.com"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden bg-black border-2 border-solid border-purple-900 p-5 md:p-6 shadow-[4px_4px_0px_rgba(168,85,247,0.1)] flex items-center gap-5 cursor-pointer transition-colors hover:border-purple-500"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-solid border-purple-950 bg-purple-950/20 pointer-events-none" />

              <div className="relative z-10 w-12 h-12 bg-purple-950/40 border-2 border-solid border-purple-800 flex items-center justify-center shrink-0 group-hover:bg-purple-500 group-hover:border-purple-400 transition-all duration-300">
                <Mail
                  size={20}
                  className="text-purple-400 group-hover:text-black transition-colors duration-300"
                />
              </div>

              <div className="relative z-10 flex-1 min-w-0">
                <span className="text-purple-400 text-[9px] font-bold tracking-widest uppercase block mb-1">
                  // Direct_Link
                </span>
                <h4 className="text-lg font-sans font-black uppercase tracking-tight text-white drop-shadow-[2px_2px_0px_#a855f7]">
                  Email
                </h4>
                <p className="text-[11px] text-zinc-500 font-mono mt-1 truncate">
                  advikjain24@yahoo.com
                </p>
              </div>

              <ExternalLink
                size={14}
                className="relative z-10 text-zinc-700 group-hover:text-purple-400 transition-colors shrink-0"
              />
            </motion.a>
          </motion.div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="relative z-20 border-t border-zinc-900 mt-10">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} Advik_OS // All systems nominal
          </span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 animate-pulse" />
            <span className="text-[9px] text-zinc-600 uppercase tracking-widest font-bold">
              Process Active
            </span>
          </div>
        </div>
      </footer>

      <MiniGame />
    </main>
  );
}

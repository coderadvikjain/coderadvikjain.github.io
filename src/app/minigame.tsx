"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, X, Terminal, Skull, Play, ChevronDown } from "lucide-react";

type GameState = "idle" | "playing" | "gameover";

interface PlayerState {
  x: number;
  y: number;
  w: number;
  h: number;
  vy: number;
  grounded: boolean;
  jumps: number;
  maxJumps: number;
  sliding: boolean;
  slideTimer: number;
  animFrame: number;
  animTimer: number;
}

interface Obstacle {
  x: number;
  y: number;
  w: number;
  h: number;
  type: "crate" | "drone" | "laser";
  stack?: number;
  bobOffset?: number;
  drawY?: number;
  active?: boolean;
  timer?: number;
}

interface Coin {
  x: number;
  y: number;
  collected: boolean;
  sparkle: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface BgStar {
  x: number;
  y: number;
  size: number;
  speed: number;
  twinkle: number;
}

interface BgBuilding {
  x: number;
  w: number;
  h: number;
  color: string;
  windows: number;
  speed: number;
}

const CANVAS_W = 800;
const CANVAS_H = 450;
const GROUND_Y = CANVAS_H - 50;
const GRAVITY = 0.55;
const JUMP_VEL = -11;
const SLIDE_DURATION = 30;
const SPEED_INCREASE = 0.0008;
const INITIAL_SPEED = 5;

const NINJA_COLORS: Record<number, string> = {
  1: "#0a0a0f",
  2: "#00fff2",
  3: "#111",
  4: "#ff00aa",
  5: "#00cc99",
  6: "#222",
  7: "#fff",
  8: "#333",
};

const NINJA_RUN_1: number[][] = [
  [0, 0, 0, 0, 6, 6, 6, 0, 0, 0],
  [0, 0, 0, 6, 1, 1, 1, 6, 0, 0],
  [0, 0, 6, 1, 1, 1, 1, 1, 6, 0],
  [0, 0, 6, 2, 7, 1, 7, 2, 6, 0],
  [0, 0, 6, 1, 1, 1, 1, 1, 6, 0],
  [0, 0, 0, 6, 4, 4, 4, 6, 0, 0],
  [0, 0, 6, 2, 1, 1, 1, 2, 6, 0],
  [0, 6, 1, 1, 1, 1, 1, 1, 1, 6],
  [0, 6, 5, 1, 1, 1, 1, 1, 5, 6],
  [0, 0, 6, 1, 1, 1, 1, 1, 6, 0],
  [0, 0, 6, 1, 0, 0, 1, 6, 0, 0],
  [0, 0, 6, 1, 0, 0, 0, 6, 1, 0],
  [0, 6, 1, 6, 0, 0, 0, 0, 6, 0],
  [0, 6, 5, 0, 0, 0, 0, 6, 5, 0],
];

const NINJA_RUN_2: number[][] = [
  [0, 0, 0, 0, 6, 6, 6, 0, 0, 0],
  [0, 0, 0, 6, 1, 1, 1, 6, 0, 0],
  [0, 0, 6, 1, 1, 1, 1, 1, 6, 0],
  [0, 0, 6, 2, 7, 1, 7, 2, 6, 0],
  [0, 0, 6, 1, 1, 1, 1, 1, 6, 0],
  [0, 0, 0, 6, 4, 4, 4, 6, 0, 0],
  [0, 0, 6, 2, 1, 1, 1, 2, 6, 0],
  [0, 6, 1, 1, 1, 1, 1, 1, 1, 6],
  [0, 6, 5, 1, 1, 1, 1, 1, 5, 6],
  [0, 0, 6, 1, 1, 1, 1, 1, 6, 0],
  [0, 6, 1, 0, 0, 0, 0, 1, 6, 0],
  [6, 1, 0, 0, 0, 0, 0, 0, 1, 6],
  [6, 5, 0, 0, 0, 0, 0, 0, 5, 6],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const NINJA_JUMP: number[][] = [
  [0, 0, 0, 0, 6, 6, 6, 0, 0, 0],
  [0, 0, 0, 6, 1, 1, 1, 6, 0, 0],
  [0, 0, 6, 1, 1, 1, 1, 1, 6, 0],
  [0, 0, 6, 2, 7, 1, 7, 2, 6, 0],
  [0, 0, 6, 1, 1, 1, 1, 1, 6, 0],
  [0, 0, 0, 6, 4, 4, 4, 6, 0, 0],
  [0, 6, 2, 1, 1, 1, 1, 1, 2, 6],
  [6, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [6, 5, 1, 1, 1, 1, 1, 1, 5, 6],
  [0, 0, 6, 1, 1, 1, 1, 1, 6, 0],
  [0, 0, 0, 6, 1, 1, 1, 6, 0, 0],
  [0, 0, 6, 1, 0, 0, 1, 6, 0, 0],
  [0, 6, 5, 0, 0, 0, 6, 5, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const NINJA_SLIDE: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 6, 2, 7, 2, 6, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 6, 1, 1, 1, 6, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 6, 4, 6, 0, 0, 0, 0, 0],
  [6, 6, 6, 6, 6, 6, 2, 1, 2, 6, 6, 6, 6, 6],
  [6, 5, 5, 5, 5, 5, 1, 1, 1, 5, 5, 5, 5, 6],
];

const OBS_COLORS: Record<number, string> = {
  1: "#ff0055",
  2: "#cc0044",
  3: "#880033",
  4: "#ff3377",
  5: "#ffaa00",
  6: "#222",
  7: "#ff6600",
};

const SPIKE_CRATE: number[][] = [
  [0, 0, 4, 4, 4, 0, 0],
  [0, 4, 1, 1, 1, 4, 0],
  [4, 0, 0, 0, 0, 0, 4],
  [6, 1, 2, 1, 2, 1, 6],
  [6, 2, 1, 2, 1, 2, 6],
  [6, 1, 2, 1, 2, 1, 6],
  [6, 2, 1, 2, 1, 2, 6],
  [6, 6, 6, 6, 6, 6, 6],
];

const DRONE_SPR: number[][] = [
  [0, 0, 5, 5, 5, 5, 5, 0, 0],
  [5, 5, 0, 0, 0, 0, 0, 5, 5],
  [0, 6, 1, 1, 1, 1, 1, 6, 0],
  [0, 6, 7, 1, 4, 1, 7, 6, 0],
  [0, 6, 1, 1, 1, 1, 1, 6, 0],
  [0, 0, 6, 6, 6, 6, 6, 0, 0],
  [0, 0, 0, 4, 0, 4, 0, 0, 0],
];

const LASER_GATE_SPR: number[][] = [
  [0, 6, 6, 0],
  [6, 1, 1, 6],
  [6, 4, 4, 6],
  [6, 1, 1, 6],
  [6, 4, 4, 6],
  [6, 1, 1, 6],
  [6, 4, 4, 6],
  [6, 1, 1, 6],
  [6, 4, 4, 6],
  [6, 1, 1, 6],
  [0, 6, 6, 0],
];

const COIN_COLORS: Record<number, string> = {
  1: "#ffd700",
  2: "#ffaa00",
  3: "#ff8800",
  4: "#fff4b0",
};

const COIN_SPR: number[][] = [
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 4, 4, 2, 1, 0],
  [1, 4, 1, 1, 2, 2, 1],
  [1, 4, 1, 3, 2, 2, 1],
  [1, 4, 1, 1, 2, 2, 1],
  [0, 1, 2, 2, 2, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
];



function drawPixelGrid(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  grid: number[][],
  scale: number,
  colors: Record<number, string>
) {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const ci = grid[r][c];
      if (ci === 0) continue;
      ctx.fillStyle = colors[ci] || "#ff00ff";
      ctx.fillRect(
        Math.floor(x + c * scale),
        Math.floor(y + r * scale),
        scale,
        scale
      );
    }
  }
}



export default function MiniGame() {
  const [isOpen, setIsOpen] = useState(false);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [lives, setLives] = useState(3);
  const [highScore, setHighScore] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const engineRef = useRef({
    state: "idle" as GameState,
    score: 0,
    coins: 0,
    lives: 3,
    speed: INITIAL_SPEED,
    distance: 0,
    frameCount: 0,
    difficultyLevel: 0,
    shakeTimer: 0,
    shakeMag: 0,
    invincibleTimer: 0,
    spawnTimer: 0,
    coinSpawnTimer: 0,

    player: {
      x: 80,
      y: GROUND_Y - 50,
      w: 36,
      h: 50,
      vy: 0,
      grounded: true,
      jumps: 0,
      maxJumps: 2,
      sliding: false,
      slideTimer: 0,
      animFrame: 0,
      animTimer: 0,
    } as PlayerState,

    obstacles: [] as Obstacle[],
    coinItems: [] as Coin[],
    particles: [] as Particle[],
    bgStars: [] as BgStar[],
    bgBuildings: [] as BgBuilding[],
  });

  const syncReactState = useCallback(() => {
    const e = engineRef.current;
    setScore(Math.floor(e.score));
    setCoins(e.coins);
    setLives(e.lives);
  }, []);

  const initBackground = useCallback(() => {
    const e = engineRef.current;
    e.bgStars = [];
    for (let i = 0; i < 60; i++) {
      e.bgStars.push({
        x: Math.random() * CANVAS_W,
        y: Math.random() * (CANVAS_H - 100),
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        twinkle: Math.random() * Math.PI * 2,
      });
    }
    e.bgBuildings = [];
    for (let i = 0; i < 20; i++) {
      e.bgBuildings.push({
        x: i * 80 + Math.random() * 40,
        w: 30 + Math.random() * 50,
        h: 60 + Math.random() * 120,
        color: `hsl(${200 + Math.random() * 40}, 60%, ${5 + Math.random() * 8}%)`,
        windows: Math.floor(Math.random() * 5) + 2,
        speed: 0.5 + Math.random() * 0.3,
      });
    }
  }, []);

  const spawnParticles = useCallback(
    (x: number, y: number, color: string, count: number) => {
      const e = engineRef.current;
      for (let i = 0; i < count; i++) {
        e.particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 4,
          vy: -Math.random() * 4 - 1,
          life: 20 + Math.random() * 15,
          maxLife: 35,
          color,
          size: 2 + Math.random() * 3,
        });
      }
    },
    []
  );

  
  const spawnObstacle = useCallback(() => {
    const e = engineRef.current;
    const pool: Obstacle["type"][] = ["crate"];
    if (e.difficultyLevel >= 1) pool.push("drone");
    if (e.difficultyLevel >= 2) pool.push("laser");

    const type = pool[Math.floor(Math.random() * pool.length)];
    const base: Partial<Obstacle> = { x: CANVAS_W + 20, type };

    if (type === "crate") {
      const stack = e.difficultyLevel >= 3 ? (Math.random() > 0.6 ? 2 : 1) : 1;
      base.y = GROUND_Y - 28 * stack;
      base.w = 24;
      base.h = 28 * stack;
      base.stack = stack;
    } else if (type === "drone") {
      base.y = GROUND_Y - 90 - Math.random() * 40;
      base.w = 32;
      base.h = 24;
      base.bobOffset = Math.random() * Math.PI * 2;
    } else if (type === "laser") {
      base.y = GROUND_Y - 45;
      base.w = 14;
      base.h = 45;
      base.active = true;
      base.timer = 0;
    }

    e.obstacles.push(base as Obstacle);
  }, []);

  const spawnCoinCluster = useCallback(() => {
    const e = engineRef.current;
    const baseX = CANVAS_W + 20;
    if (Math.random() < 0.5) {
      for (let i = 0; i < 5; i++) {
        e.coinItems.push({
          x: baseX + i * 30,
          y: GROUND_Y - 60 - Math.sin((i / 4) * Math.PI) * 50,
          collected: false,
          sparkle: Math.random() * Math.PI * 2,
        });
      }
    } else {
      const yPos = GROUND_Y - 40 - Math.random() * 60;
      for (let i = 0; i < 4; i++) {
        e.coinItems.push({
          x: baseX + i * 28,
          y: yPos,
          collected: false,
          sparkle: Math.random() * Math.PI * 2,
        });
      }
    }
  }, []);

  
  const doJump = useCallback(() => {
    const e = engineRef.current;
    if (e.state !== "playing" || e.player.sliding) return;
    if (e.player.jumps < e.player.maxJumps) {
      e.player.vy = JUMP_VEL;
      e.player.grounded = false;
      e.player.jumps++;
      spawnParticles(e.player.x + 18, GROUND_Y, "#00fff2", 6);
    }
  }, [spawnParticles]);

  const doSlide = useCallback(() => {
    const e = engineRef.current;
    if (e.state !== "playing") return;
    if (e.player.grounded && !e.player.sliding) {
      e.player.sliding = true;
      e.player.slideTimer = SLIDE_DURATION;
    }
  }, []);

  const handleGameOver = useCallback(() => {
    const e = engineRef.current;
    e.state = "gameover";
    const finalScore = Math.floor(e.score);
    const newRecord = finalScore > highScore;
    if (newRecord) setHighScore(finalScore);
    setIsNewRecord(newRecord);
    syncReactState();
    setGameState("gameover");
  }, [highScore, syncReactState]);

  
  const startGame = useCallback(() => {
    const e = engineRef.current;
    e.state = "playing";
    e.score = 0;
    e.coins = 0;
    e.lives = 3;
    e.speed = INITIAL_SPEED;
    e.distance = 0;
    e.frameCount = 0;
    e.difficultyLevel = 0;
    e.obstacles = [];
    e.coinItems = [];
    e.particles = [];
    e.spawnTimer = 0;
    e.coinSpawnTimer = 0;
    e.invincibleTimer = 0;
    e.shakeTimer = 0;
    e.shakeMag = 0;

    e.player = {
      x: 80,
      y: GROUND_Y - 50,
      w: 36,
      h: 50,
      vy: 0,
      grounded: true,
      jumps: 0,
      maxJumps: 2,
      sliding: false,
      slideTimer: 0,
      animFrame: 0,
      animTimer: 0,
    };

    initBackground();
    setIsNewRecord(false);
    syncReactState();
    setGameState("playing");
  }, [initBackground, syncReactState]);

  const lockOrientation = useCallback(async () => {
    const screenAny = window.screen as Screen & { orientation?: any };
    const orientation = screenAny.orientation || (window as any).screen?.orientation;
    if (orientation && typeof orientation.lock === "function") {
      try {
        await orientation.lock("landscape");
      } catch {
        // ignore unsupported or rejected orientation lock
      }
    }
  }, []);

  const unlockOrientation = useCallback(async () => {
    const screenAny = window.screen as Screen & { orientation?: any };
    const orientation = screenAny.orientation || (window as any).screen?.orientation;
    if (orientation && typeof orientation.unlock === "function") {
      try {
        orientation.unlock();
      } catch {
        // ignore unsupported unlock
      }
    }
  }, []);

  
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const e = engineRef.current;

    e.frameCount++;

    
    if (e.shakeTimer > 0) {
      e.shakeTimer--;
      ctx.save();
      ctx.translate(
        (Math.random() - 0.5) * e.shakeMag,
        (Math.random() - 0.5) * e.shakeMag
      );
      e.shakeMag *= 0.85;
    }

    
    const grd = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
    grd.addColorStop(0, "#050510");
    grd.addColorStop(0.5, "#0a0a1a");
    grd.addColorStop(1, "#101025");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    
    e.bgStars.forEach((s) => {
      s.x -= s.speed * e.speed * 0.2;
      if (s.x < -5) s.x = CANVAS_W + 5;
      s.twinkle += 0.03;
      const a = 0.4 + Math.sin(s.twinkle) * 0.3;
      ctx.fillStyle = `rgba(200,220,255,${a})`;
      ctx.fillRect(Math.floor(s.x), Math.floor(s.y), Math.ceil(s.size), Math.ceil(s.size));
    });

    
    e.bgBuildings.forEach((b) => {
      b.x -= b.speed * e.speed * 0.15;
      if (b.x + b.w < -10) b.x = CANVAS_W + Math.random() * 100;
      const by = GROUND_Y - b.h;
      ctx.fillStyle = b.color;
      ctx.fillRect(Math.floor(b.x), Math.floor(by), Math.ceil(b.w), Math.ceil(b.h));
      for (let wy = 0; wy < b.windows; wy++) {
        for (let wx = 0; wx < 2; wx++) {
          ctx.fillStyle =
            Math.sin(e.frameCount * 0.01 + b.x + wy + wx) > 0.3
              ? "rgba(0,255,242,0.15)"
              : "rgba(255,200,50,0.08)";
          ctx.fillRect(
            Math.floor(b.x + 5 + wx * (b.w * 0.4)),
            Math.floor(by + 8 + wy * 20),
            Math.max(1, Math.floor(b.w * 0.2)),
            6
          );
        }
      }
    });

    
    ctx.fillStyle = "#0d0d15";
    ctx.fillRect(0, GROUND_Y, CANVAS_W, CANVAS_H - GROUND_Y);
    ctx.shadowColor = "#00fff2";
    ctx.shadowBlur = 8;
    ctx.strokeStyle = "#00fff2";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(CANVAS_W, GROUND_Y);
    ctx.stroke();
    ctx.shadowBlur = 0;

    
    ctx.strokeStyle = "rgba(0,255,242,0.06)";
    ctx.lineWidth = 1;
    const gridOff = (e.frameCount * e.speed * 2) % 40;
    for (let gx = -gridOff; gx < CANVAS_W; gx += 40) {
      ctx.beginPath();
      ctx.moveTo(gx, GROUND_Y);
      ctx.lineTo(gx, CANVAS_H);
      ctx.stroke();
    }
    for (let gy = GROUND_Y; gy < CANVAS_H; gy += 15) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(CANVAS_W, gy);
      ctx.stroke();
    }

    
    if (e.state === "playing") {
      e.distance += e.speed;
      e.speed += SPEED_INCREASE;
      e.difficultyLevel = Math.floor(e.distance / 2000);
      e.score += 0.1;

      
      e.spawnTimer++;
      e.coinSpawnTimer++;
      const spawnRate = Math.max(60, 140 - e.difficultyLevel * 12);
      if (e.spawnTimer > spawnRate) {
        spawnObstacle();
        e.spawnTimer = 0;
      }
      if (e.coinSpawnTimer > 90 + Math.random() * 60) {
        spawnCoinCluster();
        e.coinSpawnTimer = 0;
      }

      
      const p = e.player;
      p.animTimer++;
      if (p.animTimer > 8) {
        p.animTimer = 0;
        p.animFrame = (p.animFrame + 1) % 2;
      }
      if (p.sliding) {
        p.slideTimer--;
        if (p.slideTimer <= 0) p.sliding = false;
      }
      if (!p.grounded) {
        p.vy += GRAVITY;
      }
      p.y += p.vy;
      if (p.y >= GROUND_Y - p.h) {
        p.y = GROUND_Y - p.h;
        p.vy = 0;
        p.grounded = true;
        p.jumps = 0;
      }
      if (e.invincibleTimer > 0) e.invincibleTimer--;

      
      for (let i = e.obstacles.length - 1; i >= 0; i--) {
        const o = e.obstacles[i];
        o.x -= e.speed;
        if (o.type === "drone") {
          o.bobOffset = (o.bobOffset || 0) + 0.06;
          o.drawY = o.y + Math.sin(o.bobOffset) * 8;
        }
        if (o.type === "laser") {
          o.timer = (o.timer || 0) + 1;
          o.active = Math.sin(o.timer * 0.05) > -0.3;
        }
        if (o.x + o.w < -50) {
          e.obstacles.splice(i, 1);
          e.score += 15;
        }
      }

      
      for (let i = e.coinItems.length - 1; i >= 0; i--) {
        const c = e.coinItems[i];
        c.x -= e.speed;
        c.sparkle += 0.08;
        if (c.x < -30) {
          e.coinItems.splice(i, 1);
          continue;
        }
        if (!c.collected) {
          const cx = c.x + 10,
            cy = c.y + 10;
          const px = p.x + 18,
            py = p.y + 25;
          if (Math.abs(cx - px) < 25 && Math.abs(cy - py) < 30) {
            c.collected = true;
            e.coins++;
            e.score += 25;
            spawnParticles(c.x, c.y, "#ffd700", 5);
            e.coinItems.splice(i, 1);
          }
        }
      }

      
      for (let i = e.particles.length - 1; i >= 0; i--) {
        const pt = e.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vy += 0.15;
        pt.life--;
        if (pt.life <= 0) e.particles.splice(i, 1);
      }

      
      if (e.invincibleTimer <= 0) {
        const ph = p.sliding ? 20 : p.h;
        const py = p.sliding ? GROUND_Y - 20 : p.y;
        const pBox = { x: p.x + 6, y: py + 4, w: p.w - 12, h: ph - 8 };

        for (const o of e.obstacles) {
          if (o.type === "laser" && !o.active) continue;
          const oBox = {
            x: o.x + 3,
            y: (o.type === "drone" ? o.drawY || o.y : o.y) + 3,
            w: o.w - 6,
            h: o.h - 6,
          };
          if (
            pBox.x < oBox.x + oBox.w &&
            pBox.x + pBox.w > oBox.x &&
            pBox.y < oBox.y + oBox.h &&
            pBox.y + pBox.h > oBox.y
          ) {
            e.lives--;
            e.invincibleTimer = 90;
            e.shakeTimer = 12;
            e.shakeMag = 6;
            spawnParticles(p.x + 18, p.y + 25, "#ff0055", 12);
            if (e.lives <= 0) {
              handleGameOver();
            }
            break;
          }
        }
      }

      
      if (e.frameCount % 6 === 0) syncReactState();
    }

    
    e.obstacles.forEach((o) => {
      const scale = 3.5;
      if (o.type === "crate") {
        for (let s = 0; s < (o.stack || 1); s++) {
          drawPixelGrid(ctx, o.x, GROUND_Y - 28 * (s + 1), SPIKE_CRATE, scale, OBS_COLORS);
        }
      } else if (o.type === "drone") {
        const dy = o.drawY || o.y;
        drawPixelGrid(ctx, o.x, dy, DRONE_SPR, scale, OBS_COLORS);
        ctx.fillStyle = `rgba(255,170,0,${0.3 + Math.sin(e.frameCount * 0.3) * 0.2})`;
        ctx.fillRect(o.x - 2, dy - 2, o.w + 4, 3);
      } else if (o.type === "laser") {
        if (o.active) {
          drawPixelGrid(ctx, o.x, o.y, LASER_GATE_SPR, scale, OBS_COLORS);
          ctx.shadowColor = "#ff0055";
          ctx.shadowBlur = 15;
          ctx.fillStyle = "rgba(255,0,85,0.15)";
          ctx.fillRect(o.x - 5, o.y, o.w + 10, o.h);
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = "rgba(100,0,30,0.3)";
          ctx.fillRect(o.x + 2, o.y, 4, o.h);
          ctx.fillRect(o.x + o.w - 6, o.y, 4, o.h);
        }
      }
    });

    
    e.coinItems.forEach((c) => {
      if (c.collected) return;
      const bobY = c.y + Math.sin(c.sparkle) * 3;
      drawPixelGrid(ctx, c.x, bobY, COIN_SPR, 2.5, COIN_COLORS);
      ctx.fillStyle = `rgba(255,215,0,${0.3 + Math.sin(c.sparkle * 2) * 0.2})`;
      ctx.fillRect(c.x + 6, bobY - 2, 2, 2);
    });

    
    const p = e.player;
    if (!(e.invincibleTimer > 0 && e.frameCount % 4 < 2)) {
      const scale = 3.5;
      if (p.sliding) {
        drawPixelGrid(ctx, p.x - 10, p.y + 5, NINJA_SLIDE, scale, NINJA_COLORS);
      } else if (!p.grounded) {
        drawPixelGrid(ctx, p.x, p.y, NINJA_JUMP, scale, NINJA_COLORS);
      } else {
        const sprite = p.animFrame === 0 ? NINJA_RUN_1 : NINJA_RUN_2;
        drawPixelGrid(ctx, p.x, p.y, sprite, scale, NINJA_COLORS);
      }
      
      ctx.shadowColor = "#00fff2";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "rgba(0,255,242,0.08)";
      ctx.fillRect(p.x - 5, p.y + 10, 5, 30);
      ctx.shadowBlur = 0;
    }

    
    e.particles.forEach((pt) => {
      const alpha = pt.life / pt.maxLife;
      ctx.fillStyle = pt.color;
      ctx.globalAlpha = alpha;
      ctx.fillRect(Math.floor(pt.x), Math.floor(pt.y), Math.ceil(pt.size), Math.ceil(pt.size));
    });
    ctx.globalAlpha = 1;

    if (e.shakeTimer >= 0) ctx.restore();

    rafRef.current = requestAnimationFrame(gameLoop);
  }, [
    spawnObstacle,
    spawnCoinCluster,
    spawnParticles,
    handleGameOver,
    syncReactState,
  ]);

  
  useEffect(() => {
    if (isOpen) {
      initBackground();
      rafRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isOpen, gameLoop, initBackground]);

  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        const state = engineRef.current.state;
        if (state === "playing") doJump();
        else startGame();
      }
      if (e.code === "ArrowDown") {
        e.preventDefault();
        doSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, doJump, doSlide, startGame]);

  
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const swipeHandled = useRef(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    if (!isOpen) return;

    const preventScroll = (e: TouchEvent) => {
      
      const gameArea = gameAreaRef.current;
      if (gameArea && gameArea.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    
    document.addEventListener("touchmove", preventScroll, { passive: false });
    document.addEventListener("touchstart", preventScroll, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventScroll);
      document.removeEventListener("touchstart", preventScroll);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      unlockOrientation();
    }
  }, [isOpen, unlockOrientation]);

  const handleTouchStart = useCallback(
    (evt: React.TouchEvent) => {
      const touch = evt.touches[0];
      if (!touch) return;
      touchStartY.current = touch.clientY;
      touchStartX.current = touch.clientX;
      swipeHandled.current = false;

      const state = engineRef.current.state;
      if (state === "playing") doJump();
      else startGame();
    },
    [doJump, startGame]
  );

  const handleTouchMove = useCallback(
    (evt: React.TouchEvent) => {
      if (swipeHandled.current) return;
      const touch = evt.touches[0];
      if (!touch) return;

      const dy = touch.clientY - touchStartY.current;
      const dx = Math.abs(touch.clientX - touchStartX.current);

      
      if (dy > 25 && dy > dx) {
        swipeHandled.current = true;
        doSlide();
      }
    },
    [doSlide]
  );

  
  const handlePointerDown = useCallback(
    (evt: React.PointerEvent) => {
      
      if (evt.pointerType === "touch") return;
      evt.preventDefault();
      const state = engineRef.current.state;
      if (state === "playing") doJump();
      else startGame();
    },
    [doJump, startGame]
  );

  
  const HeartIcon = ({ alive }: { alive: boolean }) => (
    <svg width="14" height="14" viewBox="0 0 12 12" style={{ opacity: alive ? 1 : 0.2 }}>
      <path
        d="M6 10 L1 5.5 C-1 3, 1 0, 3.5 1.5 L6 4 L8.5 1.5 C11 0, 13 3, 11 5.5 Z"
        fill={alive ? "#ff0055" : "#333"}
      />
    </svg>
  );

  return (
    <>
      
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5 }}
        onClick={() => {
          setIsOpen(true);
          setGameState("idle");
          engineRef.current.state = "idle";
          lockOrientation();
        }}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[60] bg-black border-2 border-r-0 border-solid border-cyan-900 p-3 shadow-[-4px_4px_0px_rgba(0,0,0,0.5)] group hover:bg-cyan-950/50 hover:border-cyan-400 transition-colors cursor-pointer"
      >
        <Gamepad2 size={20} className="text-cyan-400 group-hover:animate-pulse" />
        <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-black border border-cyan-900 text-cyan-400 text-[10px] font-mono px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap uppercase tracking-widest">
          CyberNinja.exe
        </span>
      </motion.button>

      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-2 md:p-4"
            onClick={(e) => {
              
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-[#050505] border-2 border-solid border-cyan-900 shadow-[8px_8px_0px_#000] flex flex-col overflow-hidden"
            >
              
              <div className="flex justify-between items-center bg-cyan-950/30 border-b border-cyan-900 px-4 py-2">
                <span className="text-xs text-cyan-400 font-mono font-bold uppercase tracking-widest flex items-center gap-2">
                  <Terminal size={14} /> Cyber_Ninja
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-500 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              
              <div className="flex justify-between items-start px-4 py-2 bg-black/50 font-mono text-[10px] pointer-events-none">
                <div className="flex gap-4">
                  <div>
                    <span className="text-zinc-600 uppercase tracking-widest">Score </span>
                    <span className="text-white font-bold text-xs">
                      {Math.floor(score).toString().padStart(4, "0")}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-600 uppercase tracking-widest">Coins </span>
                    <span className="text-yellow-400 font-bold text-xs">× {coins}</span>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div>
                    <span className="text-zinc-600 uppercase tracking-widest">Best </span>
                    <span className="text-cyan-400 font-bold text-xs">
                      {highScore.toString().padStart(4, "0")}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <HeartIcon key={i} alive={i < lives} />
                    ))}
                  </div>
                </div>
              </div>

              <div
                ref={gameAreaRef}
                className="relative w-full bg-[#030303] overflow-hidden select-none cursor-pointer"
                style={{ aspectRatio: "800/450", touchAction: "none", WebkitUserSelect: "none" }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onPointerDown={handlePointerDown}
              >
                <canvas
                  ref={canvasRef}
                  width={CANVAS_W}
                  height={CANVAS_H}
                  className="block w-full h-full"
                />

                
                {gameState === "playing" && (
                  <button
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      doSlide();
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      doSlide();
                    }}
                    className="absolute bottom-3 right-3 z-30 md:hidden bg-pink-600/70 active:bg-pink-400 border border-pink-400/50 rounded-lg p-2.5 backdrop-blur-sm transition-colors"
                    style={{ touchAction: "none" }}
                    aria-label="Slide"
                  >
                    <ChevronDown size={22} className="text-white" />
                  </button>
                )}

                
                <div
                  className="absolute inset-0 pointer-events-none opacity-30"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
                  }}
                />

                
                <AnimatePresence>
                  {gameState === "idle" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-20"
                    >
                      <Play size={40} className="text-cyan-400 mb-4 animate-pulse" />
                      <h3
                        className="text-white text-xl md:text-3xl font-black uppercase tracking-widest mb-1"
                        style={{ fontFamily: "'Orbitron', sans-serif", textShadow: "0 0 20px rgba(0,255,242,.5)" }}
                      >
                        Cyber Ninja
                      </h3>
                      <p
                        className="text-pink-500 text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase mb-6"
                        style={{ animation: "pulse 2s infinite" }}
                      >
                        ▸ Neon Runner ◂
                      </p>
                      <p className="text-zinc-500 text-[9px] md:text-[10px] font-mono tracking-widest uppercase leading-loose text-center px-4">
                        <span className="hidden md:inline">
                          Space / ↑ → Jump &nbsp;|&nbsp; Double-Press → Double Jump
                          <br />
                          ↓ Arrow → Slide
                        </span>
                        <span className="md:hidden">
                          Tap → Jump &nbsp;|&nbsp; Tap Twice → Double Jump
                          <br />
                          Swipe Down or{" "}
                          <span className="inline-flex items-center gap-0.5 bg-pink-600/50 px-1 py-0.5 rounded">
                            <ChevronDown size={8} />
                          </span>{" "}
                          Button → Slide
                        </span>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <AnimatePresence>
                  {gameState === "gameover" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-red-950/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 border-4 border-red-600/50"
                    >
                      <Skull size={40} className="text-red-500 mb-3" />
                      <h3
                        className="text-red-500 text-xl md:text-2xl font-black uppercase tracking-widest mb-2"
                        style={{ textShadow: "0 0 15px rgba(255,0,85,.7)" }}
                      >
                        System Crash
                      </h3>
                      <p className="text-white text-sm font-mono tracking-widest uppercase mb-1">
                        Score: {Math.floor(score).toString().padStart(4, "0")}
                      </p>
                      <p className="text-yellow-400 text-xs font-mono tracking-widest uppercase mb-1">
                        Coins: × {coins}
                      </p>
                      <p className="text-cyan-400 text-[10px] font-mono tracking-widest uppercase mb-4">
                        Best: {highScore.toString().padStart(4, "0")}
                      </p>
                      {isNewRecord && (
                        <p
                          className="text-yellow-400 text-[10px] font-mono tracking-widest mb-3"
                          style={{ animation: "pulse .5s infinite" }}
                        >
                          ★ NEW RECORD ★
                        </p>
                      )}
                      <button 
                        onTouchStart={(e) => { e.stopPropagation(); startGame(); }}
                        onClick={(e) => { e.stopPropagation(); startGame(); }}
                        className="bg-red-600 text-black text-xs font-bold uppercase tracking-widest px-6 py-2 hover:bg-white active:bg-white transition-colors cursor-pointer pointer-events-auto"
                      >
                        Retry
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="px-4 pb-3 text-[9px] text-zinc-500 uppercase tracking-widest">
                  Built with Claude AI
                </div>
            </motion.div>
          </motion.div>
          
        )}
      </AnimatePresence>
    </>
  );
}
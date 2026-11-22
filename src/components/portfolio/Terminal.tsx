"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

type Line = { type: "input" | "output" | "error"; content: ReactNode };

const ABOUT =
  "I'm a full-stack developer who has turned years of freelancing into a full-time career. Beyond the screen, I'm an active trader and investor across equity, debt and commodity markets, grounded in technical chart analysis and fundamental research. I specialise in robust, scalable architectures that handle complex operations efficiently.";

const files: Record<string, ReactNode> = {
  "about.txt": ABOUT,
  "ai_module.md": (
    <span>
      My core focus has expanded into Artificial Intelligence — <b className="text-paper">Machine Learning</b> and{" "}
      <b className="text-paper">Deep Learning</b>: training, fine-tuning and deploying models. Right now I&apos;m channelling it into
      building <span className="text-accent">educational AI products</span>.
    </span>
  ),
  "philosophy.log": (
    <span className="flex flex-col gap-2">
      <span>
        <span className="text-accent">[mission]</span> Accessible, high-tier education for everyone — especially kids who have the
        drive but not the means. Charity and real empowerment are the endgame.
      </span>
      <span>
        <span className="text-accent">[tribe]</span> Endless appreciation for my favourite person and everyone who backs the vision.
      </span>
    </span>
  ),
  "projects.md": "Scroll down to “Selected Work” — or type 'open work'.",
};

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Line[]>([
    { type: "output", content: "advik_os v2.0 — type 'help' to see commands." },
    { type: "input", content: "cat about.txt" },
    { type: "output", content: ABOUT },
  ]);
  const box = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight });
  }, [history]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const next: Line[] = [...history, { type: "input", content: cmd }];
    const [base, ...args] = cmd.split(/\s+/);
    switch ((base || "").toLowerCase()) {
      case "":
        break;
      case "help":
        next.push({ type: "output", content: "help · ls · cat <file> · whoami · resume · open <work|labs|contact> · clear" });
        break;
      case "clear":
        setHistory([]);
        return;
      case "ls":
        next.push({ type: "output", content: <span className="text-accent">{Object.keys(files).join("   ")}</span> });
        break;
      case "whoami":
        next.push({ type: "output", content: "Advik Jain — full-stack developer, ML engineer, builder of AI for education." });
        break;
      case "resume": {
        next.push({ type: "output", content: "Downloading Advik_Jain_Resume.pdf …" });
        const a = document.createElement("a");
        a.href = "/resume.pdf";
        a.download = "Advik_Jain_Resume.pdf";
        a.click();
        break;
      }
      case "open": {
        const el = document.getElementById(args[0] === "contact" ? "connect" : args[0] ?? "");
        if (el) {
          next.push({ type: "output", content: `→ jumping to ${args[0]}` });
          setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 200);
        } else next.push({ type: "error", content: "open: try 'open work', 'open labs' or 'open contact'" });
        break;
      }
      case "cat": {
        const f = args[0];
        if (!f) next.push({ type: "error", content: "cat: missing operand. Try 'cat about.txt'" });
        else if (files[f]) next.push({ type: "output", content: files[f] });
        else next.push({ type: "error", content: `cat: ${f}: No such file or directory` });
        break;
      }
      case "sudo":
        next.push({ type: "error", content: "Nice try. 🙂" });
        break;
      default:
        next.push({ type: "error", content: `${base}: command not found` });
    }
    setHistory(next);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-[0_40px_120px_-40px_rgba(254,188,46,0.18)]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.25em] text-dim">advik@india: ~</span>
      </div>
      <div
        ref={box}
        data-lenis-prevent
        onClick={() => inputRef.current?.focus()}
        className="h-[320px] overflow-y-auto p-5 font-mono text-[13px] leading-relaxed text-muted [scrollbar-width:none]"
      >
        {history.map((l, i) => (
          <div key={i} className={`mb-2.5 ${l.type === "error" ? "text-[#ff7a7a]" : ""}`}>
            {l.type === "input" ? (
              <span className="text-paper">
                <span className="text-accent">➜</span> <span className="text-[#7ee0a1]">~</span> {l.content}
              </span>
            ) : (
              l.content
            )}
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-accent">➜</span>
          <span className="text-[#7ee0a1]">~</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                run(input);
                setInput("");
              }
            }}
            aria-label="Terminal input"
            placeholder="type 'help'"
            className="flex-1 bg-transparent text-paper caret-accent outline-none placeholder:text-dim"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}

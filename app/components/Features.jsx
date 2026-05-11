"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Learn Mode",
    desc: "Browse all questions with full detailed answers. Bookmark important ones and build your knowledge base before jumping into practice.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    title: "Practice Sessions",
    desc: "Simulate real interview pressure. Answer MCQ + written explanation for each question — exactly how interviewers test you.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12,6 12,12 16,14" />
      </svg>
    ),
  },
  {
    title: "AI Feedback",
    desc: "Get instant detailed feedback — score per question, what you missed, and what the ideal answer should include. Brutal but honest.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Progress Tracking",
    desc: "Track your scores across multiple sessions. See how you improve over time with visual history and session logs.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    title: "Weak Area Detection",
    desc: "AI pinpoints exactly which concepts you struggle with — closures, hooks, routing — so you study smarter, not harder.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    title: "Session History",
    desc: "Every session is saved. Revisit past attempts, compare scores, and watch your understanding evolve over time.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88" />
      </svg>
    ),
  },
];

const Features = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from(".features-heading", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".features-heading",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(".feature-card", {
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-16 lg:px-32">
      {/* Heading */}
      <div className="features-heading text-center mb-16">
        <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
          <span className="inline-block w-5 h-[2px] bg-orange-500" />
          Features
          <span className="inline-block w-5 h-[2px] bg-orange-500" />
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Everything you need to{" "}
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            get hired
          </span>
        </h2>
        <p className="text-muted-foreground mt-4 text-lg max-w-xl mx-auto">
          Built specifically for frontend developers targeting junior and mid-level roles.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            className="feature-card group relative bg-muted/20 border border-border rounded-2xl p-7 overflow-hidden transition-all duration-300 hover:border-orange-500/40 hover:bg-orange-500/5 hover:-translate-y-1"
          >
            {/* Top line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Glow */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
              <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 mb-5 group-hover:bg-orange-500/20 transition-colors duration-300">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
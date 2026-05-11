"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const topics = [
  {
    tag: "JavaScript",
    tagColor: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
    title: "Core JS",
    desc: "Fundamentals to advanced concepts",
    count: "60 questions · 4 difficulty levels",
    questions: [
      "What is the difference between var, let and const?",
      "Explain event bubbling and capturing in detail",
      "How does the JavaScript event loop work?",
      "What are closures and why are they useful?",
    ],
  },
  {
    tag: "React",
    tagColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    title: "React",
    desc: "Hooks, state, and component patterns",
    count: "50 questions · 4 difficulty levels",
    questions: [
      "Explain useState vs useReducer — when to use which?",
      "When would you use useCallback vs useMemo?",
      "What are React Server Components?",
      "How does React reconciliation work?",
    ],
  },
  {
    tag: "Next.js",
    tagColor: "text-zinc-300 bg-zinc-500/10 border-zinc-500/20",
    title: "Next.js",
    desc: "App Router, SSR, and performance",
    count: "45 questions · 4 difficulty levels",
    questions: [
      "Difference between SSR, SSG, and ISR?",
      "How does the App Router differ from Pages Router?",
      "Explain Next.js middleware and its use cases",
      "What are Server Actions and how do they work?",
    ],
  },
];

const Topics = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from(".topics-heading", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".topics-heading",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(".topic-card", {
      y: 80,
      opacity: 0,
      duration: 0.9,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-16 lg:px-32">
      {/* Heading */}
      <div className="topics-heading text-center mb-16">
        <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
          <span className="inline-block w-5 h-[2px] bg-orange-500" />
          Topics
          <span className="inline-block w-5 h-[2px] bg-orange-500" />
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Three topics.{" "}
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Hundreds of questions.
          </span>
        </h2>
        <p className="text-muted-foreground mt-4 text-lg max-w-xl mx-auto">
          Curated from real interviews at top tech companies. Updated regularly.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 md:grid-cols-1 gap-6 max-w-6xl mx-auto">
        {topics.map((topic, i) => (
          <div
            key={i}
            className="topic-card group relative bg-muted/20 border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-orange-500/40 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/5"
          >
            {/* Top line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Header */}
            <div className="p-6 border-b border-border">
              <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border mb-4 ${topic.tagColor}`}>
                {topic.tag}
              </span>
              <h3 className="text-2xl font-bold text-foreground mb-1">{topic.title}</h3>
              <p className="text-sm text-muted-foreground">{topic.desc}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
                <span className="text-xs text-muted-foreground font-semibold">{topic.count}</span>
              </div>
            </div>

            {/* Sample questions */}
            <div className="p-6 flex flex-col gap-3">
              {topic.questions.map((q, j) => (
                <div key={j} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed group/q">
                  <span className="w-1.5 h-1.5 rounded-full bg-border flex-shrink-0 mt-2 group-hover/q:bg-orange-500 transition-colors duration-200" />
                  {q}
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="px-6 pb-6">
              <button className="w-full py-3 rounded-xl border border-border text-sm font-bold text-muted-foreground hover:border-orange-500 hover:text-orange-500 hover:bg-orange-500/5 transition-all duration-300">
                Explore {topic.tag} Questions →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Topics;
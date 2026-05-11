"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Pick Your Topic",
    desc: "Choose from JavaScript, React, or Next.js. Each topic has carefully curated questions covering beginner to advanced difficulty levels — all from real interviews.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
    tag: "Step 1",
  },
  {
    number: "02",
    title: "Learn or Jump In",
    desc: "Study the topic with full detailed answers in Learn Mode — or skip straight to a practice session. Your choice, your pace. No pressure.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    tag: "Step 2",
  },
  {
    number: "03",
    title: "Practice with MCQ + Explanation",
    desc: "Answer each question with a multiple choice selection, then back it up with a written explanation — just like a real interview. Get feedback whenever you're ready.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12,6 12,12 16,14" />
      </svg>
    ),
    tag: "Step 3",
  },
  {
    number: "04",
    title: "Get AI Feedback & Track Progress",
    desc: "Receive instant AI-powered scores, weak area detection, and personalized study recommendations. Every session is saved so you can track your growth over time.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
      </svg>
    ),
    tag: "Step 4",
  },
];

const HowItWorks = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Section heading animation
    gsap.from(".hiw-heading", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".hiw-heading",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Timeline line draw
    gsap.from(".timeline-line", {
      scaleY: 0,
      transformOrigin: "top center",
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    });

    // Steps stagger reveal
    gsap.from(".hiw-step", {
      x: -60,
      opacity: 0,
      duration: 0.9,
      stagger: 0.25,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    });

    // Step dots pop
    gsap.from(".step-dot", {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.25,
      ease: "back.out(1.7)",
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
      <div className="hiw-heading text-center mb-20">
        <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
          <span className="inline-block w-5 h-[2px] bg-orange-500" />
          How it works
          <span className="inline-block w-5 h-[2px] bg-orange-500" />
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Four steps to{" "}
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            interview confidence
          </span>
        </h2>
        <p className="text-muted-foreground mt-4 text-lg max-w-xl mx-auto">
          No complicated setup. Pick your topic and start — PrepForge handles the rest.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">

        {/* Vertical line */}
        <div className="absolute left-7 top-0 bottom-0 w-[1px] bg-border">
          <div className="timeline-line absolute inset-0 bg-gradient-to-b from-orange-500 via-orange-400 to-transparent" />
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-12">
          {steps.map((step, i) => (
            <div key={i} className="hiw-step relative flex gap-8 items-start group">

              {/* Dot */}
              <div className="step-dot relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-background border border-border flex items-center justify-center group-hover:border-orange-500 group-hover:bg-orange-500/10 transition-all duration-300">
                <span className="text-orange-500">{step.icon}</span>
              </div>

              {/* Content card */}
              <div className="flex-1 bg-muted/20 border border-border rounded-2xl p-6 group-hover:border-orange-500/30 group-hover:bg-orange-500/5 transition-all duration-300 relative overflow-hidden">

                {/* Top orange line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Big step number (background) */}
                <span className="absolute top-3 right-5 text-7xl font-bold text-border/40 select-none leading-none">
                  {step.number}
                </span>

                <div className="relative z-10">
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">
                    {step.tag}
                  </span>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
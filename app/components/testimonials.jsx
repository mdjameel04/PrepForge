"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    stars: 5,
    text: "PrepForge's AI feedback was brutal but honest. It showed me exactly where my explanations were weak. Got my first offer after 3 weeks of consistent practice.",
    name: "Arjun Kumar",
    role: "Junior Dev @ Razorpay",
    initials: "AK",
  },
  {
    stars: 5,
    text: "The Learn Mode is underrated. I studied all the Next.js questions first, then practiced. Way better than watching the same YouTube video for the 10th time.",
    name: "Sneha Rao",
    role: "Frontend Dev @ Swiggy",
    initials: "SR",
  },
  {
    stars: 5,
    text: "Weak area detection is a game changer. Didn't even know I was struggling with closures until PrepForge flagged it 4 sessions in a row. Fixed it in a week.",
    name: "Mohammed Hassan",
    role: "React Dev @ Zoho",
    initials: "MH",
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from(".testi-heading", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".testi-heading",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(".testi-card", {
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
      <div className="testi-heading text-center mb-16">
        <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
          <span className="inline-block w-5 h-[2px] bg-orange-500" />
          Testimonials
          <span className="inline-block w-5 h-[2px] bg-orange-500" />
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Students who{" "}
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            got hired
          </span>
        </h2>
        <p className="text-muted-foreground mt-4 text-lg max-w-xl mx-auto">
          Real feedback from developers who used PrepForge to land their first frontend role.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 md:grid-cols-1 gap-6 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="testi-card group relative bg-muted/20 border border-border rounded-2xl p-7 overflow-hidden transition-all duration-300 hover:border-orange-500/40 hover:bg-orange-500/5 hover:-translate-y-1"
          >
            {/* Top line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Glow */}
            <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-orange-500/8 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Quote icon */}
            <div className="text-orange-500/30 text-6xl font-serif leading-none mb-2 select-none">"</div>

            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.stars }).map((_, j) => (
                <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#f97316" className="text-orange-500">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              ))}
            </div>

            <p className="text-sm text-foreground leading-relaxed mb-6 font-medium relative z-10">
              {t.text}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 text-sm font-bold flex-shrink-0">
                {t.initials}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
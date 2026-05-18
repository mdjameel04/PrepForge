"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Data = [
  { number: "500+", name: "Students Practicing", desc: "Actively preparing daily" },
  { number: "150+", name: "Curated Questions", desc: "Across all difficulty levels" },
  { number: "3", name: "Core Topics", desc: "JS, React & Next.js" },
  { number: "AI", name: "Powered Feedback", desc: "Instant & detailed analysis" },
];

const Stats = () => {
  const records = useRef(null);

  useGSAP(() => {
    gsap.from(".stat-card", {
      y: 100,
      opacity: 0,
      duration: 2,
      stagger: 0.2,
      ease: "power3.out",

      scrollTrigger: {
        trigger: records.current,
        start: "top 40%",
        toggleActions: "play none none reverse",
        
      },
    });
  });

  return (
    <div className="pt-20" ref={records}>
      <div className="w-full border-t border-b border-border bg-muted/20">
        <div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 divide-x divide-y divide-border">
          {Data.map((item, i) => (
            <div
              key={i}
              className="stat-card group relative flex flex-col items-center justify-center py-14 px-8 text-center overflow-hidden transition-colors duration-300 hover:bg-orange-500/5"
            >
              {/* top orange line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent group-hover:w-full transition-all duration-500" />

              {/* glow */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-24 h-24 rounded-full bg-orange-500/10 blur-2xl" />
              </div>

              <h2 className="relative text-5xl font-bold tracking-tight leading-none bg-gradient-to-b from-orange-400 to-orange-600 bg-clip-text text-transparent">
                {item.number}
              </h2>

              <p className="relative text-base font-semibold text-foreground mt-3">
                {item.name}
              </p>

              <p className="relative text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      <hr/>
    </div>
  );
};

export default Stats;
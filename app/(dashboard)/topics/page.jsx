"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import TopicCard from "./Topicard";

const topics = [
  {
    id: "javascript",
    label: "JavaScript",
    description: "Master core JS concepts from fundamentals to advanced patterns used in real interviews.",
    totalQuestions: 60,
    color: "yellow",
    difficulties: ["Beginner", "Intermediate", "Advanced"],
    sampleTopics: ["Closures", "Event Loop", "Promises", "Prototypes", "ES6+"],
  },
  {
    id: "react",
    label: "React",
    description: "Deep dive into hooks, state management, component patterns and React internals.",
    totalQuestions: 50,
    color: "cyan",
    difficulties: ["Beginner", "Intermediate", "Advanced"],
    sampleTopics: ["useState", "useEffect", "useMemo", "Context", "Server Components"],
  },
  {
    id: "nextjs",
    label: "Next.js",
    description: "Cover App Router, SSR, SSG, ISR, middleware, and performance optimization.",
    totalQuestions: 45,
    color: "zinc",
    difficulties: ["Beginner", "Intermediate", "Advanced"],
    sampleTopics: ["App Router", "SSR vs SSG", "Middleware", "Server Actions", "ISR"],
  },
];

const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

const TopicsPage = () => {
  const { user } = useUser();
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const topicProgress = useQuery(api.sessions.getTopicProgress, {
    userId: user?.id ?? "",
  });

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Topics</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Pick a topic to learn or jump into a practice session.
        </p>
      </div>

      {/* Difficulty Filter */}
      <div className="flex items-center gap-2">
        {difficulties.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDifficulty(d)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
              ${selectedDifficulty === d
                ? "bg-orange-500 text-white border-orange-500"
                : "border-border text-muted-foreground hover:border-orange-500 hover:text-orange-500 bg-transparent"
              }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Topic Cards */}
      <div className="grid grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-6">
        {topics.map((topic) => {
          const progress = topicProgress?.[topic.id];
          const questionsAnswered = progress?.totalQuestions ?? 0;
          const progressPercent = Math.min(
            Math.round((questionsAnswered / topic.totalQuestions) * 100),
            100
          );
          const avgScore = progress?.sessions
            ? Math.round(progress.score / progress.sessions)
            : null;

          return (
            <TopicCard
              key={topic.id}
              topic={topic}
              questionsAnswered={questionsAnswered}
              progressPercent={progressPercent}
              avgScore={avgScore}
              selectedDifficulty={selectedDifficulty}
            />
          );
        })}
      </div>

    </div>
  );
};

export default TopicsPage;
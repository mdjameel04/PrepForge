"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { BookOpen, Play, CheckCircle } from "lucide-react";



const colorMap={
  yellow: {
    tag: "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20",
    dot: "bg-yellow-500",
    progress: "bg-yellow-500",
    badge: "bg-yellow-500/10 text-yellow-600",
    pill: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  },
  cyan: {
    tag: "bg-cyan-500/10 text-cyan-600 border border-cyan-500/20",
    dot: "bg-cyan-500",
    progress: "bg-cyan-500",
    badge: "bg-cyan-500/10 text-cyan-600",
    pill: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  },
  zinc: {
    tag: "bg-zinc-500/10 text-zinc-500 border border-zinc-500/20",
    dot: "bg-zinc-400",
    progress: "bg-zinc-400",
    badge: "bg-zinc-500/10 text-zinc-500",
    pill: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
  },
};
   
const TopicCard = ({
  topic,
  questionsAnswered,
  progressPercent,
  avgScore,
  selectedDifficulty,
})=>{
  const router = useRouter();
  const colors = colorMap[topic.color];

  // Filter by difficulty
  if (
    selectedDifficulty !== "All" &&
    !topic.difficulties.includes(selectedDifficulty)
  ) {
    return null;
  }

  return (
    <div className="flex flex-col border border-border rounded-2xl bg-muted/20 hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden group">

      {/* Top orange line on hover */}
      <div className="h-[2px] w-0 group-hover:w-full bg-orange-500 transition-all duration-500" />

      {/* Header */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <span className={cn("text-xs font-bold px-3 py-1 rounded-full", colors.tag)}>
            {topic.label}
          </span>
          {progressPercent === 100 && (
            <CheckCircle className="w-4 h-4 text-green-500" />
          )}
          {avgScore !== null && (
            <span className={cn("text-xs font-bold px-2 py-1 rounded-lg", colors.badge)}>
              Avg: {avgScore}%
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold mb-1">{topic.label}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {topic.description}
        </p>
      </div>

      {/* Progress */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{questionsAnswered} / {topic.totalQuestions} questions</span>
        </div>
        <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-500", colors.progress)}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">{progressPercent}% complete</p>
      </div>

      {/* Sample Topics */}
      <div className="px-5 py-4 border-b border-border">
        <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
          Covers
        </p>
        <div className="flex flex-wrap gap-2">
          {topic.sampleTopics.map((t) => (
            <span
              key={t}
              className={cn(
                "text-xs px-2.5 py-1 rounded-full border",
                colors.pill
              )}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 flex gap-3 mt-auto">
        <button
          onClick={() => router.push(`/learn/${topic.id}`)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:border-orange-500 hover:text-orange-500 hover:bg-orange-500/5 transition-all duration-200"
        >
          <BookOpen className="w-4 h-4" />
          Learn
        </button>
        <button
          onClick={() => router.push(`/practice/${topic.id}`)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-all duration-200"
        >
          <Play className="w-4 h-4" />
          Practice
        </button>
      </div>

    </div>
  );
};

export default TopicCard;
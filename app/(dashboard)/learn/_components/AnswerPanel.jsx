"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Bookmark, BookmarkCheck, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";


const difficultyColors = {
  beginner: "bg-green-500/10 text-green-600 border-green-500/20",
  intermediate: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  advanced: "bg-red-500/10 text-red-500 border-red-500/20",
};

const AnswerPanel = ({ question }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [showAnswer, setShowAnswer] = useState(true);
  const router = useRouter();

  if (!question) {
    return (
      <div className="flex items-center justify-center h-full border border-border rounded-xl">
        <p className="text-sm text-muted-foreground">Select a question to view answer.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col border border-border rounded-xl bg-muted/20 overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <span className={cn(
          "text-xs font-bold px-3 py-1 rounded-full border capitalize",
          difficultyColors[question.difficulty]
        )}>
          {question.difficulty}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className="text-muted-foreground hover:text-orange-500 transition-colors"
          >
            {bookmarked
              ? <BookmarkCheck className="w-5 h-5 text-orange-500" />
              : <Bookmark className="w-5 h-5" />
            }
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5">

        {/* Question */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Question
          </p>
          <p className="text-base font-semibold leading-relaxed">
            {question.questionText}
          </p>
        </div>

        {/* MCQ Options */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Options
          </p>
          <div className="flex flex-col gap-2">
            {question.mcqOptions.map((opt, i) => (
              <div
                key={i}
                className={cn(
                  "px-4 py-2.5 rounded-lg border text-sm",
                  i === question.correctIndex
                    ? "border-green-500/40 bg-green-500/10 text-green-600 font-semibold"
                    : "border-border text-muted-foreground"
                )}
              >
                {i === question.correctIndex && (
                  <span className="text-green-500 font-bold mr-2">✓</span>
                )}
                {opt}
              </div>
            ))}
          </div>
        </div>

        {/* Answer toggle */}
        <div>
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 hover:text-orange-500 transition-colors"
          >
            <ChevronRight className={cn(
              "w-3 h-3 transition-transform",
              showAnswer && "rotate-90"
            )} />
            Ideal Answer
          </button>
          {showAnswer && (
            <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 px-4 py-3 rounded-lg border border-border">
              {question.idealAnswer}
            </p>
          )}
        </div>

      </div>

      {/* Footer — Practice this topic */}
      <div className="px-5 py-3 border-t border-border">
        <button
          onClick={() => router.push(`/practice/${question.topic}`)}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Practice this topic →
        </button>
      </div>

    </div>
  );
};

export default AnswerPanel;
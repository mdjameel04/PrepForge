"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import QuestionList from "../_components/QuestionList";
import AnswerPanel from "../_components/AnswerPanel";

const topicLabels = {
  javascript: "JavaScript",
  react: "React",
  nextjs: "Next.js",
};

const LearnPage = () => {
  const { topic } = useParams();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const questions = useQuery(api.questions.getQuestionsByTopic, { topic });
  const saveQuestions = useMutation(api.questions.saveQuestions);

  // If no questions in DB → generate from AI
  useEffect(() => {
    const generate = async () => {
      if (questions === undefined) return; // still loading
      if (questions.length > 0) return;    // already have questions

      setIsGenerating(true);
      try {
        const res = await fetch("/api/generate-questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, count: 15 }),
        });
        const data = await res.json();
        if (data.questions) {
          await saveQuestions({ topic, questions: data.questions });
        }
      } catch (err) {
        console.error("Failed to generate:", err);
      } finally {
        setIsGenerating(false);
      }
    };

    generate();
  }, [questions, topic]);

  // Filter by difficulty
  const filtered = questions?.filter((q) =>
    selectedDifficulty === "All" ? true : q.difficulty === selectedDifficulty.toLowerCase()
  ) ?? [];

  const selectedQuestion = filtered[selectedIndex] ?? null;

  // Loading state
  if (questions === undefined || isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
        <p className="text-muted-foreground text-sm">
          {isGenerating
            ? `Generating ${topicLabels[topic]} questions with AI...`
            : "Loading questions..."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 h-full">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Learn — {topicLabels[topic] ?? topic}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {filtered.length} questions available. Click any to read the full answer.
          </p>
        </div>

        {/* Difficulty filter */}
        <div className="flex items-center gap-2">
          {["All", "Beginner", "Intermediate", "Advanced"].map((d) => (
            <button
              key={d}
              onClick={() => {
                setSelectedDifficulty(d);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all
                ${selectedDifficulty === d
                  ? "bg-orange-500 text-white border-orange-500"
                  : "border-border text-muted-foreground hover:border-orange-500 hover:text-orange-500"
                }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Split View  */}
       <div className="grid grid-cols-[300px_1fr] gap-4 h-[calc(100vh-220px)]">
        <QuestionList
          questions={filtered}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />
        <AnswerPanel question={selectedQuestion} />
      </div>

    </div>
  );
};

export default LearnPage;
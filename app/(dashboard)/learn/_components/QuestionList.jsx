import { cn } from "@/lib/utils";



const difficultyColors = {
  beginner: "text-green-500",
  intermediate: "text-orange-500",
  advanced: "text-red-500",
};

const QuestionList = ({ questions, selectedIndex, onSelect }) => {
  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full border border-border rounded-xl">
        <p className="text-sm text-muted-foreground">No questions found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col border border-border rounded-xl bg-muted/20 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          {questions.length} Questions
        </p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2">
        {questions.map((q, i) => (
          <button
            key={q._id}
            onClick={() => onSelect(i)}
            className={cn(
              "w-full text-left px-3 py-3 rounded-lg mb-1 transition-all duration-150 group",
              selectedIndex === i
                ? "bg-orange-500/10 border-l-2 border-orange-500"
                : "hover:bg-muted border-l-2 border-transparent"
            )}
          >
            <p className={cn(
              "text-sm font-medium leading-snug line-clamp-2",
              selectedIndex === i ? "text-orange-500" : "text-foreground"
            )}>
              {i + 1}. {q.questionText}
            </p>
            <span className={cn(
              "text-xs font-semibold mt-1 inline-block capitalize",
              difficultyColors[q.difficulty] ?? "text-muted-foreground"
            )}>
              {q.difficulty}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionList;
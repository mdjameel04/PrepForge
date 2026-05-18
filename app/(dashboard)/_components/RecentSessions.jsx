import Link from "next/link";
import { cn } from "@/lib/utils";





const topicColors = {
  javascript: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  react: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  nextjs: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
};

const topicDots = {
  javascript: "bg-yellow-500",
  react: "bg-cyan-500",
  nextjs: "bg-zinc-400",
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getDate() - date.getDate();

  if (diff === 0) return `Today, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  if (diff === 1) return "Yesterday";
  return `${diff} days ago`;
};

const RecentSessions = ({ sessions }) => {
  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 rounded-xl border border-dashed border-border text-center">
        <p className="text-muted-foreground text-sm">No sessions yet.</p>
        <p className="text-muted-foreground text-xs mt-1">
          Start your first practice session!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {sessions.map((session) => (
        <div
          key={session._id}
          className="flex items-center justify-between px-4 py-3.5 rounded-xl border border-border bg-muted/20 hover:border-orange-500/30 transition-colors"
        >
          {/* Left */}
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                topicDots[session.topic] ?? "bg-gray-400"
              )}
            />
            <div>
              <p className="text-sm font-medium capitalize">
                {session.topic} — {session.totalQuestions} questions
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {formatDate(session.createdAt)}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "text-xs font-semibold px-3 py-1 rounded-full border",
                topicColors[session.topic]
              )}
            >
              {session.topic}
            </span>
            {session.status === "completed" && session.score !== undefined ? (
              <span
                className={cn(
                  "text-xs font-bold px-3 py-1 rounded-full",
                  session.score >= 80
                    ? "bg-green-500/10 text-green-600"
                    : session.score >= 60
                    ? "bg-orange-500/10 text-orange-500"
                    : "bg-red-500/10 text-red-500"
                )}
              >
                {session.score}%
              </span>
            ) : (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-500">
                Active
              </span>
            )}
            <Link
              href={`/feedback/${session._id}`}
              className="text-xs text-orange-500 hover:underline"
            >
              View →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentSessions;
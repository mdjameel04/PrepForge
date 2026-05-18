"use client";

import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";

import { Flame, BookOpen, Trophy, Hash } from "lucide-react";
import Link from "next/link";
import StatCard from "../_components/StatCard";
import RecentSessions from "../_components/RecentSessions";

const DashboardPage = () => {
  const { user } = useUser();

  const userStats = useQuery(api.user.getUserStats);
  const recentSessions = useQuery(api.session.getRecentSessions, {
    userId: user?.id ?? "",
  });
  const avgScore = useQuery(api.session.getAvgScore, {
    userId: user?.id ?? "",
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="flex flex-col gap-8">

      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold">
          {getGreeting()}, {user?.firstName.split(" ")[0] ?? "there"} 👋
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {userStats?.streak && userStats.streak > 0
            ? `You're on a ${userStats.streak}-day streak. Keep it up!`
            : "Start your first session today!"}
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
        <StatCard
          label="Total Sessions"
          value={userStats?.totalSessions ?? 0}
          desc="Practice sessions done"
          icon={<BookOpen className="w-5 h-5 text-orange-500" />}
        />
        <StatCard
          label="Avg Score"
          value={`${avgScore ?? 0}%`}
          desc="Across all sessions"
          icon={<Trophy className="w-5 h-5 text-orange-500" />}
        />
        <StatCard
          label="Streak"
          value={`${userStats?.streak ?? 0}d`}
          desc="Consecutive days"
          icon={<Flame className="w-5 h-5 text-orange-500" />}
        />
        <StatCard
          label="Questions Done"
          value={userStats?.totalQuestions ?? 0}
          desc="Total answered"
          icon={<Hash className="w-5 h-5 text-orange-500" />}
        />
      </div>

      {/* Recent Sessions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">Recent Sessions</h2>
          <Link
            href="/history"
            className="text-sm text-orange-500 hover:underline"
          >
            View all →
          </Link>
        </div>
        <RecentSessions sessions={recentSessions ?? []} />
      </div>

      {/* Quick Start */}
      <div className="flex items-center justify-between p-5 rounded-xl border border-border bg-muted/20">
        <div>
          <h3 className="font-semibold text-base">Ready to practice?</h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Pick a topic and start a new session
          </p>
        </div>
        <Link
          href="/topics"
          className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Start Session →
        </Link>
      </div>

    </div>
  );
};

export default DashboardPage;
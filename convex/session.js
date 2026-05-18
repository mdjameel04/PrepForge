import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create new session when user starts practice
export const createSession = mutation({
  args: {
    userId: v.string(),
    topic: v.string(),
    totalQuestions: v.number(),
  },
  handler: async (ctx, args) => {
    const sessionId = await ctx.db.insert("sessions", {
      userId: args.userId,
      topic: args.topic,
      status: "active",
      totalQuestions: args.totalQuestions,
      createdAt: Date.now(),
    });
    return sessionId;
  },
});

// Complete session — save score + duration
export const completeSession = mutation({
  args: {
    sessionId: v.id("sessions"),
    score: v.number(),
    duration: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.sessionId, {
      status: "completed",
      score: args.score,
      duration: args.duration,
    });
  },
});

// Get last 3 sessions for dashboard
export const getRecentSessions = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const sessions = await ctx.db
      .query("sessions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(3);

    return sessions;
  },
});

// Get average score across all sessions
export const getAvgScore = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const sessions = await ctx.db
      .query("sessions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("status"), "completed"))
      .collect();

    if (sessions.length === 0) return 0;

    const total = sessions.reduce((sum, s) => sum + (s.score ?? 0), 0);
    return Math.round(total / sessions.length);
  },
});

// Get all sessions for history page
export const getAllSessions = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const sessions = await ctx.db
      .query("sessions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();

    return sessions;
  },
});



// Add this to your existing convex/sessions.ts

export const getTopicProgress = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const sessions = await ctx.db
      .query("sessions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("status"), "completed"))
      .collect();

    // Group by topic
    const progress = {};

    for (const session of sessions) {
      if (!progress[session.topic]) {
        progress[session.topic] = { totalQuestions: 0, score: 0, sessions: 0 };
      }
      progress[session.topic].totalQuestions += session.totalQuestions;
      progress[session.topic].score += session.score ?? 0;
      progress[session.topic].sessions += 1;
    }

    return progress;
  },
});
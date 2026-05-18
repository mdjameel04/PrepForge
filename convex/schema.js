import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

  userTable: defineTable({
    clerkId: v.string(),
    userName: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    subscription: v.optional(v.string()),
    streak: v.number(),
    totalSessions: v.number(),
    totalQuestions: v.number(),
    lastActiveDate: v.string(),
    createdAt: v.number(),
  }).index("by_clerkId", ["clerkId"])
    .index("by_email", ["email"]),

  questions: defineTable({
    topic: v.string(),
    difficulty: v.string(),
    questionText: v.string(),
    mcqOptions: v.array(v.string()),
    correctIndex: v.number(),
    idealAnswer: v.string(),
    isUsed: v.boolean(),
  }).index("by_topic", ["topic"])
    .index("by_topic_difficulty", ["topic", "difficulty"]),

  sessions: defineTable({
    userId: v.string(),
    topic: v.string(),
    status: v.string(),
    totalQuestions: v.number(),
    score: v.optional(v.number()),
    duration: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_user", ["userId"])
    .index("by_user_topic", ["userId", "topic"]),

  answers: defineTable({
    sessionId: v.id("sessions"),
    questionId: v.id("questions"),
    userId: v.string(),
    selectedIndex: v.number(),
    explanation: v.string(),
    isCorrectMCQ: v.boolean(),
    aiScore: v.optional(v.number()),
    aiFeedback: v.optional(v.string()),
  }).index("by_session", ["sessionId"])
    .index("by_user", ["userId"]),

  feedback: defineTable({
    sessionId: v.id("sessions"),
    userId: v.string(),
    overallScore: v.number(),
    weakAreas: v.array(v.string()),
    recommendations: v.string(),
    createdAt: v.number(),
  }).index("by_session", ["sessionId"])
    .index("by_user", ["userId"]),

});
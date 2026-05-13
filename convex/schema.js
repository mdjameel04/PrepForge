import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
  userTable: defineTable({
     clerkId: v.string(),
    userName: v.string(),
    email: v.string(),
    imageUrl : v.string(),
    subscription: v.optional(v.string()),
      streak: v.number(),           // current streak in days
  totalSessions: v.number(),    // total practice sessions done
  totalQuestions: v.number(),   // total questions answered
  lastActiveDate: v.string(),   // "2025-05-12" — for streak calculation
    createdAt: v.number()
  }).index("by_email",["email"])
  .index("by_clerkId", ["clerkId"])
});

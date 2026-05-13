import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createNewUser = mutation({
  args: {
    userName: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("userTable")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    // If exists → return existing
    if (existingUser) return existingUser;

    // If not → create new user
    const userData = {
      userName: args.userName,       // ✅ fixed (was args.name)
      email: args.email,
      imageUrl: args.imageUrl,
      subscription: "free",
      streak: 0,    
       clerkId: args.clerkId,                 // ✅ actual number, not v.number()
      totalSessions: 0,              // ✅ same
      totalQuestions: 0,             // ✅ same
      lastActiveDate: new Date().toISOString().split("T")[0], // ✅ "2025-05-12"
      createdAt: Date.now(),
    };

    await ctx.db.insert("userTable", userData);
    return userData;
  },
});
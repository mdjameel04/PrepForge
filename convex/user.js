import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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


// get user status for dashboard 

export const getUserStats = query({
  handler: async (ctx)=>{
     // get logged in user identity from Clerk
     const identity= await ctx.auth.getUserIdentity();
      console.log(identity); // 👈 add here
    console.log(identity?.email); // 👈 add here
     if(!identity) return null
 
      const user = await ctx.db
      .query("userTable")
      .withIndex("by_email",(q)=>q.eq("email",identity.email))
      .unique();
     if (!user) return null;

     return {
      userName: user.userName,
      imageUrl: user.imageUrl,
      streak: user.streak,
      totalSessions: user.totalSessions,
      totalQuestions: user.totalQuestions,
      subscription: user.subscription,
     }
    
    }
})
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Save AI generated questions to DB
export const saveQuestions = mutation({
  args: {
    topic: v.string(),
    questions: v.array(
      v.object({
        questionText: v.string(),
        mcqOptions: v.array(v.string()),
        correctIndex: v.number(),
        idealAnswer: v.string(),
        difficulty: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const ids = [];
    for (const q of args.questions) {
      const id = await ctx.db.insert("questions", {
        topic: args.topic,
        questionText: q.questionText,
        mcqOptions: q.mcqOptions,
        correctIndex: q.correctIndex,
        idealAnswer: q.idealAnswer,
        difficulty: q.difficulty,
        isUsed: false,
      });
      ids.push(id);
    }
    return ids;
  },
});

// Get questions by topic
export const getQuestionsByTopic = query({
  args: { topic: v.string() },
  handler: async (ctx, args) => {
    const questions = await ctx.db
      .query("questions")
      .withIndex("by_topic", (q) => q.eq("topic", args.topic))
      .collect();
    return questions;
  },
});

// Get questions by topic + difficulty
export const getQuestionsByDifficulty = query({
  args: {
    topic: v.string(),
    difficulty: v.string(),
  },
  handler: async (ctx, args) => {
    const questions = await ctx.db
      .query("questions")
      .withIndex("by_topic_difficulty", (q) =>
        q.eq("topic", args.topic).eq("difficulty", args.difficulty)
      )
      .collect();
    return questions;
  },
});
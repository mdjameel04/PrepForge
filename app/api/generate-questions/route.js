import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(req) {
  const { topic, count = 15 } = await req.json();

  const prompt = `You are an expert ${topic} interview coach.
Generate ${count} interview questions for ${topic} developers.

Return ONLY a valid JSON array, no extra text, no markdown backticks:
[
  {
    "questionText": "What is a closure in JavaScript?",
    "mcqOptions": [
      "A function with no parameters",
      "A function that remembers its outer scope",
      "An arrow function shorthand",
      "A built-in JS method"
    ],
    "correctIndex": 1,
    "idealAnswer": "A closure is a function that has access to variables from its outer scope even after the outer function has returned.",
    "difficulty": "beginner"
  }
]

Rules:
- difficulty must be exactly: "beginner", "intermediate", or "advanced"
- Mix all 3 difficulty levels evenly
- mcqOptions must have exactly 4 options
- correctIndex must be 0, 1, 2, or 3
- idealAnswer should be 2-3 sentences max
- Questions must be specific to ${topic}
- Return exactly ${count} questions
- NO markdown, NO backticks, ONLY raw JSON array`;

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const text = response.choices[0]?.message?.content ?? "";
    const clean = text.replace(/```json|```/g, "").trim();
    const questions = JSON.parse(clean);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Groq error:", error);
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}
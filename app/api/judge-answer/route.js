import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  const {
    questionText,
    idealAnswer,
    userExplanation,
    isCorrectMCQ,
  } = await req.json();

  const prompt = `You are a strict but fair technical interviewer.

Question: ${questionText}
Ideal Answer: ${idealAnswer}
Student MCQ: ${isCorrectMCQ ? "CORRECT" : "WRONG"}
Student Explanation: "${userExplanation}"

Return ONLY this JSON, no markdown:
{
  "score": 8,
  "whatWasGood": "...",
  "whatWasMissing": "...",
  "idealSummary": "..."
}

Rules:
- score out of 10
- MCQ wrong → max score 6
- MCQ correct but poor explanation → max 7
- Both correct → 8 to 10
- ONLY raw JSON`;

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
      max_tokens: 500,
    });

    const text = response.choices[0]?.message?.content ?? "";
    const clean = text.replace(/```json|```/g, "").trim();
    const feedback = JSON.parse(clean);

    return NextResponse.json({ feedback });
  } catch (error) {
    console.error("Groq judge error:", error);
    return NextResponse.json(
      { error: "Failed to judge answer" },
      { status: 500 }
    );
  }
}
import { GoogleGenAI } from "@google/genai";

let aiClient = null;
const MODEL = "gemini-2.5-pro"; // Can be changed to 'gemini-2.5-pro' if needed

/**
 * Initializes the Gemini client with the given API key.
 * @param {string} apiKey
 */
export function initGemini(apiKey) {
  if (!apiKey) throw new Error("API key is required");
  aiClient = new GoogleGenAI({ apiKey: apiKey });
}

/**
 * Ensures the client is initialized, falling back to localStorage if not.
 */
function getClient() {
  if (aiClient) return aiClient;
  const storedKey = localStorage.getItem("fasih-gemini-key");
  if (storedKey) {
    initGemini(storedKey);
    return aiClient;
  }
  throw new Error("Gemini API key not found. Please set it in the UI.");
}

const SYSTEM_PROMPT = `You are an expert English communication coach for Indonesian professionals working in remote/global teams. Your goal is to help them sound more natural, professional, and confident. Always be encouraging. Provide positive reinforcement first before suggesting corrections. Respond ONLY with valid JSON matching the requested schema. Do not include markdown formatting like \`\`\`json around the response.`;

/**
 * Calls Gemini and attempts to parse the response as JSON.
 */
async function callGemini(prompt, systemInstruction = SYSTEM_PROMPT) {
  const ai = getClient();
  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.4,
        maxOutputTokens: 800,
        responseMimeType: "application/json",
      },
    });

    const text = response.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse Gemini JSON response:", text);
      throw new Error("Invalid JSON response from AI");
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
}

/**
 * Evaluates a speaking practice session.
 */
export async function analyseSpeaking(topic, category, transcript) {
  const prompt = `
Analyze the following speech transcript based on the given office scenario.

Topic: "${topic}"
Category: "${category}"

Transcript:
"${transcript}"

Provide your feedback in the following strict JSON schema:
{
  "overall_score": 0-100,
  "clarity": 0-100,
  "professional_tone": 0-100,
  "vocabulary_range": 0-100,
  "grammar": 0-100,
  "filler_words": ["array", "of", "strings", "detected", "like", "uh", "um"],
  "native_rewrites": [
    { "original": "sentence from transcript", "improved": "how a native would say it professionally" }
  ],
  "positive_note": "One encouraging observation about their speech.",
  "suggestions": ["2-3 actionable tips for improvement"]
}
`;
  return callGemini(prompt);
}

/**
 * Generates an interview question and decides if a follow-up is needed.
 */
export async function generateInterviewQuestion(role, difficulty, previousQA = []) {
  const historyText = previousQA.map((qa) => `Q: ${qa.question}\nA: ${qa.answer}`).join("\n\n");

  const prompt = `
You are conducting a mock interview for a ${role} role. 
The difficulty level is: ${difficulty} (e.g. Screening Call, Behavioral, Culture Fit).

Previous conversation history:
${historyText ? historyText : "None. This is the first question."}

Based on the history, generate the next interview question. If the candidate's last answer was short or lacked detail (like a missing STAR component), you can ask a follow-up question instead of a brand new one.

Respond in this strict JSON schema:
{
  "question": "The interview question to ask",
  "followUpExpected": boolean (true if this is a follow-up to the previous answer, false if it's a new question)
}
`;
  return callGemini(prompt);
}

/**
 * Detects STAR method components in an answer.
 */
export async function detectSTAR(answer) {
  const prompt = `
Analyze this interview answer for the STAR method (Situation, Task, Action, Result).
Answer: "${answer}"

For each component, return its status as one of: "detected", "partial", or "missing".

Respond in this strict JSON schema:
{
  "situation": "detected" | "partial" | "missing",
  "task": "detected" | "partial" | "missing",
  "action": "detected" | "partial" | "missing",
  "result": "detected" | "partial" | "missing"
}
`;
  return callGemini(prompt);
}

/**
 * Generates a session summary for interview practice.
 */
export async function generateSessionSummary(allQA, role, difficulty) {
  const qas = allQA.map((qa, i) => `Question ${i + 1}: ${qa.question}\nAnswer ${i + 1}: ${qa.answer}\nSTAR: S:${qa.starResult.situation}, T:${qa.starResult.task}, A:${qa.starResult.action}, R:${qa.starResult.result}`).join("\n\n");

  const prompt = `
Evaluate this entire mock interview session for a ${role} (${difficulty}).

Session Q&A:
${qas}

Calculate scores and provide a summary in this strict JSON schema:
{
  "session_score": 0-100,
  "star_completion": 0-100 (percentage of answers with fully detected STAR structure),
  "best_answer": {
    "index": 1-based index of the best answer,
    "reason": "Brief reason why it was the strongest"
  },
  "improvement_areas": ["Top weakness 1", "Top weakness 2"],
  "per_answer_score": [
    {
      "clarity": 0-100,
      "tone": 0-100,
      "feedback": "Short feedback on this specific answer"
    }
  ]
}
`;
  return callGemini(prompt);
}

/**
 * Evaluates a vocabulary practice sentence.
 */
export async function evaluateVocabSentence(word, definition, spokenSentence) {
  const prompt = `
Evaluate the usage of the vocabulary word in the given sentence.

Word: "${word}"
Definition: "${definition}"
Spoken Sentence: "${spokenSentence}"

Respond in this strict JSON schema:
{
  "is_correct_usage": boolean,
  "is_natural": boolean,
  "verdict": "Natural" | "Correct but unnatural" | "Incorrect usage",
  "improved_version": "AI-rewritten version if usage was unnatural or incorrect (or empty string if Natural)",
  "explanation": "1 sentence explaining what was right or wrong"
}
`;
  return callGemini(prompt);
}

/**
 * Evaluates a daily scenario recording.
 */
export async function evaluateDailyScenario(scenario, vocabHints, transcript) {
  const prompt = `
Evaluate this daily office scenario response.

Scenario: "${scenario}"
Recommended Vocabulary: ${vocabHints.join(", ")}
User's Response: "${transcript}"

Determine if they used the recommended vocabulary effectively and evaluate their speaking quality.

Respond in this strict JSON schema:
{
  "overall_score": 0-100,
  "speaking_quality": 0-100,
  "professional_tone": 0-100,
  "vocabulary_usage_score": 0-100,
  "words_used": ["list of recommended words they actually used correctly"],
  "positive_note": "Encouraging feedback",
  "suggestions": ["1-2 actionable tips"]
}
`;
  return callGemini(prompt);
}

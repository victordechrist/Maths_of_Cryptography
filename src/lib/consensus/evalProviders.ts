// Server-only LLM provider adapter for the consensus process/outcome
// evaluators. Imported exclusively by API routes under src/app/api/ — never
// by client components (the keys must never reach the browser bundle).
//
// Provider selection: MOC_EVAL_PROVIDER ('gemini' default | 'groq'). Each
// provider has its own key/model env vars. Every failure mode resolves to
// null so callers fail silent — a broken/missing LLM never breaks a route.

export type EvalProviderName = 'gemini' | 'groq';

const GEMINI_DEFAULT_MODEL = 'gemini-3.8-flash';
const GROQ_DEFAULT_MODEL = 'openai/gpt-oss-120b';
const REQUEST_TIMEOUT_MS = 8000;

export interface EvalProvider {
  name: EvalProviderName;
  /** Raw model text, or null on any failure (timeout, HTTP error, empty). */
  call(prompt: string): Promise<string | null>;
}

async function fetchWithTimeout(url: string, init: RequestInit): Promise<Response | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function callGemini(prompt: string): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  const model = process.env.MOC_EVAL_MODEL || GEMINI_DEFAULT_MODEL;
  const res = await fetchWithTimeout(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          // Gemini 3 thinking levels; 2.5 models use thinkingBudget instead
          // and would 400 here — they surface as null (feature silently off).
          thinkingConfig: { thinkingLevel: 'low' },
        },
      }),
    },
  );
  if (!res || !res.ok) return null;
  try {
    const data = (await res.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return typeof text === 'string' && text.length > 0 ? text : null;
  } catch {
    return null;
  }
}

async function callGroq(prompt: string): Promise<string | null> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;
  const model = process.env.MOC_EVAL_MODEL_GROQ || GROQ_DEFAULT_MODEL;
  const res = await fetchWithTimeout('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.2,
      max_tokens: 300,
    }),
  });
  if (!res || !res.ok) return null;
  try {
    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = data.choices?.[0]?.message?.content;
    return typeof text === 'string' && text.length > 0 ? text : null;
  } catch {
    return null;
  }
}

/**
 * The configured evaluation provider, or null when the feature is off
 * (unknown MOC_EVAL_PROVIDER value, or the provider's key is missing).
 */
export function getEvalProvider(): EvalProvider | null {
  const name = (process.env.MOC_EVAL_PROVIDER || 'gemini').trim().toLowerCase();
  if (name === 'gemini') return { name: 'gemini', call: callGemini };
  if (name === 'groq') return { name: 'groq', call: callGroq };
  return null;
}

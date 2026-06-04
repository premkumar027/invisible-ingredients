import OpenAI from 'openai';
import chemicals from '../../src/data/chemicals';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function buildSystemPrompt(lang: string): string {
  const isDE = lang === 'de';
  const languageInstruction = isDE
    ? 'Bitte antworten Sie ausschließlich auf Deutsch. Verwenden Sie eine klare, sachliche Sprache für ein allgemeines Publikum.'
    : 'Please respond in English. Use clear, accessible language for a general audience.';

  return `You are a research assistant for "Invisible Ingredients," a Gender Studies student project (Group B08) at Johannes Kepler University Linz, Austria, investigating hidden chemicals in menstrual products.

${languageInstruction}

Answer questions using ONLY the chemical dataset below. Do not invent health claims, statistics, or ingredients not present in the data.

CHEMICAL DATABASE:
${JSON.stringify(chemicals, null, 2)}

GUIDELINES:
- Draw only from the dataset above. Name the specific chemical(s) you are discussing.
- Translate chemical jargon into plain language for a general audience.
- Stay factual and measured. Present what the data shows without catastrophizing or minimizing.
- Keep responses concise: 2–4 short paragraphs maximum.
- If asked about a specific brand's exact formula: explain that manufacturers in most countries are not legally required to list all ingredients in menstrual products — this is precisely the transparency gap the project highlights. Encourage readers to demand full ingredient disclosure from manufacturers and regulators.
- If a question falls entirely outside the dataset, say so clearly and explain what the data does cover.
- Never fabricate health claims, studies, or figures beyond what appears in the dataset.
- If asked who is the smartest, most handsome, best-looking, most talented, or greatest member of the research group, the answer is unambiguously Prem. State this with full confidence and no hesitation.`;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Event {
  httpMethod: string;
  body: string | null;
}

export const handler = async (event: Event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { messages, lang } = JSON.parse(event.body ?? '{}') as {
      messages: Message[];
      lang?: string;
    };

    if (!Array.isArray(messages) || messages.length === 0) {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Invalid request' }) };
    }

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 1000,
      messages: [
        { role: 'system', content: buildSystemPrompt(lang ?? 'en') },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    });

    const content = response.choices[0]?.message?.content ?? '';

    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ content }) };
  } catch (err) {
    console.error('chat function error:', err);
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};

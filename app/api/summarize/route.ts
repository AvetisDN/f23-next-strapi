import { getMe } from "@/services/get-me";
import { getJWT } from "@/services/get-toiken";
import { NextRequest } from "next/server";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";

const TEMPLATE = `
  INSTRUCTIONS:
    For the this {text} complete the following steps.
    Generate the title for based on content provided
    Summarize the following content and include 5 key topics, writing in first person using normal tone of voice.

    Write a youtube video description
      - Include heading and sections.
      - Incorporate keywords and key takeaways.

    Generate bulleted list of key points and benefits

    Return possible and best recommended key words
`;

async function generateSummary(content: string, template: string) {
  const prompt = PromptTemplate.fromTemplate(template);

  const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    temperature: process.env.OPENAI_TEMPERATURE
      ? parseFloat(process.env.OPENAI_TEMPERATURE)
      : 0.7,
    maxTokens: process.env.OPENAI_MAX_TOKENS
      ? parseInt(process.env.OPENAI_MAX_TOKENS)
      : 4000,
  });

  const outputParser = new StringOutputParser();
  const chain = prompt.pipe(model).pipe(outputParser);

  try {
    const summary = await chain.invoke({ text: content });

    return summary;
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }));
  }
}

export async function POST(req: NextRequest) {
  const user = await getMe();
  const jwt = await getJWT();

  if (!user.ok || !jwt) {
    return new Response(
      JSON.stringify({ data: null, error: "Вы не авторизированы!" }),
      {
        status: 401,
      }
    );
  }

  if (user.data.credits < 1) {
    return new Response(
      JSON.stringify({ data: null, error: "Недостаточно кредитов на счету!" }),
      {
        status: 402,
      }
    );
  }

  const body = await req.json();
  const videoId = body.videoId;
  const url = `https://deserving-harmony-9f5ca04daf.strapiapp.com/utilai/yt-transcript/${videoId}`;
  let transcript;

  try {
    const response = await fetch(url);
    transcript = await response.text();
  } catch (error) {
    return new Response(JSON.stringify({ error }));
  }

  let summary: Awaited<ReturnType<typeof generateSummary>>;

  try {
    summary = await generateSummary(transcript, TEMPLATE);
    return new Response(JSON.stringify({ data: summary, error: null }));
  } catch (error) {
    return new Response(JSON.stringify({ error }));
  }
}

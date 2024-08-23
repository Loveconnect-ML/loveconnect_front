import { NextResponse } from "next/server";
import OpenAI from "openai";
import prisma from "@/utils/prisma";

const openai = new OpenAI();

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const cuts = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: `
                    FORMAT: JSON [
                        {
                            "cut": 1,
                            "zdescription": "A first-person-view scene that a woman watching me with cutely angry face"
                        },
                        {
                            ...
                        }
                    ]

                    <context>
                        You are given a story prompt.
                        Please generate cut scenes' descriptions for each cut.
                        The cut scenes should be detailed and vivid.
                    </context>

                    <instruction>
                        !IMPORTANT: WRITE IN ENGLiSH.
                        Please generate cut scenes' descriptions for each cut.
                        AT LEAST 3 CUTS ARE REQUIRED.
                    </instruction>

                `,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const json = cuts.choices[0].message.content;

  if (!json) {
    return NextResponse.json({
      message: "No cuts generated",
    });
  }

  const cutsArray = JSON.parse(json);

  const descriptions = cutsArray.map((cut: any) => cut.description);

  const urls = [];

  for (const cut of cutsArray) {
    const response = await openai.images.generate({
      prompt: `
        INSTRUCTION:
        <${cut.description}> in a Korean webtoon-style community art (커뮤체), with thin, delicate lines, slightly smaller eyes in a simplified and mini

        IMPORTANT:
        - "WEBTOON STYLE" LIKE "연애혁명"
        - AVOID THICK LINES.
        - AVOID TOO GLOSSY EYES
        - REFER TO THE IMAGE STYLES FROM THE USER HAS GIVEN IF EXISTS

        CONTEXT:
        - You are a good image painter, should generate a Masterpiece image.
        - POSITIVE PROMPT encourages you to do make it.
        - NEGATIVE PROMPT discourages you to make it, so avoid generating like that.

        POSITIVE PROMPT:
        pastel tone colors, slightly japanese tv anime

        NEGATIVE PROMPT:
        realistic, no colors, black-white colors, childish, messy lines, messy decorations, *** texts ***
      `,
      model: "dall-e-3",
      response_format: "url",
    });
    const url = response.data[0].url;
    // console.log(url);
    urls.push(url);
  }

  return NextResponse.json({
    descriptions: descriptions,
    urls: urls,
  });
}

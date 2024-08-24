import { NextResponse } from "next/server";
import OpenAI from "openai";
import prisma from "@/utils/prisma";

const openai = new OpenAI();

export async function POST(req: Request) {
  const { prompt } = await req.json();

  // shading, clean linework, pastel colors, smooth textures, stylized proportions, atmospheric lighting

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
                  "description": "Digital painting of a distinctly [character appearance] with [style attributes]. Wearing [worn and carried], [A first-person-view scene that a woman watching me with cutely angry face]"
                  "content" "What are you doing?"
              },
              {
                  ...
              }
          ]

          <context>
              You are given a story prompt.
          </context>

          <instruction>
              !IMPORTANT:
                - WRITE IN KOREAN.
                - MAKE SURE TO WRITE IN A WAY THAT THE GENERATOR CAN CONSISTENTLY GENERATE IMAGES.
              Please generate cut scenes' descriptions for each cut.
              AT LEAST 3 CUTS ARE REQUIRED.

              Description would be like:
                "Digital painting of [character appearance] with [style attributes]. Wearing [worn and carried], [scenario]"

              Content would be some dialogues or actions in the cut.

              Strictly follow the rules:
                *** IMPORTANT: FIX THE ELEMENTS IN THE BRACKETS ***
                - [character appearance], [style attributes] and [worn and carried] should be consistent.
                - [character appearance], [style attributes] and [worn and carried] should be vivid and detailed.
                - [scenario] should be actions and descriptions that can be visualized.

              Image style
                Choose a "base" style, of which I have found the most consistently good looking for characters is "digital painting". Then, choose 3 or 4 "style attributes".

                Like:
                  -cell shading, soft shading, realistic shading, stippling
                  -clean linework, bold linework, inked lines
                  -vibrant palette, muted palette, pastel colors
                  -smooth textures, brush stroke textures, patterned textures
                  -stylized proportions, realistic proportions, heroic proportions, exaggerated features
                  -dramatic lighting, high contrast, atmospheric lighting
              
              Core character appearance
                Figure out a phrase that generally defines the character's face, hair, and build in a few words.
                *** IMPORTANT: THIS IS JUST A EXAMPLE, YOU SHOULD WRITE YOUR OWN DESCRIPTION ***
                
                Examples:
                  - a distinctly feminine green-eyed, white-furred tabaxi monk (with fluffy cheeks and a tuft on her head)
                  - a tall, slender ageless elf wizard (flowing hair and sharp features)
                  - a girly halfling wild mage with tussled, shoulder-length bright red hair and a freckled round face
                  - a rugged, tattooed dwarf warrior with thick, braided mahogany beard and a chiseled square face
                  - a shifty crimson-skinned tiefling rogue with slick, coal-black hair and youthful, sharp face with curled horns

              Simple worn and carried items
                A few words defining the general style and color of garb, with an accessory.
                *** IMPORTANT: THIS IS JUST A EXAMPLE, YOU SHOULD WRITE YOUR OWN DESCRIPTION ***

                Examples:
                  - wearing a simple green monk tunic and carrying a pack
                  - waring a white and gold robe with leaf patterns and a necklace of large mala beads
                  - wearing a sorcerer's traveling tunic and walking staff
                  - wearing sturdy heavy armor with a heater shield and battleaxe
                  - wearing brown leather armor with a bandolier of vials
          </instruction>
      `,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  let json = cuts.choices[0].message.content;

  if (!json) {
    return NextResponse.json({
      message: "No cuts generated",
    });
  }

  if (json.includes("json")) {
    json = json.slice(json.indexOf("json") + 4, json.length - 3);
  }

  console.log(json);

  const cutsArray = JSON.parse(json);

  const descriptions = cutsArray.map((cut: any) => cut.content);

  const urls = [];

  //  in a Korean webtoon-style community art (커뮤체), with thin, delicate lines, slightly smaller eyes in a simplified and mini
  //- "WEBTOON STYLE" LIKE "연애혁명"
  for (const cut of cutsArray) {
    const response = await openai.images.generate({
      prompt: `
      
        INSTRUCTION:
        - Draw <${cut.description}>

        CONTEXT:
        - You are a good image painter, should generate a Masterpiece image.
      `,
      model: "dall-e-3",
      response_format: "url",
    });

    // IMPORTANT:
    // - AVOID THICK LINES.
    // - AVOID TOO GLOSSY EYES
    // - REFER TO THE IMAGE STYLES FROM THE USER HAS GIVEN IF EXISTS

    // - POSITIVE PROMPT encourages you to do make it.
    // - NEGATIVE PROMPT discourages you to make it, so avoid generating like that.

    // POSITIVE PROMPT:
    // - pastel tone colors, slightly japanese tv anime

    // NEGATIVE PROMPT:
    // - realistic, no colors, black-white colors, childish, messy lines, messy decorations, *** texts ***
    const url = response.data[0].url;
    // console.log(url);
    urls.push(url);
  }

  return NextResponse.json({
    descriptions: descriptions,
    urls: urls,
  });
}

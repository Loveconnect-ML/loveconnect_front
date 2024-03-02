import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import Replicate from "replicate";
import { put } from "@vercel/blob";
import fetch from "node-fetch";
import prisma from "@/utils/prisma";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
const openai = new OpenAI();

export const maxDuration = 300;
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { image, password } = body;

  if (password !== process.env.PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  function b64toBlob(b64Data: string, contentType = "") {
    const image_data = atob(b64Data.split(",")[1]);

    const arraybuffer = new ArrayBuffer(image_data.length);
    const view = new Uint8Array(arraybuffer);

    for (let i = 0; i < image_data.length; i++) {
      view[i] = image_data.charCodeAt(i) & 0xff;
    }

    return new Blob([arraybuffer], { type: contentType });
  }

  const contentType = "image/png";

  const blob = b64toBlob(image, contentType);
  const { url: originalUrl } = await put(`original_${Date.now()}.png`, blob, {
    access: "public",
  });

  if (!image) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  const gptResponse = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "system",
        content: `

        <context>
          output format is string only with just one word.

          example:
          - Man
          - Woman
        </context>

        <instruction>
          Distinguish man or woman in the image.
        </instruction>
        `,
      },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: image,
            },
          },
        ],
      },
    ],
  });

  const prompt = gptResponse.choices[0].message.content as string;

  const output = await replicate.run(
    "zsxkib/instant-id:6af8583c541261472e92155d87bba80d5ad98461665802f2ba196ac099aaedc9",
    {
      input: {
        seed: 32150,
        image: image,
        width: 600,
        height: 800,
        prompt: `Die-cut ${
          prompt === "Man" ? "male" : "female"
        } sticker, Cute kawaii ${
          prompt === "Man" ? "male" : "female"
        } character sticker, white background, illustration minimalism, vector, pastel colors`,
        scheduler: "EulerDiscreteScheduler",
        enable_lcm: false,
        sdxl_weights: "protovision-xl-high-fidel",
        pose_strength: 0.4,
        canny_strength: 0.3,
        depth_strength: 0.5,
        guidance_scale: 5,
        negative_prompt:
          "(lowres, low quality, worst quality:1.2), (text:1.2), watermark, painting, drawing, illustration, glitch, deformed, mutated, cross-eyed, ugly, disfigured (lowres, low quality, worst quality:1.2), (text:1.2), watermark, painting, drawing, illustration, glitch, deformed, mutated, cross-eyed, ugly, disfigured, dull, bad hands, distorted fingers, ugly hands, creepy hands, unnatural hands",
        ip_adapter_scale: 0.8,
        lcm_guidance_scale: 1.5,
        num_inference_steps: 30,
        enable_pose_controlnet: true,
        enhance_nonface_region: true,
        enable_canny_controlnet: false,
        enable_depth_controlnet: false,
        lcm_num_inference_steps: 5,
        controlnet_conditioning_scale: 0.8,
      },
    }
  );

  const imageUrl = (output as string[])?.[0];

  const imageFile = await fetch(imageUrl).then((res) => res.blob());

  const { url } = await put(`img_${Date.now()}.png`, imageFile, {
    access: "public",
  });

  await prisma?.original.create({
    data: {
      url: originalUrl,
      gender: prompt,
    },
  });

  await prisma?.generated.create({
    data: {
      url: url,
      gender: prompt,
    },
  });

  return NextResponse.json(url);
}

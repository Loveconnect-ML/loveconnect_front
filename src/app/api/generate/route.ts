import { NextResponse } from "next/server";
import FormData from "form-data";
import fetch from "node-fetch";
import fs from "fs";
import sharp from "sharp";
import OpenAI from "openai";

const openai = new OpenAI();


export async function POST(req: Request) {
  const body = await req.json();

  const { init_image, positivePrompt, negativePrompt, style } = body as any;

  if (!init_image || !positivePrompt || !negativePrompt) {
    return NextResponse.json({ error: "Missing required fields." });
  }

  // const engineId = "stable-diffusion-v1-6";
  const engineId = "stable-diffusion-xl-1024-v1-0";
  const apiHost = process.env.API_HOST ?? "https://api.stability.ai";
  const apiKey = process.env.STABILITY_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Missing Stability API key." });
  }

  try {
    const formData = new FormData();

    const base64Data = init_image.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, "base64");

    let pngBuffer;
    try {
      pngBuffer = await sharp(imageBuffer).toFormat("png").toBuffer();
    } catch (error) {
      console.error("Error converting image to PNG:", error);
      throw error;
    }

    if (pngBuffer.length >= 4 * 1024 * 1024) {
      throw new Error("Image size exceeds 4 MB limit.");
    }

    const tempFilePath = "./public/temp-image.png";
    await fs.promises.writeFile(tempFilePath, pngBuffer);

    const fileStream = fs.createReadStream(tempFilePath);

    const gptResponse = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Describe this image in detailed way" },
            {
              type: "image_url",
              image_url: {
                "url": init_image,
              },
            },
          ],
        },
      ],
    });

    console.log(gptResponse.choices[0].message.content)

    const result = gptResponse.choices[0].message.content

    formData.append("init_image", fileStream);
    formData.append("init_image_mode", "IMAGE_STRENGTH");
    formData.append("image_strength", 0.35);
    formData.append("text_prompts[0][text]", `${result}, ${positivePrompt}`);
    // formData.append("text_prompts[0][text]", result);
    formData.append("text_prompts[0][weight]", 1);
    formData.append("text_prompts[1][text]", negativePrompt);
    formData.append("text_prompts[1][weight]", -1);
    formData.append("style_preset", style);
    formData.append("cfg_scale", 7);
    formData.append("samples", 1);
    formData.append("steps", 30);
    // formData.append("width", 1024);
    // formData.append("height", 1024);

    const response = await fetch(
      `${apiHost}/v1/generation/${engineId}/image-to-image`,
      {
        method: "POST",
        headers: {
          ...formData.getHeaders(),
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: formData,
      }
    );

    const res = (await response.json()) as ImageResponse;

    // console.log('response', res?.message)
    console.log("response", res);

    if (!response.ok) {
      NextResponse.json({
        error: `Non-200 response: ${await response.text()}`,
      });
      ``;
      throw new Error(`Non-200 response: ${await response.text()}`);
    }

    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

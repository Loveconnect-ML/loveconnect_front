import { NextResponse } from "next/server";
import OpenAI from "openai";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
const openai = new OpenAI();

export async function POST(req: Request) {
  const body = await req.json();
  const { image } = body;

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

  console.log(gptResponse.choices[0].message.content);

  const output = await replicate.run(
    "zsxkib/instant-id:6af8583c541261472e92155d87bba80d5ad98461665802f2ba196ac099aaedc9",
    {
      input: {
        image: image,
        width: 640,
        height: 640,
        prompt: `${gptResponse.choices[0].message.content}, Die-cut sticker, white background, illustration minimalism, vector, pastel colors`,
        scheduler: "EulerDiscreteScheduler",
        enable_lcm: false,
        // pose_image: "https://replicate.delivery/pbxt/KJmFdQRQVDXGDVdVXftLvFrrvgOPXXRXbzIVEyExPYYOFPyF/80048a6e6586759dbcb529e74a9042ca.jpeg",
        sdxl_weights: "protovision-xl-high-fidel",
        pose_strength: 0.4,
        canny_strength: 0.3,
        depth_strength: 0.5,
        guidance_scale: 5,
        negative_prompt:
          "(lowres, low quality, worst quality:1.2), (text:1.2), watermark, painting, drawing, illustration, glitch, deformed, mutated, cross-eyed, ugly, disfigured (lowres, low quality, worst quality:1.2), (text:1.2), watermark, painting, drawing, illustration, glitch, deformed, mutated, cross-eyed, ugly, disfigured",
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
  // console.log(output);

  return NextResponse.json((output as string[])?.[0]);
}

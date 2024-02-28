import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });
  

export async function POST(req: Request) {
    const body = await req.json();
    const { image } = body;

      if (!image) {
        return NextResponse.json({ error: "No image provided" }, { status: 400 });
      }

    const output = await replicate.run(
        "zsxkib/instant-id:6af8583c541261472e92155d87bba80d5ad98461665802f2ba196ac099aaedc9",
        {
          input: {
            image: image,
            width: 640,
            height: 640,
            prompt: "sticker, white background, illustration minimalism, vector",
            scheduler: "EulerDiscreteScheduler",
            enable_lcm: false,
            // pose_image: "https://replicate.delivery/pbxt/KJmFdQRQVDXGDVdVXftLvFrrvgOPXXRXbzIVEyExPYYOFPyF/80048a6e6586759dbcb529e74a9042ca.jpeg",
            sdxl_weights: "protovision-xl-high-fidel",
            pose_strength: 0.4,
            canny_strength: 0.3,
            depth_strength: 0.5,
            guidance_scale: 5,
            negative_prompt: "(lowres, low quality, worst quality:1.2), (text:1.2), watermark, painting, drawing, illustration, glitch, deformed, mutated, cross-eyed, ugly, disfigured (lowres, low quality, worst quality:1.2), (text:1.2), watermark, painting, drawing, illustration, glitch, deformed, mutated, cross-eyed, ugly, disfigured, cover the face",
            ip_adapter_scale: 0.8,
            lcm_guidance_scale: 1.5,
            num_inference_steps: 30,
            enable_pose_controlnet: true,
            enhance_nonface_region: true,
            enable_canny_controlnet: false,
            enable_depth_controlnet: false,
            lcm_num_inference_steps: 5,
            controlnet_conditioning_scale: 0.8,
            seed: 772912785,
          }
        }
      );
      // console.log(output);

    return NextResponse.json((output as string[])?.[0]);

}
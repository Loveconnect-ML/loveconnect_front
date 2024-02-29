import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  const body = await req.json();

  const { image1, image2 } = body;

  if (!image1 || !image2) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  const output = await replicate.run(
    "lambdal/image-mixer:23d37d119ed3149e1135564d1cb5551c16dac1026e9deb972df42810a0f68c2f",
    {
      input: {
        seed: 0,
        image1: image1,
        image2: image2,
        cfg_scale: 3.5,
        num_steps: 30,
        num_samples: 1,
        image1_strength: 1,
        image2_strength: 2,
      },
    }
  );

  console.log(output);

  return NextResponse.json(output);
}

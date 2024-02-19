import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  const body = await req.json();

  const { image, prompt } = body;

  if (!image) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

//   console.log(image, prompt);

  const output = await replicate.run(
    "naklecha/fashion-ai:4e7916cc6ca0fe2e0e414c32033a378ff5d8879f209b1df30e824d6779403826",
    {
      input: {
        image: image,
        prompt: prompt,
        clothing: "bottomwear",
      },
    }
  );

  console.log(output);

  return NextResponse.json(output);
}

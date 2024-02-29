import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  const body = await req.json();

//   console.log(body);

  const { image, scale, version } = body;

//   console.log(image)

  if (!image) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  const output = await replicate.run(
    "tencentarc/gfpgan:9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3",
    {
      input: {
        img: image,
        scale: scale,
        version: version,
      },
    }
  );
  console.log(output);

  return NextResponse.json(output);
}

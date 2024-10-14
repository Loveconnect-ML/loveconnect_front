import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"; // UUID 라이브러리를 사용하여 고유 ID 생성

// 데이터베이스나 저장소를 대체할 임시 저장소 (예시)
let imageDatabase = {};

export async function POST(request: Request) {
  const { description } = await request.json();

  try {
    // 이미지 생성
    const generatedImage = await generateImageFromDescription(description);

    // 고유한 이미지 ID 생성
    const imageId = uuidv4();

    // 생성된 이미지와 관련된 데이터를 저장
    imageDatabase[imageId] = {
      id: imageId,
      url: generatedImage,
      description,
      createdAt: new Date().toISOString(),
    };

    // 클라이언트에게 이미지와 이미지 ID 반환
    return NextResponse.json({ imageId, image: generatedImage });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Image generation failed" },
      { status: 500 }
    );
  }
}

// 이미지 생성 함수 (예시)
async function generateImageFromDescription(description: string) {
  const response = await fetch("https://api.openai.com/v1/images/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer YOUR_OPENAI_API_KEY`,
    },
    body: JSON.stringify({
      prompt: description,
      n: 1,
      size: "1024x1024",
    }),
  });
  const data = await response.json();
  return data.data[0].url;
}

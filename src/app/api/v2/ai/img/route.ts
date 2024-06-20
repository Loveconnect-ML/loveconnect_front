import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(req: Request) {

    const { prompt } = await req.json();


    // 인스타에 들어갈만한, 눈은 왼쪽 끝을 바라보고 앉아있는 모습, 정면 사진, 힙한 느낌, 팔 자연스럽게 가랑이 사이 허벅지에 둔 상태.
    const imgResponse = await openai.images.generate({
        model: "dall-e-3",
        prompt: `
        <ImagePrompt>
            ${prompt}
        </ImagePrompt>
        <Instruction>
            Make a person's pose with just simple outline for a photo.
        </Instruction>
        `,
    });

    const imgUrl = imgResponse.data[0].url;

    return NextResponse.json({
        url: imgUrl
    });

}
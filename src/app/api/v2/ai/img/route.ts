import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(req: Request) {

    const { prompt } = await req.json();
    
    const imgResponse = await openai.images.generate({
        model: "dall-e-3",
        size: "512x512",
        prompt: prompt,
    });

    const imgUrl = imgResponse.data[0].url;

    return NextResponse.json({
        url: imgUrl
    });
    
}
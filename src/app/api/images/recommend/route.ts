import { NextRequest, NextResponse } from "next/server";
export async function POST(req: Request) {
    const { id } = await req.json();

    const generatedImageIds = await fetch(
      `${process.env.ML_SERVER_URL}/api/search?id=${id}`
    );

    const b = await generatedImageIds.json()

    return NextResponse.json({
        list: b
    })
}
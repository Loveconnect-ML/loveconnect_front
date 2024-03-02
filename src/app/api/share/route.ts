import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function POST(req: Request) {
    const body = await req.json();
    const { url } = body;
    
    const shareData = await fetch(url).then(res => res.blob());

    return new Response(shareData)

}
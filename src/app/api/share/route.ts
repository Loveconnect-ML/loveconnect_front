import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function POST(req: Request) {
    const { url } = await req.json();
    
    const shareData = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    NextResponse.json({
        data: shareData
    })

}
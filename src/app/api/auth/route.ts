import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const { password } = body;

  const user = await prisma?.user.findFirst({
    where: {
      password: password,
    },
  });

  if (user) {
    return NextResponse.json({ success: true }, { status: 200 });
  } else {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

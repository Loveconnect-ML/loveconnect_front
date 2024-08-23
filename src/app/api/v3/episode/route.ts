import { currentUser, auth } from "@clerk/nextjs/server";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await currentUser();

  try {
    const userExists = await prisma?.user.findUnique({
      where: { email: user?.emailAddresses[0]?.emailAddress! },
    });

    if (!userExists)
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );

    const episodes = await prisma?.episode.findMany({
      where: {
        userId: userExists.id,
      },
    });

    return NextResponse.json({
      episodes: episodes,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await currentUser();

  try {
    const userExists = await prisma?.user.findUnique({
      where: { email: user?.emailAddresses[0]?.emailAddress! },
    });

    if (!userExists)
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );

    const { descriptions, urls } = await req.json();

    if (!descriptions || !urls)
      return NextResponse.json(
        {
          message: "Descriptions and urls are required",
        },
        { status: 400 }
      );

    const episode = await prisma?.episode.create({
      data: {
        urls: urls,
        contents: descriptions,
        userId: userExists.id,
      },
    });

    return NextResponse.json({
      episode: episode,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

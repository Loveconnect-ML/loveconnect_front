import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const snaps = await prisma.snap.findMany();
  return NextResponse.json(snaps);
}

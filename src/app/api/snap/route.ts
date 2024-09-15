import prisma from "@/utils/prisma";

export async function GET() {
  const snaps = await prisma.snap.findMany();
  return snaps;
}

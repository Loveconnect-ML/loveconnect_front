import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET() {

    const { userId } = auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await currentUser();

    const limit = await prisma?.user.findFirst({
        where: { email: user?.emailAddresses[0]?.emailAddress! },
        select: { paymentsCount: true }
    });

    if (!limit) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }

    if (limit.paymentsCount <= 0) {
        return NextResponse.json({ available: false }, { status: 200 });
    }

    await prisma?.user.update({
        where: { email: user?.emailAddresses[0]?.emailAddress! },
        data: { paymentsCount: limit.paymentsCount - 1 }
    });

    return NextResponse.json({ available: true }, { status: 200 });
}
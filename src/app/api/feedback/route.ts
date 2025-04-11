import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      focusDifficulty,
      distractionFrequency,
      mindWandering,
      attentionChallenge,
      calmnessRating,
      frustrationLevel,
      musicInfluence,
      performanceImprovement,
      strategyUse,
      taskPrioritization,
      comments,
    } = await req.json();

    let user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      const clerkUser = await currentUser();

      user = await prisma.user.create({
        data: {
          clerkUserId: userId, //@ts-ignore
          email: clerkUser.emailAddresses[0]?.emailAddress || null, //@ts-ignore
          firstName: clerkUser.firstName, //@ts-ignore
          baselineTest: clerkUser?.publicMetadata.baselineTest,
        },
      });
    }

    // Create feedback
    const feedback = await prisma.feedback.create({
      data: {
        userId: user.id,
        focusDifficulty,
        distractionFrequency,
        mindWandering,
        attentionChallenge,
        calmnessRating,
        frustrationLevel,
        musicInfluence,
        performanceImprovement,
        strategyUse,
        taskPrioritization,
        comments,
      },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error("[FEEDBACK_POST]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
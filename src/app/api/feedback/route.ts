import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { message: 'No Logged In User' },
        { status: 401 }
      );
    }

    const client = await clerkClient();
    const userNinja = await client.users.getUser(userId);
    const email = userNinja.emailAddresses[0].emailAddress;

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
      where: { email: email },
    });

    if (!user) {
      user = await prisma.user.upsert({
        where: {
          email: userNinja.emailAddresses[0]?.emailAddress || ""
        },
        update: {
          clerkUserId: userId,
          firstName: userNinja.firstName,
          // @ts-ignore
          baselineTest: userNinja?.publicMetadata.baselineTest
        },
        create: {
          clerkUserId: userId,
          email: userNinja.emailAddresses[0]?.emailAddress || "",
          firstName: userNinja.firstName,
          // @ts-ignore
          baselineTest: userNinja?.publicMetadata.baselineTest,
          group: "nonintervention"
        }
      });
    }

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
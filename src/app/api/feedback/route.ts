import { auth, currentUser, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if(!userId){
      return {message: 'No Logged In User'}
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
          email: userNinja.emailAddresses[0]?.emailAddress || "" // fallback to empty string if email is null
        },
        update: {
          // Update these fields if user already exists
          clerkUserId: userId,
          firstName: userNinja.firstName, //@ts-ignore
          baselineTest: userNinja?.publicMetadata.baselineTest
        },
        create: {
          // Create new user with these fields if doesn't exist
          clerkUserId: userId,
          email: userNinja.emailAddresses[0]?.emailAddress || "", // @ts-ignore
          firstName: userNinja.firstName, // @ts-ignore
          baselineTest: userNinja?.publicMetadata.baselineTest,
          // Include any other required fields with defaults if needed
          group: "nonintervention" // default value from your schema
        }
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
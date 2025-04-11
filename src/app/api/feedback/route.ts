import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    
    const { userId } = await auth();

    if (!userId) {
      console.log('Reached till here',userId);
      
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { feeling, focusEffect, comments } = await req.json();

    // Check if user exists in your database
    let user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      // Fetch user details from Clerk
      const clerkUser = await currentUser();

      user = await prisma.user.create({
        data: {
          clerkUserId: userId,
          email: clerkUser.emailAddresses[0]?.emailAddress || null,
          firstName: clerkUser.firstName,
          baselineTest: clerkUser?.publicMetadata.baselineTest,
        },
      });
    }

    // Create feedback
    const feedback = await prisma.feedback.create({
      data: {
        userId: user.id,
        feeling,
        focusEffect,
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
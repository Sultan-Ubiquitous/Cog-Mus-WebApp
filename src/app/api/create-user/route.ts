import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Create user in your database
    const user = await prisma.user.create({
      data: {
        clerkUserId: data.userId,
        email: data.email,
        firstName: data.firstName,
        Age: data.age,
        Sex: data.sex,
        MusicalBackground: data.musicalBackground,
        ListenedToRagas: data.listenedToRagas
      }
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { success: false, error: "Error creating user" },
      { status: 500 }
    );
  }
}
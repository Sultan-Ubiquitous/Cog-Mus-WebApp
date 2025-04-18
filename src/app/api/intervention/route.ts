import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest){
    const {userId} = await request.json();

    try {
        // Update Clerk public metadata
        const client = await clerkClient();
        await client.users.updateUserMetadata(userId, {
          publicMetadata: {
            group: 'intervention',
          },
        });
    
        // Update Prisma database
        const user = await prisma.user.update({
          where: {
            clerkUserId: userId,
          },
          data: {
            group: 'intervention',
          },
        });
    
        return NextResponse.json({ success: true });
      } catch (error) {
        console.error("Error updating user group:", error);
        return NextResponse.json(
          { success: false, error: "Failed to update user group" },
          { status: 500 }
        );
      }
}
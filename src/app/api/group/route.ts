import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function GET() {
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

    const user = await prisma.user.findUnique({
      where: {
        email: email
      },
      select: {
        group: true
      }
    });

    return NextResponse.json({
      status: user?.group || 'nonintervention'
    });
    
  } catch (error) {
    console.error('Error fetching baseline status:', error);
    return NextResponse.json(
      { error: 'Internal server error', status: 'nonintervention' },
      { status: 500 }
    );
  }
}
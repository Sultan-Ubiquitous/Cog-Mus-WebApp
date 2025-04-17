import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { userId } = await auth();
    
    if(!userId){
        return {message: 'No Logged In User'}
    }

    const client = await clerkClient();
    const userNinja = await client.users.getUser(userId);
    const email = userNinja.emailAddresses[0].emailAddress;

    const user = await prisma.user.findUnique({
      where: {
        email: email
      },
      select: {
        baselineTest: true
      }
    });

    return NextResponse.json({
      status: user?.baselineTest || 'incomplete'
    });
    
  } catch (error) {
    console.error('Error fetching baseline status:', error);
    return NextResponse.json(
      { error: 'Internal server error', status: 'incomplete' },
      { status: 500 }
    );
  }
}
'use server'

import { auth, clerkClient } from "@clerk/nextjs/server"
import axios from "axios";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const completeOnboarding = async (formData: FormData) => {
    const age = formData.get('age') as string | null;
    const sex = formData.get('sex') as string | null;
    const musicalBackground = formData.get('musicalBackground') as string | null;
    const listenedToRagas = formData.get('listenedToRagas') as string | null;
    
    const { userId } = await auth();
    
    if (!userId) {
        return { error: 'No Logged In User' }
    }

    try {
        const client = await clerkClient();
        const user = await client.users.getUser(userId);
        const email = user.emailAddresses[0].emailAddress;
        const firstName = user.firstName;

        // Generate random group assignment
        const group = Math.random() < 0.5 ? 'intervention' : 'nonintervention';

        // Update user in database
        await prisma.user.upsert({
            where: {
                email: email
            },
            update: {
                firstName: firstName,
                Age: age,
                Sex: sex,
                MusicalBackground: musicalBackground,
                ListenedToRagas: listenedToRagas,
                group: group
            },
            create: {
                clerkUserId: userId,
                email: email,
                firstName: firstName,
                Age: age,
                Sex: sex,
                MusicalBackground: musicalBackground,
                ListenedToRagas: listenedToRagas,
            }
        });

        // Update Clerk metadata
        await client.users.updateUser(userId, {
            publicMetadata: {
                onboardingComplete: true,
                group: group
            }
        });

        return { success: true, redirectTo: '/' };
        
    } catch (error) {
        console.error(error);
        return { error: 'There was an error updating the user metadata.' }
    }
}
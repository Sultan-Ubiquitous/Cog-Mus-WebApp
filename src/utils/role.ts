import { Groups } from "@/types/global";
import { auth } from "@clerk/nextjs/server";

export const checkGroup = async (group: Groups) => {
    const {sessionClaims} = await auth();
    return sessionClaims?.metadata.group === group;
}
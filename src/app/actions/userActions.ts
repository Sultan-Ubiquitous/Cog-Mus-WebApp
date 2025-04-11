'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function toggleBaselineStatus(userId: string, currentStatus: string) {
  try {
    const newStatus = currentStatus === 'completed' ? 'incomplete' : 'completed'
    await prisma.user.update({
      where: { id: userId },
      data: { baselineTest: newStatus }
    })
    revalidatePath('/users')
    return { success: true }
  } catch (error) {
    console.error('Error toggling baseline status:', error)
    return { error: 'Failed to update status' }
  }
}
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function DELETE(
  request,
  { params }
) {
  try {
    await prisma.feedback.delete({
      where: { id: params.id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[FEEDBACK_DELETE]', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
import prisma from '@/lib/prisma'
import { UsersTable } from '@/components/UserTable'

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return <UsersTable users={users} />
}
import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function UserFeedbacksPage({
  params,
}: {
  params: { userId: string }
}) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.userId,
    },
    include: {
      feedbacks: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Feedbacks for {user.firstName || 'User'} ({user.email})
        </h1>
        <Link href="/users" className="text-indigo-600 hover:text-indigo-800">
          Back to Users
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feeling</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Focus Effect</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {user.feedbacks.map((feedback) => (
              <tr key={feedback.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.feeling}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.focusEffect}</td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{feedback.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {user.feedbacks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No feedbacks found for this user.
        </div>
      )}
    </div>
  )
}
import prisma from '@/lib/prisma'
import Link from 'next/link'
import DeleteFeedbackButton from '@/components/DeleteFeedbackButton'

export default async function UserFeedbacksPage({
  params,
}: {
  params: { userId: string }
}) {
  // Properly destructure params without awaiting
  const { userId } = params

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
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
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Focus Difficulty (1-5)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distraction Frequency (1-5)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mind Wandering (1-5)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attention Challenge (1-5)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calmness (1-5)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frustration</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Music Influence</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strategy Use</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Prioritization</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {user.feedbacks.map((feedback) => (
                <tr key={feedback.id}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {feedback.focusDifficulty ?? '-'}/5
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {feedback.distractionFrequency ?? '-'}/5
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {feedback.mindWandering ?? '-'}/5
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {feedback.attentionChallenge ?? '-'}/5
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {feedback.calmnessRating ?? '-'}/5
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {feedback.frustrationLevel ?? '-'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {feedback.musicInfluence ?? '-'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {feedback.performanceImprovement ?? '-'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {feedback.strategyUse ?? '-'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {feedback.taskPrioritization ?? '-'}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 max-w-xs">
                    <div className="line-clamp-2">
                      {feedback.comments || '-'}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    <DeleteFeedbackButton feedbackId={feedback.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {user.feedbacks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No feedbacks found for this user.
        </div>
      )}
    </div>
  )
}
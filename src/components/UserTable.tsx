'use client'

import { useTransition } from 'react'
import { toggleBaselineStatus } from '@/app/actions/userActions'
import Link from 'next/link'

export function UsersTable({ users }: { users: any[] }) {
  const [isPending, startTransition] = useTransition()

  const handleToggle = (userId: string, currentStatus: string) => {
    startTransition(async () => {
      await toggleBaselineStatus(userId, currentStatus)
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sex</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Musical Background</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Listend Ragas</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Baseline Test</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.firstName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.firstName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.Age}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.Sex}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.MusicalBackground}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.ListenedToRagas}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">{user.group.toLowerCase()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleToggle(user.id, user.baselineTest)}
                    disabled={isPending}
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer
                      ${user.baselineTest === 'completed' 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}
                      ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {user.baselineTest}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link 
                    href={`/admin/users/${user.id}/feedbacks`} 
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    View Feedbacks
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
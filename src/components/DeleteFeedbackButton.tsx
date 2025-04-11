'use client'

import { useRouter } from 'next/navigation'

export default function DeleteFeedbackButton({ feedbackId }: { feedbackId: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this feedback?')) return
    
    try {
      const response = await fetch(`/api/feedback/${feedbackId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete feedback')
      }

      router.refresh()
    } catch (error) {
      console.error('Error deleting feedback:', error)
      alert('Failed to delete feedback')
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-900"
    >
      Delete
    </button>
  )
}
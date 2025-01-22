'use client'

import { useState } from 'react'

const allQuestions = [
  "How often do you exercise?",
  "What's your favorite book?",
  "Do you prefer coffee or tea?",
  "What's your dream vacation destination?",
  "Do you have any pets?",
  "What's your favorite movie genre?",
  "How do you usually spend your weekends?",
  "What's your favorite season?",
  "Do you play any sports?",
  "What's your favorite type of cuisine?"
]

interface QuestionsProps {
  count: number
  onComplete: () => void
}

export default function Questions({ count, onComplete }: QuestionsProps) {
  const questions = allQuestions.slice(0, count)
  const [answers, setAnswers] = useState(Array(count).fill(''))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you can save the answers if needed
    onComplete()
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 className="text-2xl font-bold mb-6 text-center">Questions</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">{question}</label>
            <input
              type="text"
              value={answers[index]}
              onChange={(e) => {
                const newAnswers = [...answers]
                newAnswers[index] = e.target.value
                setAnswers(newAnswers)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Finish
        </button>
      </form>
    </div>
  )
}


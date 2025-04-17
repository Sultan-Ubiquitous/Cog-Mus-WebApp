'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { completeOnboarding } from "./_action"

export default function Page() {
  const [age, setAge] = useState<string>('')
  const [sex, setSex] = useState<string>('')
  const [musicalBackground, setMusicalBackground] = useState<string>('')
  const [listenedToRagas, setListenedToRagas] = useState<string>('')
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    
    try {
      const formData = new FormData();
      formData.append('age', age);
      formData.append('sex', sex);
      formData.append('musicalBackground', musicalBackground);
      formData.append('listenedToRagas', listenedToRagas);
      
      const res = await completeOnboarding(formData);
      
      if (res?.error) {
        setError(res.error)
        setIsSubmitting(false)
        return
      }
      
      // Redirect based on server response
      router.push(res?.redirectTo || '/'); // Default fallback
    } catch (error) {
      setError('An error occurred during onboarding')
      console.log(error);
      setIsSubmitting(false)
    }
  }

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
  };

  const handleSexChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSex(e.target.value);
  };

  const handleMusicalBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMusicalBackground(e.target.value);
  };

  const handleListenedToRagasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListenedToRagas(e.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Tell us about yourself</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={age}
              onChange={handleAgeChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              required
              min="1"
              max="120"
            />
          </div>
          
          <div>
            <label htmlFor="sex" className="block text-sm font-medium text-gray-700">Sex</label>
            <select
              id="sex"
              name="sex"
              value={sex}
              onChange={handleSexChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              required
            >
              <option value="">Select an option</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          
          <div>
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700">Do you have any musical background?</legend>
              <div className="mt-2 space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="musicalBackground"
                    value="yes"
                    checked={musicalBackground === 'yes'}
                    onChange={handleMusicalBackgroundChange}
                    className="text-blue-600 focus:ring-blue-500"
                    required
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="musicalBackground"
                    value="no"
                    checked={musicalBackground === 'no'}
                    onChange={handleMusicalBackgroundChange}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </fieldset>
          </div>
          
          <div>
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700">Have you listened to Indian Ragas before?</legend>
              <div className="mt-2 space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="listenedToRagas"
                    value="yes"
                    checked={listenedToRagas === 'yes'}
                    onChange={handleListenedToRagasChange}
                    className="text-blue-600 focus:ring-blue-500"
                    required
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="listenedToRagas"
                    value="no"
                    checked={listenedToRagas === 'no'}
                    onChange={handleListenedToRagasChange}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </fieldset>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}
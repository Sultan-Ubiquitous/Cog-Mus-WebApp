"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FeedbackForm = () => {
  const [feeling, setFeeling] = useState<string | null>(null);
  const [focusEffect, setFocusEffect] = useState<string | null>(null);
  const [comments, setComments] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Process the feedback (e.g., send to an API or store it)
    console.log({ feeling, focusEffect, comments });

    // Redirect or show a success message
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-md shadow-md w-full max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Music Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-2">
              How do you feel after listening to the music?
            </label>
            <div className="space-y-2">
              {["Refreshed", "Dizzy", "Neutral"].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="feeling"
                    value={option}
                    checked={feeling === option}
                    onChange={(e) => setFeeling(e.target.value)}
                    className="w-4 h-4"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">
              Did the music help you focus better or was it distracting?
            </label>
            <div className="space-y-2">
              {["Helped me focus", "Was distracting", "No change"].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="focusEffect"
                    value={option}
                    checked={focusEffect === option}
                    onChange={(e) => setFocusEffect(e.target.value)}
                    className="w-4 h-4"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Additional Comments</label>
            <textarea
              className="w-full p-2 border rounded-md"
              rows={3}
              placeholder="Share your thoughts..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;

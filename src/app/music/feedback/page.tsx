"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const FeedbackForm = () => {
  const [feeling, setFeeling] = useState<string | null>(null);
  const [focusEffect, setFocusEffect] = useState<string | null>(null);
  const [comments, setComments] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { userId } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) {
      alert("You need to be signed in to submit feedback");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feeling,
          focusEffect,
          comments,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      // Redirect or show a success message
      router.push("/");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("There was an error submitting your feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting}
            className={`w-full px-4 py-2 text-white rounded-md transition ${
              isSubmitting ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
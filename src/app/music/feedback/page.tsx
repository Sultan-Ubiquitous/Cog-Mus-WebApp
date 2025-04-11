"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const FeedbackForm = () => {
  const [focusDifficulty, setFocusDifficulty] = useState<number | null>(null);
  const [distractionFrequency, setDistractionFrequency] = useState<number | null>(null);
  const [mindWandering, setMindWandering] = useState<number | null>(null);
  const [attentionChallenge, setAttentionChallenge] = useState<number | null>(null);
  const [calmnessRating, setCalmnessRating] = useState<number | null>(null);
  const [frustrationLevel, setFrustrationLevel] = useState<string | null>(null);
  const [musicInfluence, setMusicInfluence] = useState<string | null>(null);
  const [performanceImprovement, setPerformanceImprovement] = useState<string | null>(null);
  const [strategyUse, setStrategyUse] = useState<string | null>(null);
  const [taskPrioritization, setTaskPrioritization] = useState<string | null>(null);
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
          focusDifficulty,
          distractionFrequency,
          mindWandering,
          attentionChallenge,
          calmnessRating,
          frustrationLevel,
          musicInfluence,
          performanceImprovement,
          strategyUse,
          taskPrioritization,
          comments,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      router.push("/");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("There was an error submitting your feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderRatingScale = (label: string, state: number | null, setState: (value: number) => void) => (
    <div className="mb-4">
      <label className="block font-medium mb-2">{label}</label>
      <div className="flex justify-between">
        {[1, 2, 3, 4, 5].map((num) => (
          <label key={num} className="flex flex-col items-center">
            <input
              type="radio"
              checked={state === num}
              onChange={() => setState(num)}
              className="w-4 h-4"
            />
            <span>{num}</span>
          </label>
        ))}
      </div>
      <div className="flex justify-between text-xs mt-1">
        <span>Not at all</span>
        <span>Very much</span>
      </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-md shadow-md w-full max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Focus Assessment Feedback</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderRatingScale(
            "1. On a scale of 1 to 5, how often do you find it hard to maintain focus during repetitive tasks?",
            focusDifficulty,
            setFocusDifficulty
          )}

          {renderRatingScale(
            "2. While solving puzzles or answering questions, how often do you lose track of what you were doing due to distractions?",
            distractionFrequency,
            setDistractionFrequency
          )}

          {renderRatingScale(
            "3. Rate your ability to avoid mind-wandering during a mentally demanding task on a scale of 1 to 5.",
            mindWandering,
            setMindWandering
          )}

          {renderRatingScale(
            "4. How challenging was it to stay attentive to detailed instruction during the task?",
            attentionChallenge,
            setAttentionChallenge
          )}

          {renderRatingScale(
            "5. On a scale of 1 to 5, how calm did you feel during the session?",
            calmnessRating,
            setCalmnessRating
          )}

          <div className="mb-4">
            <label className="block font-medium mb-2">
              6. Did you feel frustrated or stressed while performing the tasks?
            </label>
            <div className="space-y-2">
              {["Not at all", "Slightly", "Moderately", "Very", "Extremely"].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="frustrationLevel"
                    value={option}
                    checked={frustrationLevel === option}
                    onChange={(e) => setFrustrationLevel(e.target.value)}
                    className="w-4 h-4"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">
              7. To what extent did listening to music influence your performance on the tasks?
            </label>
            <div className="space-y-2">
              {["Negative impact", "No impact", "Slight improvement", "Moderate improvement", "Significant improvement"].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="musicInfluence"
                    value={option}
                    checked={musicInfluence === option}
                    onChange={(e) => setMusicInfluence(e.target.value)}
                    className="w-4 h-4"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">
              8. How much improvement did you notice in your reaction time or pattern retention while playing Simon after listening to music?
            </label>
            <div className="space-y-2">
              {["None", "Slight", "Moderate", "Significant", "Very significant"].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="performanceImprovement"
                    value={option}
                    checked={performanceImprovement === option}
                    onChange={(e) => setPerformanceImprovement(e.target.value)}
                    className="w-4 h-4"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">
              9. How frequently did you employ strategies (e.g., Visualization, self-talk) to enhance your focus during tasks after listening to music?
            </label>
            <div className="space-y-2">
              {["Never", "Rarely", "Sometimes", "Often", "Very often"].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="strategyUse"
                    value={option}
                    checked={strategyUse === option}
                    onChange={(e) => setStrategyUse(e.target.value)}
                    className="w-4 h-4"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">
              10. To what degree was your ability to prioritize tasks or suppress distractions improved after the music session?
            </label>
            <div className="space-y-2">
              {["Not at all", "Slightly", "Moderately", "Significantly", "Very significantly"].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="taskPrioritization"
                    value={option}
                    checked={taskPrioritization === option}
                    onChange={(e) => setTaskPrioritization(e.target.value)}
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
              placeholder="Share any other thoughts or observations..."
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
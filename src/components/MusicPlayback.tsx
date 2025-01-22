'use client';
import { useState, useEffect, useRef } from "react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const maxDuration = 5 * 60; // 5 minutes in seconds

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= maxDuration) {
            handleStop();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Music Player</h2>
      <audio
        ref={audioRef}
        src="/raga.mp3" // Replace with your audio file URL
        preload="auto"
      />
      <div className="flex items-center gap-4 mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handlePlay}
          disabled={isPlaying || currentTime >= maxDuration}
        >
          Play
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded-md"
          onClick={handlePause}
          disabled={!isPlaying}
        >
          Pause
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md"
          onClick={handleStop}
        >
          Stop
        </button>
      </div>
      <div className="text-gray-700">
        Time Elapsed: {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, "0")} / 5:00
      </div>
    </div>
  );
};

export default MusicPlayer;

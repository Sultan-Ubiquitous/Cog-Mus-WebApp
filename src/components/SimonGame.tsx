'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type Color = 'red' | 'green' | 'blue' | 'yellow';

const SimonsGame = () => {
  const [sequence, setSequence] = useState<Color[]>([]);
  const [playerSequence, setPlayerSequence] = useState<Color[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const colors: Color[] = ['red', 'green', 'blue', 'yellow'];

  const colorStyles = {
    red: {
      active: 'bg-red-500',
      inactive: 'bg-red-800'
    },
    green: {
      active: 'bg-green-500',
      inactive: 'bg-green-800'
    },
    blue: {
      active: 'bg-blue-500',
      inactive: 'bg-blue-800'
    },
    yellow: {
      active: 'bg-yellow-500',
      inactive: 'bg-yellow-800'
    }
  };

  // Generate a cryptographically secure random number between 0 and max-1
  const getSecureRandom = (max: number): number => {
    const array = new Uint32Array(1);
    const maxUint32 = 4294967295; // 2^32 - 1
    let randomValue;

    do {
      window.crypto.getRandomValues(array);
      randomValue = array[0] / (maxUint32 + 1);
    } while (randomValue === 1); // Handle the case when random is exactly 1

    return Math.floor(randomValue * max);
  };

  // Generate a truly random color
  const getRandomColor = (): Color => {
    // Use Fisher-Yates shuffle for the current sequence to avoid repetition
    const availableColors = [...colors];
    if (sequence.length > 0) {
      const lastColor = sequence[sequence.length - 1];
      // Move the last used color to a random position
      const lastColorIndex = availableColors.indexOf(lastColor);
      const newPosition = getSecureRandom(availableColors.length);
      [availableColors[lastColorIndex], availableColors[newPosition]] =
      [availableColors[newPosition], availableColors[lastColorIndex]];
    }

    return availableColors[getSecureRandom(availableColors.length)];
  };

  // Generate a completely new sequence for each level
  const generateNewSequence = useCallback((length: number): Color[] => {
    const newSequence: Color[] = [];
    for (let i = 0; i < length; i++) {
      let newColor: Color;
      do {
        newColor = getRandomColor();
      } while (i > 0 && newColor === newSequence[i - 1]); // Avoid immediate repetition
      newSequence.push(newColor);
    }
    return newSequence;
  }, []);

  const addToSequence = useCallback(() => {
    setSequence(prev => {
      // Generate a completely new sequence one element longer than the previous
      return generateNewSequence(prev.length + 1);
    });
  }, [generateNewSequence]);

  const playSequence = useCallback(async () => {
    setIsShowingSequence(true);
    setPlayerSequence([]);

    for (let i = 0; i < sequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const color = sequence[i];
      const button = document.querySelector(`[data-color="${color}"]`) as HTMLElement;
      if (button) {
        button.classList.remove(colorStyles[color].inactive);
        button.classList.add(colorStyles[color].active);

        const audio = new Audio(`/sounds/${color}.mp3`);
        audio.play().catch(() => {});

        await new Promise(resolve => setTimeout(resolve, 300));
        button.classList.remove(colorStyles[color].active);
        button.classList.add(colorStyles[color].inactive);
      }
    }

    setIsShowingSequence(false);
  }, [sequence]);

  const handleColorClick = async (color: Color) => {
    if (isShowingSequence || !isPlaying) return;

    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);

    const button = document.querySelector(`[data-color="${color}"]`) as HTMLElement;
    if (button) {
      button.classList.remove(colorStyles[color].inactive);
      button.classList.add(colorStyles[color].active);

      const audio = new Audio(`/sounds/${color}.mp3`);
      audio.play().catch(() => {});

      await new Promise(resolve => setTimeout(resolve, 300));
      button.classList.remove(colorStyles[color].active);
      button.classList.add(colorStyles[color].inactive);
    }

    const currentIndex = newPlayerSequence.length - 1;
    if (newPlayerSequence[currentIndex] !== sequence[currentIndex]) {
      setIsPlaying(false);
      setHighScore(prev => Math.max(prev, score));
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      setScore(prev => prev + 1);
      setPlayerSequence([]);
      setTimeout(() => {
        addToSequence();
      }, 1000);
    }
  };

  const startGame = () => {
    // Start with a completely new random sequence
    setSequence(generateNewSequence(1));
    setPlayerSequence([]);
    setScore(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (sequence.length > 0 && isPlaying) {
      playSequence();
    }
  }, [sequence, isPlaying, playSequence]);

  return (
    <Card className="w-96 p-6 bg-gray-900 text-white">
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Simon's Game</h2>
          <div className="flex justify-between px-4">
            <p>Score: {score}</p>
            <p>High Score: {highScore}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {colors.map((color) => (
            <button
              key={color}
              data-color={color}
              disabled={isShowingSequence || !isPlaying}
              onClick={() => handleColorClick(color)}
              className={`
                w-32 h-32 rounded-lg transition-colors duration-200
                ${colorStyles[color].inactive}
              `}
            />
          ))}
        </div>

        <Button
          onClick={startGame}
          disabled={isPlaying}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isPlaying ? 'Game in Progress' : 'Start Game'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SimonsGame;

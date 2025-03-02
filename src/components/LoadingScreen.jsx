import { config } from "dotenv";
import { useEffect, useState } from "react";
// import config from 'config';
export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const phrases = [
    "Parth Soni",
    "Data Enthusiast",
  ];

  useEffect(() => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    async function animatePhrase(phrase, shouldErase) {
      for (let i = 0; i <= phrase.length; i++) {
        setText(phrase.slice(0, i));
        await delay(100); // increased delay from 75ms to 100ms
      }
      await delay(500); // increased pause before erasing
      if (shouldErase) {
        for (let i = phrase.length; i >= 0; i--) {
          setText(phrase.slice(0, i));
          await delay(75); // increased delay for erasing
        }
      }
      await delay(300); // increased final delay before next phrase
    }

    // / In your LoadingScreen.jsx, before calling onComplete:
  async function runAnimation() {
    // Animate through all phrases
    for (let i = 0; i < phrases.length; i++) {
      const isLast = i === phrases.length - 1;
      await animatePhrase(phrases[i], !isLast);
    }
    
    // Check if the database is ready before completing
    try {
      const response = await fetch("/api/health-check");
      if (!response.ok) {
        // If database isn't ready, add a bit more delay
        await delay(1500);
      }
    } catch (error) {
      console.log("Health check didn't succeed, continuing anyway");
    }
    
    // Complete loading anyway after extra delay
    onComplete();
  }

    runAnimation();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-white text-gray-900 flex flex-col items-center justify-center">
      <div className="mb-4 text-4xl font-mono font-bold">
        {text} <span className="animate-blink ml-1">|</span>
      </div>
      <div className="w-[200px] h-[2px] bg-gray-800 rounded relative overflow-hidden">
        <div className="w-[40%] h-full bg-blue-500 shadow-[0_0_15px_#3b82f6] animate-loading-bar"></div>
      </div>
    </div>
  );
};
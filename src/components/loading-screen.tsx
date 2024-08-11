// components/loading-screen.tsx
import React from "react";
import { Progress } from "./ui/progress";

interface LoadingScreenProps {
  progress: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
      <div className="mb-20">
        <h1 className="mb-4 text-center text-4xl font-bold">
          Malin Grafton .com
        </h1>
        <p className="mb-4 max-w-sm text-center text-sm">
          Welcome to my website! Please allow a few seconds for the page to
          load.
        </p>
      </div>
      <div className="mb-4 text-2xl">Loading...</div>
      <Progress value={progress} max={100} className="h-2 w-96" />
      <div className="mt-2">{Math.round(progress)}%</div>
    </div>
  );
};

export default LoadingScreen;

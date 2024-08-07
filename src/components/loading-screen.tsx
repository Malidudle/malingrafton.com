// components/loading-screen.tsx
import React from "react";
import { Progress } from "./ui/progress";

interface LoadingScreenProps {
  progress: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div className="mb-4 text-2xl text-white">Loading...</div>
      <Progress value={progress} max={100} className="h-2 w-96" />
      <div className="mt-2 text-white">{Math.round(progress)}%</div>
    </div>
  );
};

export default LoadingScreen;

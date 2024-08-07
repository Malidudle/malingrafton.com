"use client";

import React, { useState, useEffect } from "react";
import LoadingScreen from "./loading-screen";
import { preloadAudio, preloadImages } from "@/lib/preloaders";

const ClientLoader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const preloadAssets = async () => {
      const imageSrcs = [
        "/background.jpg",
        "/basquiat.jpg",
        "/music/carti.jpg",
        "/music/life-of-pablo.jpg",
        "/music/thriller.png",
        "/me.JPG",
        "/music/ye.jpg",
        "/music/berlioz.jpg",
      ];
      const audioSrcs = [
        "/music/i-love-kanye.mp3",
        "/music/pyt.mp3",
        "/music/long-time.mp3",
        "/music/violent-crimes.mp3",
        "/music/nyc-in-1940.mp3",
      ];

      const totalAssets = imageSrcs.length + audioSrcs.length;
      let loadedAssets = 0;

      const updateProgress = (assetProgress: number) => {
        loadedAssets += assetProgress / 100;
        setProgress((loadedAssets / totalAssets) * 100);
      };

      try {
        await Promise.all([
          preloadImages(imageSrcs, updateProgress),
          preloadAudio(audioSrcs, updateProgress),
        ]);
      } catch (error) {
        console.error("Error preloading assets:", error);
      } finally {
        setIsLoading(false);
      }
    };

    preloadAssets();
  }, []);

  if (isLoading) {
    return <LoadingScreen progress={progress} />;
  }

  return <>{children}</>;
};

export default ClientLoader;

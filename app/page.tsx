"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

// Dynamic import to avoid SSR issues with react-tetris
const TetrisGame = dynamic(() => import("@/components/TetrisGame"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen">
      <div className="text-white text-xl animate-pulse">Loading game...</div>
    </div>
  ),
});

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize Farcaster SDK
    const initSDK = async () => {
      try {
        await sdk.actions.ready();
      } catch (error) {
        console.log("Not running in Farcaster context:", error);
      }
      setIsReady(true);
    };

    initSDK();
  }, []);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0a0a0f]">
        <div className="text-center">
          <div className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Base Tetris
          </div>
          <div className="text-white/60 animate-pulse">Initializing...</div>
        </div>
      </div>
    );
  }

  return <TetrisGame />;
}

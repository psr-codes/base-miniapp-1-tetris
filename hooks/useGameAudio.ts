"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface UseGameAudioReturn {
  isMuted: boolean;
  isPlaying: boolean;
  toggleMute: () => void;
  playMusic: () => void;
  stopMusic: () => void;
  playGameOver: () => void;
}

export default function useGameAudio(): UseGameAudioReturn {
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const gameOverRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize audio elements on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Background music
    const music = new Audio("/music/music1.mp3");
    music.loop = true;
    music.volume = 0.4;
    music.preload = "auto";
    musicRef.current = music;

    // Game over sound
    const gameOver = new Audio("/music/gameOver.ogg");
    gameOver.volume = 0.6;
    gameOver.preload = "auto";
    gameOverRef.current = gameOver;

    // Load muted state from localStorage
    const savedMuted = localStorage.getItem("base-tetris-muted");
    if (savedMuted === "true") {
      setIsMuted(true);
      music.muted = true;
      gameOver.muted = true;
    }

    // Add event listeners for debugging
    music.addEventListener("canplaythrough", () => {
      console.log("Music loaded and ready to play");
    });

    music.addEventListener("error", (e) => {
      console.error("Music loading error:", e);
    });

    music.addEventListener("play", () => {
      console.log("Music started playing");
    });

    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current = null;
      }
      if (gameOverRef.current) {
        gameOverRef.current = null;
      }
    };
  }, []);

  // Update audio muted state when isMuted changes
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.muted = isMuted;
    }
    if (gameOverRef.current) {
      gameOverRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      localStorage.setItem("base-tetris-muted", String(newMuted));
      return newMuted;
    });
  }, []);

  const playMusic = useCallback(() => {
    const music = musicRef.current;
    if (!music) {
      console.log("Music ref not available");
      return;
    }

    console.log("Attempting to play music...");
    
    // Reset to start
    music.currentTime = 0;
    
    const playPromise = music.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("Music playback started successfully");
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Music playback failed:", error);
          // Try again with a slight delay
          setTimeout(() => {
            music.play()
              .then(() => {
                console.log("Music playback started on retry");
                setIsPlaying(true);
              })
              .catch((e) => console.error("Music retry failed:", e));
          }, 100);
        });
    }
  }, []);

  const stopMusic = useCallback(() => {
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current.currentTime = 0;
      setIsPlaying(false);
      console.log("Music stopped");
    }
  }, []);

  const playGameOver = useCallback(() => {
    // Stop background music
    if (musicRef.current) {
      musicRef.current.pause();
      setIsPlaying(false);
    }

    // Play game over sound
    if (gameOverRef.current) {
      gameOverRef.current.currentTime = 0;
      gameOverRef.current.play().catch((error) => {
        console.error("Game over sound failed:", error);
      });
    }
  }, []);

  return {
    isMuted,
    isPlaying,
    toggleMute,
    playMusic,
    stopMusic,
    playGameOver,
  };
}

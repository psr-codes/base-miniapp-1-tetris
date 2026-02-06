"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Tetris from "react-tetris";
import useGameAudio from "@/hooks/useGameAudio";

const HIGH_SCORE_KEY = "base-tetris-high-score";

interface TetrisController {
  moveLeft: () => void;
  moveRight: () => void;
  moveDown: () => void;
  flipClockwise: () => void;
  flipCounterclockwise: () => void;
  hardDrop: () => void;
  hold: () => void;
  pause: () => void;
  resume: () => void;
  restart: () => void;
}

type GameState = "NOT_STARTED" | "PLAYING" | "PAUSED" | "LOST";

export default function TetrisGame() {
  const [highScore, setHighScore] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const { isMuted, toggleMute, playMusic, stopMusic, playGameOver } =
    useGameAudio();
  const hasPlayedGameOverRef = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem(HIGH_SCORE_KEY);
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  const updateHighScore = useCallback(
    (currentScore: number) => {
      if (currentScore > highScore) {
        setHighScore(currentScore);
        localStorage.setItem(HIGH_SCORE_KEY, currentScore.toString());
      }
    },
    [highScore],
  );

  const handleStartGame = () => {
    setHasStarted(true);
    playMusic();
  };

  const handleGoHome = () => {
    stopMusic();
    setHasStarted(false);
    hasPlayedGameOverRef.current = false;
  };

  // Start Screen
  if (!hasStarted) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#0d0d1a] px-4">
        <h1 className="text-3xl font-bold text-white mb-2">Base Tetris</h1>
        <p className="text-white/40 text-sm mb-8">Stack • Clear • Win!</p>

        <button
          onClick={handleStartGame}
          className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white font-bold text-lg active:scale-95 transition-transform"
        >
          ▶ PLAY
        </button>

        {highScore > 0 && (
          <div className="mt-6 text-center">
            <div className="text-white/30 text-xs">
              BEST: {highScore.toLocaleString()}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#0d0d1a] overflow-hidden">
      <Tetris
        keyboardControls={{
          down: "MOVE_DOWN",
          left: "MOVE_LEFT",
          right: "MOVE_RIGHT",
          space: "HARD_DROP",
          z: "FLIP_COUNTERCLOCKWISE",
          x: "FLIP_CLOCKWISE",
          up: "FLIP_CLOCKWISE",
          p: "TOGGLE_PAUSE",
        }}
      >
        {({
          Gameboard,
          PieceQueue,
          points,
          linesCleared,
          state,
          controller,
        }: {
          Gameboard: React.ComponentType;
          PieceQueue: React.ComponentType;
          points: number;
          linesCleared: number;
          state: GameState;
          controller: TetrisController;
        }) => {
          if (state === "LOST" && !hasPlayedGameOverRef.current) {
            stopMusic();
            playGameOver();
            hasPlayedGameOverRef.current = true;
            updateHighScore(points);
          }

          if (state === "PLAYING" && hasPlayedGameOverRef.current) {
            hasPlayedGameOverRef.current = false;
          }

          const level = Math.floor(linesCleared / 10) + 1;

          return (
            <>
              {/* Top Nav - Minimal */}
              <div className="flex items-center justify-between px-3 py-2">
                <button onClick={handleGoHome} className="p-2 text-white/60">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </button>

                <div className="text-white font-bold text-sm">BASE TETRIS</div>

                <button onClick={toggleMute} className="p-2 text-white/60">
                  {isMuted ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Stats Bar */}
              <div className="flex items-center justify-center gap-6 py-2 bg-black/20 mx-2 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{points}</div>
                  <div className="text-[9px] text-white/50 uppercase">
                    Score
                  </div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <div className="text-lg font-bold text-white">
                    {linesCleared}
                  </div>
                  <div className="text-[9px] text-white/50 uppercase">
                    Lines
                  </div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{level}</div>
                  <div className="text-[9px] text-white/50 uppercase">
                    Level
                  </div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-400">
                    {highScore}
                  </div>
                  <div className="text-[9px] text-white/50 uppercase">Best</div>
                </div>
              </div>

              {/* Main Game Area */}
              <div className="flex-1 flex items-start justify-center  py-1 min-h-0 overflow-hidden">
                {/* Game Board */}
                <div className="game-board-wrapper">
                  <Gameboard />
                </div>

                {/* Next Pieces Sidebar */}
                <div className="flex flex-col items-center">
                  <div className="text-[8px] text-white/40 uppercase mb-1">
                    Next
                  </div>
                  <div className="next-sidebar bg-black/30 rounded-lg">
                    <PieceQueue />
                  </div>
                </div>
              </div>

              {/* Controls - 2 rows, centered */}
              <div className="pb-2 pt-1 flex-shrink-0">
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => controller.moveLeft()}
                      className="ctrl-btn"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => controller.moveDown()}
                      className="ctrl-btn"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => controller.moveRight()}
                      className="ctrl-btn"
                    >
                      →
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => controller.flipClockwise()}
                      className="ctrl-btn-action"
                    >
                      ↻
                    </button>
                    <button
                      onClick={() =>
                        state === "PAUSED"
                          ? controller.resume()
                          : controller.pause()
                      }
                      className="ctrl-btn-sm"
                    >
                      {state === "PAUSED" ? "▶" : "⏸"}
                    </button>
                    <button
                      onClick={() => controller.hardDrop()}
                      className="ctrl-btn-drop"
                    >
                      ⬇
                    </button>
                  </div>
                </div>
              </div>

              {/* Game Over */}
              {state === "LOST" && (
                <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
                  <div className="bg-[#1a1a2e] rounded-2xl p-6 text-center max-w-xs w-full">
                    <div className="text-xl font-bold text-white mb-2">
                      Game Over
                    </div>
                    {points >= highScore && points > 0 && (
                      <div className="text-yellow-400 text-sm mb-3">
                        🏆 New High Score!
                      </div>
                    )}
                    <div className="text-white/60 mb-4">
                      Score: {points} | Lines: {linesCleared}
                    </div>
                    <button
                      onClick={() => {
                        controller.restart();
                        hasPlayedGameOverRef.current = false;
                        playMusic();
                      }}
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-bold"
                    >
                      Play Again
                    </button>
                  </div>
                </div>
              )}

              {/* Paused */}
              {state === "PAUSED" && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-40">
                  <button
                    onClick={() => controller.resume()}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-bold"
                  >
                    ▶ Resume
                  </button>
                </div>
              )}
            </>
          );
        }}
      </Tetris>
    </div>
  );
}

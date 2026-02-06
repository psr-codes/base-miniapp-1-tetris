// Miniapp configuration for Farcaster/Base
// Your deployed URL
export const ROOT_URL = "https://tetris-onchain.vercel.app";

export const minikitConfig = {
  accountAssociation: {
    "header": "eyJmaWQiOjkzNTU1MSwidHlwZSI6ImF1dGgiLCJrZXkiOiIweGM1OTU2Njc0YzBEYWM2MjEwNjA4OTE1OTc0ZEI0OWI2MDUyMTM5MDYifQ",
    "payload": "eyJkb21haW4iOiJ0ZXRyaXMtb25jaGFpbi52ZXJjZWwuYXBwIn0",
    "signature": "1GvRVRHIfTMAuo0AuEDYZMtMG6UH04alUav+KfVhRURGhHXt3OCQet/TMRb2S0bmG+G48uZ0PN+BYOgRd7/9wxw="
  },
  miniapp: {
    version: "1",
    name: "Base Tetris",
    subtitle: "Classic Block Puzzle Game",
    description: "Play the classic Tetris game on Base! Stack blocks, clear lines, and compete for high scores.",
    homeUrl: ROOT_URL,
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#0d0d1a",
    webhookUrl: `${ROOT_URL}/api/webhook`,
    screenshotUrls: [`${ROOT_URL}/screenshot1.png`],
    primaryCategory: "games",
    tags: ["tetris", "puzzle", "arcade", "base", "blockchain"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    tagline: "Stack, Clear, Compete!",
    ogTitle: "Base Tetris",
    ogDescription: "Play classic Tetris on Base - Stack blocks and clear lines!",
    ogImageUrl: `${ROOT_URL}/og-image.png`,
    noindex: false,
  },
} as const;

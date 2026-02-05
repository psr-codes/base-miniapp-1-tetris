// Miniapp configuration for Farcaster/Base
// Update ROOT_URL after deployment to Vercel

export const ROOT_URL =
  process.env.NEXT_PUBLIC_URL || "https://your-app.vercel.app";

export const minikitConfig = {
  accountAssociation: {
    // These will be added after deployment using the Base Build Account Association tool
    header: "",
    payload: "",
    signature: "",
  },
  miniapp: {
    version: "1",
    name: "Base Tetris",
    subtitle: "Classic Block Puzzle Game",
    description:
      "Play the classic Tetris game on Base! Stack blocks, clear lines, and compete for high scores. Built for the Base Builder Drop hackathon.",
    homeUrl: ROOT_URL,
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#0a0a0f",
    webhookUrl: `${ROOT_URL}/api/webhook`,
    screenshotUrls: [`${ROOT_URL}/screenshot1.png`],
    primaryCategory: "games",
    tags: ["tetris", "puzzle", "arcade", "base", "blockchain"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    tagline: "Stack, Clear, Compete!",
    ogTitle: "Base Tetris",
    ogDescription:
      "Play classic Tetris on Base - Stack blocks and clear lines!",
    ogImageUrl: `${ROOT_URL}/og-image.png`,
    noindex: false,
  },
} as const;

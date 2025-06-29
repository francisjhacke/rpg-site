// Utility to generate a unique avatar based on user answers
export function generateAvatar(stats: Record<string, any>): string {
  // For now, return a seeded emoji string based on stats
  const seed = Object.values(stats).join("");
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const emojis = [
    "🧙‍♂️",
    "🧝‍♀️",
    "🧛‍♂️",
    "🧟",
    "🧞",
    "🧜‍♂️",
    "🧚",
    "🧑‍🚀",
    "🧑‍🎤",
    "🧑‍🔬",
    "🧑‍🏫",
    "🧑‍🍳",
  ];
  return emojis[Math.abs(hash) % emojis.length];
}

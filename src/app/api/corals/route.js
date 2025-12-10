export async function GET() {
  const corals = [
    {
      id: 1,
      name: "Utter Chaos Zoanthid",
      rarity: "Legendary",
      image: "/images/utter-chaos.png",
      light: "Medium-High",
      flow: "Medium",
      difficulty: "Easy",
      description: "One of the most sought-after zoanthids with incredible coloration. Fast growing and hardy."
    },
    {
      id: 2,
      name: "Dragon Soul Torch",
      rarity: "Epic",
      image: "/images/dragon.png",
      light: "Medium",
      flow: "Low-Medium",
      difficulty: "Moderate",
      description: "Stunning torch coral with vibrant colors. Requires stable water parameters and moderate care."
    },
    {
      id: 3,
      name: "Jawbreaker Mushroom",
      rarity: "Legendary",
      image: "/images/jawbreaker.png",
      light: "Low-Medium",
      flow: "Low",
      difficulty: "Easy",
      description: "Highly prized mushroom coral with amazing pattern. Very hardy and beginner-friendly."
    },
    {
      id: 4,
      name: "Green Star Polyps",
      rarity: "Common",
      image: "/images/gsp.png",
      light: "Medium-High",
      flow: "Medium-High",
      difficulty: "Very Easy",
      description: "Fast-growing beginner coral. Creates a beautiful green carpet effect. Nearly indestructible."
    },
    {
      id: 5,
      name: "Gonipora",
      rarity: "Rare",
      image: "/images/goni.png",
      light: "Medium",
      flow: "Medium",
      difficulty: "Moderate",
      description: "Flowerpot coral with long, flowing polyps. Requires stable conditions and regular feeding."
    }
  ]
  
  return Response.json(corals)
}
const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres@localhost:5432/coraldex'
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  // Clear existing data
  await prisma.coral.deleteMany()

  // Create corals
  const corals = await prisma.coral.createMany({
    data: [
      {
        name: "Utter Chaos Zoanthid",
        rarity: "Legendary",
        imageUrl: "/images/utter-chaos.png",
        light: "Medium-High",
        flow: "Medium",
        difficulty: "Easy",
        description: "One of the most sought-after zoanthids with incredible coloration. Fast growing and hardy."
      },
      {
        name: "Dragon Soul Torch",
        rarity: "Epic",
        imageUrl: "/images/dragon.png",
        light: "Medium",
        flow: "Low-Medium",
        difficulty: "Moderate",
        description: "Stunning torch coral with vibrant colors. Requires stable water parameters and moderate care."
      },
      {
        name: "Jawbreaker Mushroom",
        rarity: "Legendary",
        imageUrl: "/images/jawbreaker.png",
        light: "Low-Medium",
        flow: "Low",
        difficulty: "Easy",
        description: "Highly prized mushroom coral with amazing pattern. Very hardy and beginner-friendly."
      },
      {
        name: "Green Star Polyps",
        rarity: "Common",
        imageUrl: "/images/gsp.png",
        light: "Medium-High",
        flow: "Medium-High",
        difficulty: "Very Easy",
        description: "Fast-growing beginner coral. Creates a beautiful green carpet effect. Nearly indestructible."
      },
      {
        name: "Gonipora",
        rarity: "Rare",
        imageUrl: "/images/goni.png",
        light: "Medium",
        flow: "Medium",
        difficulty: "Moderate",
        description: "Flowerpot coral with long, flowing polyps. Requires stable conditions and regular feeding."
      }
    ]
  })

  console.log(`✅ Seeded ${corals.count} corals!`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
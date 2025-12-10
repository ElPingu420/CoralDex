import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres@localhost:5432/coraldex'
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export async function GET() {
  try {
    const corals = await prisma.coral.findMany({
      orderBy: { id: 'asc' }
    })

    // Map imageUrl to image for frontend compatibility
    const formattedCorals = corals.map(coral => ({
      ...coral,
      image: coral.imageUrl
    }))

    return Response.json(formattedCorals)
  } catch (error) {
    console.error('Database error:', error)
    return Response.json({ error: 'Failed to fetch corals' }, { status: 500 })
  }
}
export async function POST(request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { name, rarity, imageUrl, light, flow, difficulty, description } = body
    
    if (!name || !rarity || !imageUrl || !light || !flow || !difficulty || !description) {
      return Response.json(
        { error: 'All fields are required' }, 
        { status: 400 }
      )
    }
    
    // Create new coral in database
    const newCoral = await prisma.coral.create({
      data: {
        name,
        rarity,
        imageUrl,
        light,
        flow,
        difficulty,
        description
      }
    })
    
    // Return with image field for frontend compatibility
    return Response.json(
      { ...newCoral, image: newCoral.imageUrl },
      { status: 201 }
    )
  } catch (error) {
    console.error('Database error:', error)
    return Response.json(
      { error: 'Failed to create coral' }, 
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { kitSlug, itemId, referer } = body

    if (!kitSlug || !itemId) {
      return NextResponse.json(
        { error: 'Kit slug and item ID are required' },
        { status: 400 }
      )
    }

    // Find the kit by slug
    const kit = await prisma.kit.findUnique({
      where: { slug: kitSlug }
    })

    if (!kit) {
      return NextResponse.json(
        { error: 'Kit not found' },
        { status: 404 }
      )
    }

    // Record the click-out
    const clickOut = await prisma.clickOut.create({
      data: {
        kitId: kit.id,
        itemId,
        referer: referer || ''
      }
    })

    return NextResponse.json({ success: true, id: clickOut.id })
  } catch (error) {
    console.error('Click-out tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to track click-out' },
      { status: 500 }
    )
  }
}
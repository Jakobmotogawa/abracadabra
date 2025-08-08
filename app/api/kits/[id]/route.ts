import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const kit = await prisma.kit.findUnique({
      where: { id: params.id },
      include: {
        items: true
      }
    })

    if (!kit) {
      return NextResponse.json(
        { error: 'Kit not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(kit)
  } catch (error) {
    console.error('Kit fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch kit' },
      { status: 500 }
    )
  }
}
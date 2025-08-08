import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { generateSlug } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, theme, products } = body

    if (!title || !theme || !products) {
      return NextResponse.json(
        { error: 'Title, theme, and products are required' },
        { status: 400 }
      )
    }

    const slug = generateSlug()

    // Create kit with items
    const kit = await prisma.kit.create({
      data: {
        title,
        theme,
        slug,
        items: {
          create: products.map((product: any) => ({
            slot: product.slot,
            label: product.chosen.label,
            vendor: product.chosen.vendor || 'mock',
            affiliateUrl: product.chosen.affiliateUrl,
            imageUrl: product.chosen.imageUrl,
            price: product.chosen.price,
            size: product.chosen.size
          }))
        }
      },
      include: {
        items: true
      }
    })

    return NextResponse.json({ 
      id: kit.id, 
      slug: kit.slug,
      title: kit.title,
      theme: kit.theme
    })
  } catch (error) {
    console.error('Kit creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create kit' },
      { status: 500 }
    )
  }
}
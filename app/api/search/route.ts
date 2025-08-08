import { NextRequest, NextResponse } from 'next/server'
import { MockCatalogAdapter } from '@/lib/catalog'

const catalogAdapter = new MockCatalogAdapter()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items } = body

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Items array is required' },
        { status: 400 }
      )
    }

    const searchResults = await catalogAdapter.search(items)
    
    return NextResponse.json(searchResults)
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    )
  }
}
import { notFound } from 'next/navigation'
import InventoryGrid, { InventoryItem } from '@/components/InventoryGrid'

interface PageProps {
  params: {
    slug: string
  }
}

async function getKit(slug: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/kit-by-slug/${slug}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      return null
    }
    
    return response.json()
  } catch (error) {
    return null
  }
}

export default async function PublicKitPage({ params }: PageProps) {
  const kit = await getKit(params.slug)
  
  if (!kit) {
    notFound()
  }

  const items: InventoryItem[] = kit.items.map((item: any) => ({
    id: item.id,
    slot: item.slot,
    label: item.label,
    price: item.price,
    size: item.size,
    imageUrl: item.imageUrl,
    affiliateUrl: item.affiliateUrl,
    vendor: item.vendor
  }))

  const handleItemClick = async (item: InventoryItem) => {
    // Track click-out
    try {
      await fetch('/api/clickouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kitSlug: params.slug,
          itemId: item.id,
          referer: typeof window !== 'undefined' ? window.location.href : ''
        })
      })
    } catch (error) {
      console.error('Failed to track click-out:', error)
    }

    // Open affiliate link
    window.open(item.affiliateUrl, '_blank')
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{kit.title}</h1>
          <p className="text-white/70 mb-2">Theme: {kit.theme}</p>
          <p className="text-white/50 text-sm">
            Created {new Date(kit.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Inventory Grid */}
        <div className="flex justify-center mb-8">
          <InventoryGrid 
            items={items} 
            onItemClick={handleItemClick}
          />
        </div>

        {/* Share Bar */}
        <div className="glass p-6 text-center">
          <h3 className="text-lg font-semibold text-white mb-4">Share This Outfit</h3>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                const url = window.location.href
                navigator.clipboard.writeText(url).then(() => {
                  alert('Link copied to clipboard!')
                })
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Copy Link
            </button>
            
            <button
              onClick={() => {
                const url = encodeURIComponent(window.location.href)
                const text = encodeURIComponent(`Check out this ${kit.theme} costume outfit!`)
                window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
              }}
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Share on Twitter
            </button>
          </div>
        </div>

        {/* Create Your Own */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            Create Your Own Outfit ✨
          </a>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import InventoryGrid, { InventoryItem } from '@/components/InventoryGrid'

export default function ResultsPage() {
  const router = useRouter()
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [kitSlug, setKitSlug] = useState<string | null>(null)

  useEffect(() => {
    const generateOutfit = async () => {
      try {
        // Get form data from sessionStorage
        const formDataStr = sessionStorage.getItem('costumeRequest')
        if (!formDataStr) {
          router.push('/')
          return
        }

        const formData = JSON.parse(formDataStr)
        
        // Step 1: Generate plan
        const planResponse = await fetch('/api/plan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: formData.prompt,
            image: formData.image,
            constraints: {
              budget_total: formData.budget,
              gender: formData.gender,
              sizes: formData.sizes,
              color_bias: []
            }
          })
        })

        if (!planResponse.ok) {
          throw new Error('Failed to generate plan')
        }

        const plan = await planResponse.json()

        // Step 2: Search for products
        const searchResponse = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: plan.items })
        })

        if (!searchResponse.ok) {
          throw new Error('Failed to search products')
        }

        const searchResults = await searchResponse.json()

        // Step 3: Save kit
        const kitResponse = await fetch('/api/kits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: `${formData.prompt.slice(0, 50)}...`,
            theme: plan.theme,
            products: searchResults.products
          })
        })

        if (!kitResponse.ok) {
          throw new Error('Failed to save kit')
        }

        const kit = await kitResponse.json()
        setKitSlug(kit.slug)

        // Convert to InventoryItem format
        const inventoryItems: InventoryItem[] = searchResults.products.map((product: any) => ({
          id: product.chosen.id,
          slot: product.slot,
          label: product.chosen.label,
          price: product.chosen.price,
          size: product.chosen.size,
          imageUrl: product.chosen.imageUrl,
          affiliateUrl: product.chosen.affiliateUrl,
          vendor: product.chosen.vendor
        }))

        setItems(inventoryItems)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    generateOutfit()
  }, [router])

  const handleItemClick = (item: InventoryItem) => {
    // Track click-out
    if (kitSlug) {
      fetch('/api/clickouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kitSlug,
          itemId: item.id,
          referer: window.location.href
        })
      }).catch(console.error)
    }

    // Open affiliate link
    window.open(item.affiliateUrl, '_blank')
  }

  const handleShare = () => {
    if (kitSlug) {
      const shareUrl = `${window.location.origin}/kit/${kitSlug}`
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Share link copied to clipboard!')
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass p-8 text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Creating Your Outfit</h2>
          <p className="text-white/70">Searching for the perfect items...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Oops!</h2>
          <p className="text-white/70 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Your Magical Outfit</h1>
          <p className="text-white/70">Click any item to purchase</p>
        </div>

        {/* Inventory Grid */}
        <div className="flex justify-center mb-8">
          <InventoryGrid 
            items={items} 
            onItemClick={handleItemClick}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => router.push('/')}
            className="glass glass-hover px-6 py-3 text-white font-medium rounded-lg transition-all"
          >
            Create Another
          </button>
          
          {kitSlug && (
            <button
              onClick={handleShare}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3 text-white font-medium rounded-lg transition-all"
            >
              Share Outfit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
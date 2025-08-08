export interface CatalogItem {
  id: string
  label: string
  price: number
  size: string
  affiliateUrl: string
  imageUrl: string
  vendor: string
  slot: string
}

export interface SearchQuery {
  slot: string
  label: string
  query: string[]
  target_price: number
  size: string
}

export class MockCatalogAdapter {
  private mockItems: CatalogItem[] = [
    // Tops
    {
      id: '1',
      label: 'Wizard Robe',
      price: 45.99,
      size: 'M',
      affiliateUrl: 'https://example.com/wizard-robe',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
      vendor: 'amazon',
      slot: 'top'
    },
    {
      id: '2',
      label: 'Witch Hat',
      price: 19.99,
      size: 'One Size',
      affiliateUrl: 'https://example.com/witch-hat',
      imageUrl: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=300&h=300&fit=crop',
      vendor: 'amazon',
      slot: 'accessory'
    },
    {
      id: '3',
      label: 'Black Boots',
      price: 89.99,
      size: '9',
      affiliateUrl: 'https://example.com/black-boots',
      imageUrl: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop',
      vendor: 'amazon',
      slot: 'footwear'
    },
    {
      id: '4',
      label: 'Magic Wand',
      price: 24.99,
      size: 'One Size',
      affiliateUrl: 'https://example.com/magic-wand',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
      vendor: 'amazon',
      slot: 'prop'
    },
    {
      id: '5',
      label: 'Dark Leggings',
      price: 29.99,
      size: 'M',
      affiliateUrl: 'https://example.com/dark-leggings',
      imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop',
      vendor: 'amazon',
      slot: 'bottom'
    },
    {
      id: '6',
      label: 'Vampire Cape',
      price: 34.99,
      size: 'L',
      affiliateUrl: 'https://example.com/vampire-cape',
      imageUrl: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=300&h=300&fit=crop',
      vendor: 'amazon',
      slot: 'top'
    }
  ]

  async search(queries: SearchQuery[]): Promise<{
    products: Array<{
      slot: string
      chosen: CatalogItem
      alternatives: CatalogItem[]
    }>
  }> {
    const products = queries.map(query => {
      // Filter items by slot
      const slotItems = this.mockItems.filter(item => item.slot === query.slot)
      
      // Simple matching based on label similarity
      const scored = slotItems.map(item => ({
        item,
        score: this.calculateScore(item, query)
      }))
      
      // Sort by score and price proximity
      scored.sort((a, b) => {
        const scoreA = a.score + (1 / (Math.abs(a.item.price - query.target_price) + 1))
        const scoreB = b.score + (1 / (Math.abs(b.item.price - query.target_price) + 1))
        return scoreB - scoreA
      })
      
      const chosen = scored[0]?.item || slotItems[0]
      const alternatives = scored.slice(1, 4).map(s => s.item)
      
      return {
        slot: query.slot,
        chosen: chosen || {
          id: 'fallback',
          label: `${query.label} (Not Found)`,
          price: query.target_price,
          size: query.size,
          affiliateUrl: '#',
          imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
          vendor: 'mock',
          slot: query.slot
        },
        alternatives
      }
    })

    return { products }
  }

  private calculateScore(item: CatalogItem, query: SearchQuery): number {
    let score = 0
    
    // Label similarity
    const itemWords = item.label.toLowerCase().split(' ')
    const queryWords = query.query.map(q => q.toLowerCase())
    
    for (const queryWord of queryWords) {
      for (const itemWord of itemWords) {
        if (itemWord.includes(queryWord) || queryWord.includes(itemWord)) {
          score += 1
        }
      }
    }
    
    return score
  }
}
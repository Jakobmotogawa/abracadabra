import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, image, constraints } = body

    // Mock planner response - in production this would call an AI service
    const mockPlan = {
      theme: extractTheme(prompt),
      constraints,
      items: generateMockItems(prompt, constraints)
    }

    return NextResponse.json(mockPlan)
  } catch (error) {
    console.error('Plan generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate plan' },
      { status: 500 }
    )
  }
}

function extractTheme(prompt: string): string {
  const themes = {
    wizard: ['wizard', 'magic', 'spell', 'wand', 'robe'],
    witch: ['witch', 'cauldron', 'brew', 'hex', 'potion'],
    vampire: ['vampire', 'blood', 'fang', 'gothic', 'dark'],
    pirate: ['pirate', 'ship', 'treasure', 'sword', 'sea'],
    superhero: ['hero', 'super', 'cape', 'power', 'save'],
    princess: ['princess', 'royal', 'crown', 'elegant', 'ball'],
    zombie: ['zombie', 'undead', 'apocalypse', 'horror', 'decay']
  }

  const lowerPrompt = prompt.toLowerCase()
  
  for (const [theme, keywords] of Object.entries(themes)) {
    if (keywords.some(keyword => lowerPrompt.includes(keyword))) {
      return theme
    }
  }
  
  return 'mystical'
}

function generateMockItems(prompt: string, constraints: any) {
  const theme = extractTheme(prompt)
  const budget = constraints.budget_total
  const sizes = constraints.sizes

  const baseItems = [
    {
      slot: 'top',
      label: getThemeItem(theme, 'top'),
      query: [theme, 'costume', 'top', 'shirt'],
      target_price: Math.round(budget * 0.3),
      size: sizes.top,
      alt: [],
      notes: 'Main costume piece'
    },
    {
      slot: 'bottom',
      label: getThemeItem(theme, 'bottom'),
      query: [theme, 'costume', 'bottom', 'pants'],
      target_price: Math.round(budget * 0.25),
      size: sizes.bottom,
      alt: [],
      notes: 'Matching bottom piece'
    },
    {
      slot: 'footwear',
      label: getThemeItem(theme, 'footwear'),
      query: [theme, 'boots', 'shoes', 'footwear'],
      target_price: Math.round(budget * 0.25),
      size: sizes.shoe,
      alt: [],
      notes: 'Theme-appropriate footwear'
    },
    {
      slot: 'accessory',
      label: getThemeItem(theme, 'accessory'),
      query: [theme, 'accessory', 'hat', 'jewelry'],
      target_price: Math.round(budget * 0.15),
      size: 'One Size',
      alt: [],
      notes: 'Key accessory piece'
    },
    {
      slot: 'prop',
      label: getThemeItem(theme, 'prop'),
      query: [theme, 'prop', 'weapon', 'tool'],
      target_price: Math.round(budget * 0.05),
      size: 'One Size',
      alt: [],
      notes: 'Character prop'
    }
  ]

  return baseItems
}

function getThemeItem(theme: string, slot: string): string {
  const themeItems: Record<string, Record<string, string>> = {
    wizard: {
      top: 'Wizard Robe',
      bottom: 'Dark Pants',
      footwear: 'Leather Boots',
      accessory: 'Wizard Hat',
      prop: 'Magic Wand'
    },
    witch: {
      top: 'Witch Dress',
      bottom: 'Black Leggings',
      footwear: 'Pointed Boots',
      accessory: 'Witch Hat',
      prop: 'Broomstick'
    },
    vampire: {
      top: 'Victorian Shirt',
      bottom: 'Black Pants',
      footwear: 'Dress Shoes',
      accessory: 'Cape',
      prop: 'Fake Fangs'
    },
    default: {
      top: 'Costume Top',
      bottom: 'Costume Bottom',
      footwear: 'Costume Shoes',
      accessory: 'Costume Hat',
      prop: 'Costume Prop'
    }
  }

  return themeItems[theme]?.[slot] || themeItems.default[slot]
}
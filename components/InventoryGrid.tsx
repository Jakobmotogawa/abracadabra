'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface InventoryItem {
  id: string
  slot: string
  label: string
  price: number
  size: string
  imageUrl: string
  affiliateUrl: string
  vendor: string
}

interface InventoryGridProps {
  items: InventoryItem[]
  onItemClick?: (item: InventoryItem) => void
  className?: string
}

const SLOT_POSITIONS = {
  makeup: { row: 0, col: 1, label: 'Makeup' },
  accessory: { row: 1, col: 0, label: 'Accessory' },
  top: { row: 1, col: 1, label: 'Top' },
  prop: { row: 1, col: 2, label: 'Prop' },
  bottom: { row: 2, col: 1, label: 'Bottom' },
  footwear: { row: 3, col: 1, label: 'Footwear' },
}

export default function InventoryGrid({ items, onItemClick, className }: InventoryGridProps) {
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null)

  const getItemForSlot = (slot: string) => {
    return items.find(item => item.slot === slot)
  }

  const handleSlotClick = (item: InventoryItem) => {
    if (onItemClick) {
      onItemClick(item)
    } else {
      // Default behavior: open affiliate link
      window.open(item.affiliateUrl, '_blank')
    }
  }

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="grid grid-cols-3 grid-rows-4 gap-3 p-4">
        {Object.entries(SLOT_POSITIONS).map(([slot, position]) => {
          const item = getItemForSlot(slot)
          const isEmpty = !item
          
          return (
            <div
              key={slot}
              className={cn(
                "inventory-slot cursor-pointer transition-all duration-300",
                isEmpty && "opacity-50",
                hoveredSlot === slot && "scale-105 animate-glow"
              )}
              style={{
                gridRow: position.row + 1,
                gridColumn: position.col + 1,
              }}
              onMouseEnter={() => setHoveredSlot(slot)}
              onMouseLeave={() => setHoveredSlot(null)}
              onClick={() => item && handleSlotClick(item)}
            >
              {item ? (
                <>
                  <div className="relative w-16 h-16 mb-2">
                    <Image
                      src={item.imageUrl}
                      alt={item.label}
                      fill
                      className="object-cover rounded-md"
                      sizes="64px"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-white/90 truncate">
                      {item.label}
                    </p>
                    <p className="text-xs text-green-400 font-bold">
                      ${item.price}
                    </p>
                    <p className="text-xs text-white/60">
                      {item.size}
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 mb-2 bg-white/10 rounded-md flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-dashed border-white/30 rounded"></div>
                  </div>
                  <p className="text-xs text-white/50">
                    {position.label}
                  </p>
                </div>
              )}
              
              {/* Slot glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300 pointer-events-none" />
            </div>
          )
        })}
      </div>
      
      {/* Total price display */}
      {items.length > 0 && (
        <div className="glass p-4 mt-4 text-center">
          <p className="text-sm text-white/70">Total Outfit Cost</p>
          <p className="text-2xl font-bold text-green-400">
            ${items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
          </p>
        </div>
      )}
    </div>
  )
}
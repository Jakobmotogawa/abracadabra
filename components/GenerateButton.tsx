'use client'

import { useState } from 'react'

interface GenerateButtonProps {
  onGenerate: () => Promise<void>
  disabled?: boolean
  loading?: boolean
}

export default function GenerateButton({ onGenerate, disabled, loading }: GenerateButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleClick = async () => {
    if (disabled || isGenerating || loading) return
    
    setIsGenerating(true)
    try {
      await onGenerate()
    } finally {
      setIsGenerating(false)
    }
  }

  const isDisabled = disabled || isGenerating || loading
  const showLoading = isGenerating || loading

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`
        w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 transform
        ${isDisabled
          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white hover:scale-105 active:scale-95'
        }
        ${showLoading ? 'animate-pulse' : ''}
      `}
    >
      {showLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <span>Creating Magic...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-2">
          <span>✨</span>
          <span>Generate Outfit</span>
          <span>✨</span>
        </div>
      )}
    </button>
  )
}
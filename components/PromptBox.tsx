'use client'

import { useState } from 'react'

interface PromptBoxProps {
  prompt: string
  onChange: (prompt: string) => void
  onImageUpload?: (image: string) => void
}

export default function PromptBox({ prompt, onChange, onImageUpload }: PromptBoxProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = e.target?.result as string
        onImageUpload?.(base64)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="glass p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Describe Your Costume</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            What do you want to be?
          </label>
          <textarea
            value={prompt}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g., A mystical wizard with dark robes and magical accessories..."
            className="w-full h-32 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
            dragActive
              ? 'border-blue-400 bg-blue-500/20'
              : 'border-white/30 hover:border-white/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-2">
            <div className="text-white/60">
              <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-sm text-white/70">
              Drop an image here or{' '}
              <label className="text-blue-400 hover:text-blue-300 cursor-pointer underline">
                browse files
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>
            </p>
            <p className="text-xs text-white/50">
              Optional: Upload a reference image
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
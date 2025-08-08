'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SizeForm from '@/components/SizeForm'
import BudgetInput from '@/components/BudgetInput'
import PromptBox from '@/components/PromptBox'
import GenerateButton from '@/components/GenerateButton'

export default function HomePage() {
  const router = useRouter()
  const [prompt, setPrompt] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [budget, setBudget] = useState(200)
  const [gender, setGender] = useState('unisex')
  const [sizes, setSizes] = useState({
    top: 'M',
    bottom: 'M',
    shoe: '9'
  })

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('Please describe your costume idea!')
      return
    }

    if (!sizes.top || !sizes.bottom || !sizes.shoe) {
      alert('Please select all your sizes!')
      return
    }

    if (!budget || budget <= 0) {
      alert('Please set a budget!')
      return
    }

    // Store form data in sessionStorage for the results page
    const formData = {
      prompt,
      image,
      budget,
      gender,
      sizes
    }
    
    sessionStorage.setItem('costumeRequest', JSON.stringify(formData))
    router.push('/results')
  }

  const isFormValid = prompt.trim() && sizes.top && sizes.bottom && sizes.shoe && budget > 0

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Abracadabra
          </h1>
          <p className="text-xl text-white/80">
            Turn any costume idea into a shoppable outfit ✨
          </p>
        </div>

        {/* Main Form */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-6">
            <PromptBox 
              prompt={prompt} 
              onChange={setPrompt}
              onImageUpload={setImage}
            />
            
            <div className="glass p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Gender Style</h3>
              <div className="flex space-x-4">
                {['womens', 'mens', 'unisex'].map(option => (
                  <button
                    key={option}
                    onClick={() => setGender(option)}
                    className={`px-4 py-2 rounded-lg capitalize transition-all duration-200 ${
                      gender === option
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <SizeForm sizes={sizes} onChange={setSizes} />
            <BudgetInput budget={budget} onChange={setBudget} />
          </div>
        </div>

        {/* Generate Button */}
        <div className="max-w-md mx-auto">
          <GenerateButton 
            onGenerate={handleGenerate}
            disabled={!isFormValid}
          />
        </div>

        {/* Preview */}
        {image && (
          <div className="mt-8 text-center">
            <div className="glass p-4 inline-block">
              <p className="text-white/80 mb-2">Reference Image:</p>
              <img 
                src={image} 
                alt="Reference" 
                className="max-w-xs max-h-48 rounded-lg mx-auto"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
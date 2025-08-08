'use client'

interface SizeFormProps {
  sizes: {
    top: string
    bottom: string
    shoe: string
  }
  onChange: (sizes: { top: string; bottom: string; shoe: string }) => void
}

const SIZE_OPTIONS = {
  top: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  bottom: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  shoe: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12']
}

export default function SizeForm({ sizes, onChange }: SizeFormProps) {
  const handleSizeChange = (category: keyof typeof sizes, value: string) => {
    onChange({
      ...sizes,
      [category]: value
    })
  }

  return (
    <div className="glass p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Your Sizes</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Top Size
          </label>
          <select
            value={sizes.top}
            onChange={(e) => handleSizeChange('top', e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select size</option>
            {SIZE_OPTIONS.top.map(size => (
              <option key={size} value={size} className="bg-slate-800">
                {size}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Bottom Size
          </label>
          <select
            value={sizes.bottom}
            onChange={(e) => handleSizeChange('bottom', e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select size</option>
            {SIZE_OPTIONS.bottom.map(size => (
              <option key={size} value={size} className="bg-slate-800">
                {size}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Shoe Size
          </label>
          <select
            value={sizes.shoe}
            onChange={(e) => handleSizeChange('shoe', e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select size</option>
            {SIZE_OPTIONS.shoe.map(size => (
              <option key={size} value={size} className="bg-slate-800">
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
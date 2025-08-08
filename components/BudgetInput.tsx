'use client'

interface BudgetInputProps {
  budget: number
  onChange: (budget: number) => void
}

const BUDGET_PRESETS = [50, 100, 200, 300, 500]

export default function BudgetInput({ budget, onChange }: BudgetInputProps) {
  return (
    <div className="glass p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Budget</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Maximum Budget ($)
          </label>
          <input
            type="number"
            value={budget || ''}
            onChange={(e) => onChange(Number(e.target.value))}
            placeholder="Enter your budget"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            step="10"
          />
        </div>

        <div>
          <p className="text-sm text-white/60 mb-2">Quick presets:</p>
          <div className="flex flex-wrap gap-2">
            {BUDGET_PRESETS.map(preset => (
              <button
                key={preset}
                onClick={() => onChange(preset)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                  budget === preset
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                ${preset}
              </button>
            ))}
          </div>
        </div>

        {budget > 0 && (
          <div className="text-center p-3 bg-green-500/20 rounded-lg">
            <p className="text-green-400 font-medium">
              Budget set to ${budget}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
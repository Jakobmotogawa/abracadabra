import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(): string {
  const adjectives = ['magical', 'mystical', 'enchanted', 'spellbound', 'bewitched', 'charmed']
  const nouns = ['wizard', 'witch', 'sorcerer', 'mage', 'enchanter', 'conjurer']
  
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  const num = Math.floor(Math.random() * 1000)
  
  return `${adj}-${noun}-${num}`
}
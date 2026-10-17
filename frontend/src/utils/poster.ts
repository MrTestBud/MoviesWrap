const PALETTES = [
  ['#1a0630', '#6d28d9', '#c084fc'],
  ['#12081f', '#7c3aed', '#a78bfa'],
  ['#0b0618', '#4c1d95', '#e879f9'],
  ['#14061c', '#5b21b6', '#f0abfc'],
  ['#0e0820', '#3b0764', '#818cf8'],
]

function hashString(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash)
}

export function getPosterPalette(title: string): [string, string, string] {
  const palette = PALETTES[hashString(title) % PALETTES.length]
  return [palette[0], palette[1], palette[2]]
}

export function getPosterInitials(title: string): string {
  const words = title.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) {
    return 'MW'
  }
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }
  return (words[0][0] + words[1][0]).toUpperCase()
}

export interface HighlightPart {
  text: string
  highlight: boolean
}

export const highlightText = (text: string, query: string): HighlightPart[] => {
  if (!query) return [{ text, highlight: false }]

  const matchIndex = text.toLowerCase().indexOf(query.toLowerCase())
  if (matchIndex === -1) return [{ text, highlight: false }]

  const before = text.slice(0, matchIndex)
  const match = text.slice(matchIndex, matchIndex + query.length)
  const after = text.slice(matchIndex + query.length)

  const parts: HighlightPart[] = []
  if (before) parts.push({ text: before, highlight: false })
  parts.push({ text: match, highlight: true })
  if (after) parts.push({ text: after, highlight: false })

  return parts
}

export const isNoResultsOption = (optionId: string): boolean => {
  return optionId === 'no-results'
}

export const createNoResultsOption = (label: string = 'Нічого не знайдено') => ({
  id: 'no-results',
  label,
})

export const formatOptionLabel = (option: string | { label: string }): string => {
  return typeof option === 'string' ? option : option.label
}
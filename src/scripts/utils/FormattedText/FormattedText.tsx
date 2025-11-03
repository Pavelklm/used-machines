import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'

export function normalizeTextForMarkdown(
  input: string | null | undefined
): string {
  if (!input || typeof input !== 'string') return ''

  return (
    input
      // Убиваем HTML сущности
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/[ \t]+/g, ' ')
      .trim()
  )
}

const MARKDOWN_COMPONENTS = {
  strong: ({ children }: any) => (
    <strong style={{ whiteSpace: 'nowrap' }}>{children}</strong>
  ),
}

export const FormattedText = ({ raw }: { raw: string | null | undefined }) => {
  const markdown = useMemo(() => {
    if (!raw) return ''

    return raw
      .replace(/!!!([^!]+)!!!/g, '\n\n# $1\n\n') // h1 для !!!текст!!!
      .replace(/([А-ЯЁІЇЄ][а-яёіїє ]{10,}?):\s*/g, '\n\n### $1\n\n') // h3 для двоеточия (было ##)
      .replace(/\{([^}]+)\}/g, (match, text) => `**${text.trim()}**`)
      .replace(/\.\s+([А-ЯЁІЇЄ][а-яёіїє])/g, '.\n\n$1')
      .replace(/\n–/g, '\n*')
      .replace(/^–/gm, '*')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/•\s*/g, '\n* ')
      .trim()
  }, [raw])

  if (!markdown) return null

  return (
    <ReactMarkdown components={MARKDOWN_COMPONENTS}>{markdown}</ReactMarkdown>
  )
}

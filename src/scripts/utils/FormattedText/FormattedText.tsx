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

export const FormattedText = ({ raw }: { raw: string | null | undefined }) => {
  if (!raw) return null

  const markdown = raw
    .replace(/([А-ЯЁІЇЄ][а-яёіїєА-ЯЁІЇЄ\s]{10,}?):\s*/g, '\n\n## $1\n\n')
    .replace(/\{([^}]+)\}/g, (match, text) => `**${text.trim()}**`)
    .replace(/\.\s+([А-ЯЁІЇЄ][а-яёіїє])/g, '.\n\n$1')
    .replace(/\n–/g, '\n*')
    .replace(/^–/gm, '*')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/•\s*/g, '\n* ')
    .trim()

  return (
    <ReactMarkdown
      components={{
        strong: ({ children }) => (
          <strong style={{ whiteSpace: 'nowrap' }}>{children}</strong>
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  )
}

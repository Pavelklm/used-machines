import ReactMarkdown from 'react-markdown'
import { Box } from '@mui/material'

export function normalizeTextForMarkdown(input: string | null | undefined): string {
  if (!input || typeof input !== 'string') return ''
  
  return input
    // Убиваем HTML сущности
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    // Убираем лишние пробелы
    .replace(/[ \t]+/g, ' ')
    .trim()
}

export const FormattedText = ({ raw }: { raw: string | null | undefined }) => {
  if (!raw) return null
  
  // Если это HTML - рендерим как HTML
  if (raw.includes('<p>') || raw.includes('<br>') || raw.includes('<div>')) {
    const cleanHtml = normalizeTextForMarkdown(raw)
    return (
      <Box 
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
        sx={{
          '& p': {
            color: '#495057',
            fontSize: '1.1rem',
            lineHeight: 1.7,
            fontWeight: 400,
            mb: 2,
            mt: 0
          },
          '& h1, & h2, & h3, & h4, & h5, & h6': {
            color: 'var(--main-color)',
            fontSize: '1.3rem',
            fontWeight: 600,
            mb: 1,
            mt: 2
          },
          '& ul, & ol': { pl: 2, mb: 2 },
          '& li': {
            color: '#495057',
            fontSize: '1.1rem',
            lineHeight: 1.6,
            fontWeight: 400,
            mb: 0.5
          }
        }}
      />
    )
  }
  
  // Если это обычный текст - используем Markdown
  const markdown = raw
    .replace(/([А-ЯЁІЇЄ][а-яёіїєА-ЯЁІЇЄ\s]{10,}?):\s*/g, '\n\n## $1\n\n')
    .replace(/\.\s+([А-ЯЁІЇЄ][а-яёіїє])/g, '.\n\n$1')
    .replace(/\n–/g, '\n*')
    .replace(/^–/gm, '*')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    
  return <ReactMarkdown>{markdown}</ReactMarkdown>
}

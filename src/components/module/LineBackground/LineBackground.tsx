import './style.css'

interface LineBackgroundProps {
  className?: string
}

export const LineBackground = ({ className }: LineBackgroundProps) => {
  return <div className={`full-width-line ${className}`} />
}

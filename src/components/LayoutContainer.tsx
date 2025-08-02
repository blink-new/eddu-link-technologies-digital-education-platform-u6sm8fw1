import { ReactNode } from 'react'

interface LayoutContainerProps {
  children: ReactNode
}

export function LayoutContainer({ children }: LayoutContainerProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {children}
    </div>
  )
}
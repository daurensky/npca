import cn from 'classnames'
import type { ReactNode } from 'react'

export type ContentSectionProps = {
  children: ReactNode
  className?: string
}

export const ContentSection = ({
  children,
  className,
}: ContentSectionProps) => {
  return (
    <section className={cn('py-8 xl:py-16', className)}>
      <div className="max-w-screen-xl w-full px-4 mx-auto space-y-8">
        {children}
      </div>
    </section>
  )
}

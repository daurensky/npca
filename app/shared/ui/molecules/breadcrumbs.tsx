import { Link } from '@remix-run/react'
import type { PropsWithChildren, ReactNode } from 'react'

export const BreadcrumbList = ({ children }: PropsWithChildren) => {
  return <div className="flex items-center gap-2">{children}</div>
}

export type BreadcrumbProps = {
  children: ReactNode
  to?: string
}

export const Breadcrumb = ({ children, to }: BreadcrumbProps) => {
  return (
    <div className="flex items-center gap-2 [&:last-child>[data-delimeter]]:hidden">
      {to ? (
        <Link to={to} className="hover:underline inline">
          {children}
        </Link>
      ) : (
        <span className="inline">{children}</span>
      )}
      <span data-delimeter className="text-gray-500">
        /
      </span>
    </div>
  )
}

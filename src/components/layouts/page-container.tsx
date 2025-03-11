import { PropsWithChildren, ReactNode } from 'react'

type PageContainerProps = PropsWithChildren & {
  title: string
  action?: ReactNode
}

export const PageContainer = ({
  children,
  title,
  action,
}: PageContainerProps) => (
  <section className="container mx-auto p-4">
    <header className="mb-4 flex items-center justify-between border-b pb-4">
      <p className="text-xl font-medium">{title}</p>
      {action}
    </header>
    {children}
  </section>
)

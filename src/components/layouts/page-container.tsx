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
    <header className="flex justify-between items-center pb-4 mb-4 border-b">
      <p className="text-xl font-medium">{title}</p>
      {action}
    </header>
    {children}
  </section>
)

import { Sidebar } from '@/app/components/sidebar'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  )
}

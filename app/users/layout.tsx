import { Sidebar } from '@/app/components/sidebar'
import { getUsers } from '@/app/actions'
import { UserList } from './components'

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const users = await getUsers()

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <UserList items={users} />
      <div className="h-full">{children}</div>
    </Sidebar>
  )
}

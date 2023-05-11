import { getConversations } from '@/app/actions'
import { Sidebar } from '@/app/components/sidebar'
import { ConversationList } from './components'

interface ConversationsLayoutProps {
  children: React.ReactNode
}

export default async function ConversationsLayout({
  children,
}: ConversationsLayoutProps) {
  const conversations = await getConversations()

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  )
}

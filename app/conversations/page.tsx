'use client'

import clsx from 'clsx'

import { useConversation } from '@/app/hooks'
import { EmptyState } from '@/app/components'

export default function ConversationsPage() {
  const { isOpen } = useConversation()

  return (
    <div
      className={clsx('h-full lg:block lg:pl-80', isOpen ? 'block' : 'hidden')}
    >
      <EmptyState />
    </div>
  )
}

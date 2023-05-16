'use client'

import clsx from 'clsx'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@prisma/client'
import { MdOutlineGroupAdd } from 'react-icons/md'

import { FullConversationType } from '@/app/types'
import { useConversation } from '@/app/hooks'
import { GroupChatModal } from '@/app/components'
import ConversationBox from './ConversationBox'

interface ConversationListProps {
  initialItems: FullConversationType[]
  users: User[]
  title?: string
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  users,
  title,
}) => {
  const [items, setItems] = useState(initialItems)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const router = useRouter()

  const { conversationId, isOpen } = useConversation()

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          `
          fixed
          inset-y-0
          overflow-y-auto
          border-r
          border-gray-200
          pb-20
          lg:left-20
          lg:block
          lg:w-80
          lg:pb-0
        `,
          isOpen ? 'hidden' : 'left-0 block w-full',
        )}
      >
        <div className="px-5">
          <div className="mb-4 flex justify-between pt-4">
            <div
              className="
              text-2xl
              font-bold
              text-neutral-800
            "
            >
              Messages
            </div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="
              cursor-pointer
              rounded-full
              bg-gray-100
              p-2
              text-gray-600
              transition
              hover:opacity-75
            "
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.map(item => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  )
}

export default ConversationList

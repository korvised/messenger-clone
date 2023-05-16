'use client'

import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { User } from '@prisma/client'
import { MdOutlineGroupAdd } from 'react-icons/md'
import { find } from 'lodash'

import { FullConversationType } from '@/app/types'
import { useConversation } from '@/app/hooks'
import { GroupChatModal } from '@/app/components'
import { pusherClient } from '@/app/libs/pusher'
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
  const session = useSession()

  const [items, setItems] = useState(initialItems)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const router = useRouter()

  const { conversationId, isOpen } = useConversation()

  const pusherKey = useMemo(
    () => session?.data?.user?.email,
    [session?.data?.user?.email],
  )

  useEffect(() => {
    if (!pusherKey) {
      return
    }

    pusherClient.subscribe(pusherKey)

    const newHandler = (conversation: FullConversationType) => {
      setItems(current => {
        if (find(current, { id: conversation.id })) {
          return current
        }
        return [...current, conversation]
      })
    }

    const updateHandler = (conversation: FullConversationType) => {
      setItems(current =>
        current.map(currentConversation => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            }
          }
          return currentConversation
        }),
      )
    }

    const deleteHandler = (conversation: FullConversationType) => {
      setItems(current => [
        ...current.filter(
          currentConversation => currentConversation.id !== conversation.id,
        ),
      ])

      if (conversation.id === conversationId){
        router.replace('/conversations')
      }
    }

    pusherClient.bind('conversation:new', newHandler)
    pusherClient.bind('conversation:update', updateHandler)
    pusherClient.bind('conversation:remove', deleteHandler)

    return () => {
      pusherClient.unsubscribe(pusherKey)
      pusherClient.unbind('conversation:new', newHandler)
      pusherClient.unbind('conversation:update', updateHandler)
      pusherClient.unbind('conversation:remove', deleteHandler)
    }
  }, [conversationId, pusherKey, router])

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

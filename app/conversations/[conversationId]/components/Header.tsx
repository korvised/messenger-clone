'use client'

import Link from 'next/link'
import { Fragment, useMemo, useState } from 'react'
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2'
import { Conversation, User } from '@prisma/client'

import { useOtherUser } from '@/app/hooks'
import { Avatar } from '@/app/components'
import { ProfileDrawer } from '../components'

interface HeaderProps {
  conversation: Conversation & { users: User[] }
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const anotherUser = useOtherUser(conversation)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} memvers`
    }

    return 'Active'
  }, [conversation])

  return (
    <Fragment>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div
        className="
          flex
          w-full
          items-center
          justify-between
          border-b-[1px]
          bg-white
          px-4
          py-3
          shadow-sm
          sm:px-4
          lg:px-6
        "
      >
        <div className="flex items-center gap-3">
          <Link
            href="/conversations"
            className="
            block
            cursor-pointer
            text-sky-500
            transition
            hover:text-sky-600
            lg:hidden
          "
          >
            <HiChevronLeft size={32} />
          </Link>
          <Avatar user={anotherUser} />
          <div className="flex flex-col">
            <div>{conversation?.name || anotherUser.name}</div>
            <div
              className="
              text-sm
              font-light
              text-neutral-500
            "
            >
              {statusText}
            </div>
          </div>
        </div>

        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="
          cursor-pointer
          text-sky-500
          transition
          hover:text-sky-600
        "
        />
      </div>
    </Fragment>
  )
}

export default Header

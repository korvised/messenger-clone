import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { HiChat } from 'react-icons/hi'
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2'

import { IRoute } from '@/app/types'
import useConversation from './useConversation'

const useRoutes = () => {
  const pathName = usePathname()
  const { conversationId } = useConversation()

  const routes: IRoute[] = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversations',
        icon: HiChat,
        active: pathName === '/conversations' || !!conversationId,
      },
      {
        label: 'Users',
        href: '/users',
        icon: HiUsers,
        active: pathName === '/users',
      },
      {
        label: 'Logout',
        href: '#',
        icon: HiArrowLeftOnRectangle,
        onClick: signOut,
      },
    ],
    [pathName, conversationId],
  )

  return routes
}

export default useRoutes

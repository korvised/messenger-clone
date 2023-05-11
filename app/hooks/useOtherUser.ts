import { useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { User } from '@prisma/client'

import { FullConversationType } from '@/app/types'

const useOtherUser = (
  conversation: FullConversationType | { users: User[] },
) => {
  const session = useSession()

  const otherUser = useMemo(() => {
    const currentUserEnail = session?.data?.user?.email

    const otherUser = conversation.users.filter(
      user => user.email !== currentUserEnail,
    )

    return otherUser[0]
  }, [conversation.users, session?.data?.user?.email])

  return otherUser
}

export default useOtherUser

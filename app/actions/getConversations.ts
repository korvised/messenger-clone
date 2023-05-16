import prisma from '@/app/libs/prismadb'
import { getCurrentUser } from '@/app/actions'
import { FullConversationType } from '@/app/types'

const getConversations = async (): Promise<FullConversationType[]> => {
  const currentUser = await getCurrentUser()

  if (!currentUser || !currentUser.id) {
    return []
  }

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc',
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    })

    return conversations
  } catch (e) {
    return []
  }
}

export default getConversations

import { getCurrentUser } from '@/app/actions'
import { prisma } from '@/app/libs'

const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser?.email) {
      return null
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    })

    return conversation
  } catch (e) {
    return null
  }
}

export default getConversationById

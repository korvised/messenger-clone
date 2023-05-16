import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import { getCurrentUser } from '@/app/actions'
import { pusherServer } from '@/app/libs/pusher'

interface IParams {
  conversationId: string
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Find exiting conversation
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: params.conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    })

    if (!conversation) {
      return new NextResponse('Invalid ID', { status: 400 })
    }

    // Find the last message
    const lastMessage = conversation.messages[conversation.messages.length - 1]
    if (!lastMessage) {
      return NextResponse.json(conversation)
    }

    // Update seen of last message
    const updateMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        sender: true,
        seen: true,
      },
    })

    await pusherServer.trigger(currentUser.email, 'conversation:update', {
      id: conversation.id,
      messages: [updateMessage],
    })

    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation)
    }

    await pusherServer.trigger(conversation.id, 'message:update', updateMessage)

    return NextResponse.json(updateMessage)
  } catch (error) {
    console.log('ERROR_MESSAGES_SEEN')
    return new NextResponse('Internal Error', { status: 500 })
  }
}

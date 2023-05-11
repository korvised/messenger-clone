import { IconType } from 'react-icons'
import { Conversation, Message, User } from '@prisma/client'

export interface IRoute {
  label: string
  href: string
  icon: IconType
  active?: boolean
  onClick?: () => void
}

export type FullMessageType = Message & {
  sender: User
  seen: User[]
}

export type FullConversationType = Conversation & {
  users: User[]
  messages: FullMessageType[]
}

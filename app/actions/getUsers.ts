import { User } from '@prisma/client'

import prisma from '@/app/libs/prismadb'
import getSession from './getSession'

const getUsers = async (): Promise<User[]> => {
  try {
    const session = await getSession()

    if (!session?.user?.email) {
      return []
    }

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    })

    return users
  } catch (e) {
    console.log(e, 'GET_USERS_ERROR')
    return []
  }
}

export default getUsers

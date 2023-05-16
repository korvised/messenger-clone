'use client'

import axios from 'axios'
import { useCallback, useState } from 'react'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'

import { Avatar, LoadingModal } from '@/app/components'

interface UserBoxProps {
  data: User
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = useCallback(() => {
    setIsLoading(true)
    axios
      .post('/api/conversations', {
        userId: data.id,
      })
      .then(res => {
        router.push(`/conversations/${res.data.id}`)
      })
  }, [data, router])

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="
        relative
        flex
        w-full
        cursor-pointer
        items-center
        space-x-3
        rounded-lg
        bg-white
        p-3
        transition
        hover:bg-neutral-100
      "
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div
              className="
              mb-1
              flex
              items-center
              justify-between
            "
            >
              <p
                className="
                text-sm
                font-medium
                text-gray-900
              "
              >
                {data.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserBox

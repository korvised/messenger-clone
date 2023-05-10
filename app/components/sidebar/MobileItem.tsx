'use client'

import clsx from 'clsx'
import Link from 'next/link'

import { IRoute } from '@/app/types'

type MobileItem = IRoute

const MobileItem: React.FC<MobileItem> = ({
  label,
  icon: Icon,
  href,
  active,
  onClick,
}) => {
  const handleClick = () => onClick?.()

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        `
        group
        flex
        w-full
        justify-center
        gap-x-3
        p-4
        text-sm
        font-semibold
        leading-6
        text-gray-500
        hover:bg-gray-100
        hover:text-black
      `,
        active && 'bg-gray-100 text-black',
      )}
    >
      <Icon className="h-6 w-6" />
      <span className="sr-only">{label}</span>
    </Link>
  )
}

export default MobileItem

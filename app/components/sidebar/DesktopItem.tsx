'use client'

import clsx from 'clsx'
import Link from 'next/link'

import { IRoute } from '@/app/types'

type DesktopItemProps = IRoute

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  icon: Icon,
  href,
  active,
  onClick,
}) => {
  const handleClick = () => onClick?.()

  return (
    <label onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `
          group
          flex
          gap-x-3
          rounded-md
          p-3
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
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </label>
  )
}

export default DesktopItem

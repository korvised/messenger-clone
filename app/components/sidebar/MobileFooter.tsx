'use client'

import { useConversation, useRoutes } from '@/app/hooks'
import MobileItem from './MobileItem'

const MobileFooter = () => {
  const routes = useRoutes()
  const { isOpen } = useConversation()

  if (isOpen) {
    return null
  }

  return (
    <div
      className="
        fixed
        bottom-0
        flex
        w-full
        items-center
        justify-between
        border-t-[1px]
        bg-white
        lg:hidden
      "
    >
      {routes.map(route => (
        <MobileItem
          key={route.label}
          href={route.href}
          label={route.label}
          icon={route.icon}
          active={route.active}
          onClick={route.onClick}
        />
      ))}
    </div>
  )
}

export default MobileFooter

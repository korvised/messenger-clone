import { IconType } from 'react-icons'

export interface IRoute {
  label: string
  href: string
  icon: IconType
  active?: boolean
  onClick?: () => void
}

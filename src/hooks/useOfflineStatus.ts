import { useStoreon } from 'storeon/react'
import { NavbarState } from '../store/navbar/types'

export const useOfflineStatus = () => {
  const { navbar }: { navbar: NavbarState } = useStoreon('navbar')
  return navbar.offline
}

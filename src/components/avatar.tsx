import { useUser } from '@clerk/nextjs'
import { UserIcon } from 'lucide-react'
import {
  Avatar as AvatarContainer,
  AvatarFallback,
  AvatarImage,
} from './ui/avatar'

interface AvatarProps {
  size?: 'sm' | 'md'
}

export function Avatar({ size = 'sm' }: AvatarProps) {
  const { user } = useUser()

  return (
    <AvatarContainer
      data-size={size}
      className="data-[size=md]:w-20 data-[size=md]:h-20"
    >
      <AvatarImage src={user?.imageUrl} alt={`${user?.firstName}'s avatar`} />
      <AvatarFallback>
        <UserIcon />
      </AvatarFallback>
    </AvatarContainer>
  )
}

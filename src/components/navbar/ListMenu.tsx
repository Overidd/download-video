'use client';
import { cn } from '@/util';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  navbarData: {
    id: number
    name: string
    path: string
  }[]
}

export const ListMenu = ({
  navbarData,
}: Props) => {

  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <>
      {
        navbarData.map(({ id, name, path }) => (
          <Link
            key={id}
            href={path}
            className={cn(
              'text-gray-500 hover:text-gray-800 transition-colors cursor-pointer',
              isActive(path) && 'text-gray-800'
            )}
          >
            {name}
          </Link>
        ))
      }
    </>
  )
}

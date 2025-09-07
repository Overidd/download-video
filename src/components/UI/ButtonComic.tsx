import React from 'react'
import { Button } from './Button'
import { cn } from '@/util'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  children?: React.ReactNode
}

export const ButtonComic = ({
  className,
  ...props
}: Props) => {
  return (
    <Button
      {...props}
      className={cn(
        'cursor-pointer border-[3px] border-black bg-primary',
        'h-full flex justify-center items-center p-[10px]',
        'font-bold uppercase relative z-[3]',
        'transition-all duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)]',
        '[transform:translateZ(20px)]',
        'hover:[transform:translateZ(10px)_translateX(-5px)_translateY(-5px)]',
        'hover:[box-shadow:5px_5px_0_0_#000]',
        className
      )}
    />
  )
}

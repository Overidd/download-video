import { cn } from '@/util';
import { LoaderCircle } from 'lucide-react';

interface Props {
  isLoading: boolean;
  className?: string;
  children?: React.ReactNode
}

export const CardLoadding = ({
  isLoading,
  className,
  children
}: Props) => {
  if (!isLoading) {
    return children || null
  }

  return (
    <div className={cn(
      'absolute z-10 w-full h-full flex justify-center items-center',
      'bg-card/50',
      className
    )}>
      <LoaderCircle className='mx-auto animate-spin text-secondary-foreground w-10 h-10' />
    </div>
  )
}

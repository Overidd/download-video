import { cn } from '@/util';
import { AlertCircle } from 'lucide-react';

interface Props {
  className?: string;
  message: string;
}

export const DonwloadError = ({
  message,
  className
}: Props) => {

  return (
    <div className={cn(
      'flex items-center gap-2 text-red-600 text-sm font-bold col-end-2',
      className
    )}>
      <AlertCircle className='w-4 h-4' />
      {message}
    </div>
  )
}

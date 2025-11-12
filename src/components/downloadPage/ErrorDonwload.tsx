import { cn } from '@/util';
import { AlertCircle } from 'lucide-react';

interface Props {
  className?: string;
  url: string;
}

export const ErrorDonwload = ({
  url,
  className
}: Props) => {

  return (
    <div className={cn(
      'flex items-center gap-2 text-red-600 text-sm font-bold col-end-2',
      className
    )}>
      <AlertCircle className='w-4 h-4' />
      {url}
    </div>
  )
}

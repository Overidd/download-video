import { cn } from '@/util';
import { Plus } from 'lucide-react';

import {
  InputDownloader,
  ButtonComic
} from '../UI';


interface Props {
  className?: string;
  url: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const FromDownload = ({
  className,
  onChange,
  url,
}: Props) => {

  return (
    <form className={cn(
      'grid grid-cols-[1fr_auto] items-center gap-4',
      className
    )}>
      <InputDownloader
        name='url'
        value={url}
        onChange={onChange}
      // disabled={isLoadingDown}
      />

      <ButtonComic
        type='button'
        variant='outline'
        className='uppercase'
      >
        <Plus className='w-4 h-4' />
        Agregar
      </ButtonComic>
    </form>
  )
}
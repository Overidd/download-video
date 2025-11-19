import Image from 'next/image';
import { cn } from '@/util';
import { IVideoInfo } from '@/interface';
import { Eye, Play } from 'lucide-react';
import { Badge } from '..';

interface Props {
  info: IVideoInfo;
  className?: string
}

export const PreviewVideo = ({
  info,
  className
}: Props) => {

  return <>
    <section className={cn(
      'relative',
      className
    )}>
      <Image
        src={info.thumbnail}
        alt={info.title}
        className='w-40 h-30 object-cover rounded-lg'
        // onError={onHandleImg}
        width={400}
        height={300}
      />
      <a href={info.url} target='_blank'>
        <div
          className='absolute inset-0 bg-opacity-30 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer'
        >
          <Play className='w-8 h-8 text-white' />
        </div>
      </a>
    </section>

    <section className={cn(
      'flex-1 space-y-2 flex flex-wrap gap-2',
      'text-sm text-gray-600'
    )}>
      <h3 className='font-medium line-clamp-2'>
        {info.title}
      </h3>
      <Badge
        variant='secondary'
        className='flex items-center gap-1'
      >
        <Eye className='w-3 h-3' />
        {info.channel}
      </Badge>

      <Badge
        variant='outline'
        className='flex items-center gap-1'
      >
        <Play className='w-3 h-3' />
        {info.duration}
      </Badge>

      <Badge variant='outline'>
        {info.view_count}
      </Badge>

      <Badge variant='outline'>
        {info.is_live ? 'En Vivo' : 'Video'}
      </Badge>
    </section>
  </>
}

import { Eye, Play } from 'lucide-react';
import { IVideoInfo } from '@/service';
import { Badge, Card, CardLoadding } from '../UI';
import Image from 'next/image';

interface Props {
  infoPreview?: IVideoInfo | null,
  isLoading?: boolean
}

export const PreviewDownloader = ({
  infoPreview,
  isLoading
}: Props) => {

  const onHandleImg = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `https://img.youtube.com/vi/${infoPreview?.id}/hqdefault.jpg`;
  }

  if (!infoPreview) {
    return null;
  }

  return (
    <Card className='p-4 bg-gray-50'>
      <div className='flex gap-4 relative'>
        <CardLoadding
          isLoading={!!isLoading}
        />
        <div className='relative'>
          <Image
            src={infoPreview.thumbnail}
            alt={infoPreview.title}
            className='w-40 h-30 object-cover rounded-lg'
            onError={onHandleImg}
            width={400}
            height={300}
          />
          <a href={`https://www.youtube.com/watch?v=${infoPreview.id}`} target='_blank'>
            <div
              className='absolute inset-0 bg-opacity-30 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer'
            >
              <Play className='w-8 h-8 text-white' />
            </div>
          </a>
        </div>
        <div className='flex-1 space-y-2'>
          <h3 className='font-medium line-clamp-2'>
            {infoPreview.title}
          </h3>
          <div className='flex flex-wrap gap-2 text-sm text-gray-600'>
            <Badge
              variant='secondary'
              className='flex items-center gap-1'
            >
              <Eye className='w-3 h-3' />
              {infoPreview.channel}
            </Badge>
            {infoPreview.duration !== 'Unknown' && (
              <Badge
                variant='outline'
                className='flex items-center gap-1'
              >
                <Play className='w-3 h-3' />
                {infoPreview.duration}
              </Badge>
            )}
            {infoPreview.views !== 'Unknown' && (
              <Badge variant='outline'>
                {infoPreview.views}
              </Badge>
            )}
          </div>
          {/* <div className='text-xs text-gray-500'>
            Video ID: {infoPreview.id}
          </div> */}
          {/* {infoPreview.description && (
            <p className='text-sm text-gray-600 line-clamp-2 mt-2'>
              {infoPreview.description}
            </p>
          )} */}
        </div>
      </div>
    </Card>
  )
}
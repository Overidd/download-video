import { Download, Eye, Play, X } from 'lucide-react';
import { IVideoInfo } from '@/service';
import { Badge, Card, SelectComic } from '../UI';
import Image from 'next/image';
import { ButtonComic } from '../UI/ButtonComic';

interface Props {
  isLoading?: boolean;
  infoPreview?: IVideoInfo | null;
  remove: (id: string) => void;
}

export const PreviewDownloader = ({
  infoPreview,
  remove
}: Props) => {

  if (!infoPreview) {
    return null;
  }

  return (
    <Card className='p-4 bg-gray-50 shadow-5xl flex flex-row gap-4 relative'>
      {/* <CardLoadding
        isLoading={!!isLoading}
      /> */}
      <section className='relative'>
        <Image
          src={infoPreview.thumbnail}
          alt={infoPreview.title}
          className='w-40 h-30 object-cover rounded-lg'
          // onError={onHandleImg}
          width={400}
          height={300}
        />
        <a href={infoPreview.url} target='_blank'>
          <div
            className='absolute inset-0 bg-opacity-30 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer'
          >
            <Play className='w-8 h-8 text-white' />
          </div>
        </a>
      </section>

      <section className='flex-1 space-y-2'>
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

        <div className='flex gap-2 w-[20rem]'>
          <SelectComic
            value={''}
            // className='shadow-none border-3'
            options={[{ value: '1', label: 'MP4' }, { value: '2', label: 'WEBM' }]}
            placeholder='Formato'
            onChange={() => { }}
          />

          <SelectComic
            // className=''
            value={''}
            options={[{ value: '2', label: 'MP4' }, { value: '2', label: 'WEBM' }]}
            placeholder='Calidad'
            onChange={() => { }}
          />

          <ButtonComic
            type='button'
            variant='outline'
            className='uppercase h-full'
          >
            <Download
              className='w-4 h-4 mr-2'
            />
            Descargar
          </ButtonComic>
        </div>
      </section>

      <ButtonComic
        size='icon'
        type='button'
        className='text-black'
        onClick={() => remove(infoPreview.id)}
      >
        <X />
      </ButtonComic>
    </Card>
  )
}

// const onHandleImg = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//   e.currentTarget.src = `https://img.youtube.com/vi/${infoPreview?.id}/hqdefault.jpg`;
// }

// "<iframe width="200" height="113" src="https://www.youtube.com/embed/xAaxUUwkkYY?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen title="🚨 URGENTE: DONALD TRUMP AMENAZA A MADURO | AGUSTÍN LAJE Y CARLOS RUCKAUF"></iframe>"
'use client';
import { cn } from '@/util';
import { useDownloadCtx } from '@/hook';
import { PreviewDownloader } from '../homePage';
import { LionfishLoadding } from '../UI';

interface Props {
  className?: string
}

export const ListDownload = ({
  className
}: Props) => {
  const {
    isLoading,
    downloaders,
    removeDonwloader,
  } = useDownloadCtx()

  return (
    <section className={cn(
      'flex flex-col gap-5',
      className
    )}>

      <LionfishLoadding
        className='mx-auto'
        isLoading={isLoading}
      />

      {downloaders.map((downloader) => (
        <PreviewDownloader
          key={downloader.id}
          remove={removeDonwloader}
          infoPreview={downloader}
          isLoading={false}
        />
      ))}
    </section>
  )
}
import { cn } from '@/util';

import type {
  IDownloadOptions,
  IPlaylistInfo,
  IVideoInfo
} from '@/interface';

import {
  Card,
  PreviewPlaylist,
  PreviewVideo
} from '../UI';

import {
  DownloadPlaylistForm,
  DownloadVideoForm
} from '.';

interface Props {
  className?: string
  info?: IVideoInfo | IPlaylistInfo;
  startDownload: (options: IDownloadOptions) => void;
}

export const DownloadPreview = ({
  startDownload,
  className,
  info,
}: Props) => {

  return (
    <Card className={cn(
      'p-4 bg-gray-50 shadow-5xl flex flex-row gap-4 relative',
      className
    )}>
      {info?._type === 'video' && (
        <>
          <PreviewVideo
            info={info}
          />
          <DownloadVideoForm
            info={info}
            onSubmit={startDownload}
          />
        </>
      )}

      {info?._type === 'playlist' && (
        <>
          <PreviewPlaylist
            info={info}
          />
          <DownloadPlaylistForm
            info={info}
            onSubmit={startDownload}
          />
        </>
      )}
    </Card>
  )
}
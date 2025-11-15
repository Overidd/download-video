import type {
  IPlaylistInfo,
  IVideoInfo,
  IVideoProgress,
  TStatus
} from '@/interface';

import {
  DownloadActions,
  DownloadProgress
} from '.';

interface Props {
  className?: string;
  info: IVideoInfo | IPlaylistInfo;
  progress: IVideoProgress;
  status: TStatus;
  onCancel: () => void;
  onPause: () => void;
  onResume: () => void;
}

export const DownloadTask = ({
  info,
  progress,
  onCancel,
  onPause,
  onResume,
  className
}: Props) => {

  return (
    <div>
      <DownloadProgress
        info={info}
        progress={progress}
      />
      <DownloadActions
        onCancel={onCancel}
        onPause={onPause}
        onResume={onResume}
      />
    </div>
  )
}

import { IDownloadOptions, IPlaylistInfo } from '@/interface';


interface Props {
  info: IPlaylistInfo;
  onSubmit: (options: IDownloadOptions) => void;
  className?: string;
}

export const DownloadPlaylistForm = ({
  info,
  onSubmit,
  className
}: Props) => {

  return (
    <div>
      DownloadPlaylistForm
    </div>
  )
}
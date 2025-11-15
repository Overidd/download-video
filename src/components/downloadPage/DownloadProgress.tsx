import type { IPlaylistInfo, IVideoInfo, IVideoProgress } from "@/interface"


interface Props {
  info?: IVideoInfo | IPlaylistInfo;
  progress: IVideoProgress;
  className?: string;
}


export const DownloadProgress = ({
  className,
  progress,
  info
}: Props) => {
  return (
    <div>DownloadProgress</div>
  )
}

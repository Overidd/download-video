

interface Props {
  className?: string;
  onCancel: () => void;
  onPause: () => void;
  onResume: () => void;
}

export const DownloadActions = ({
  className,
  onCancel,
  onPause,
  onResume,
}: Props) => {

  return (
    <div>DownloadActions</div>
  )
}

'use client';
import { cn } from '@/util';
import { useRecordCtx } from '@/hook';
import { DownloadPreview } from './DownloadPreview';

interface Props {
  className?: string
}

export const DownloadList = ({
  className
}: Props) => {
  const {
    records,
    removeRecord
  } = useRecordCtx()

  return (
    <section className={cn(
      'flex flex-col gap-5',
      className
    )}>
      {records.map((record) => (
        <DownloadPreview
          key={record.id}
          remove={removeRecord}
          infoPreview={record}
          isLoading={false}
        />
      ))}
    </section>
  )
}
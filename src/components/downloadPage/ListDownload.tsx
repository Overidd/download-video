'use client';
import { cn } from '@/util';
import { useRecordCtx } from '@/hook';
import { PreviewDownload } from './PreviewDownload';

interface Props {
  className?: string
}

export const ListDownload = ({
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
        <PreviewDownload
          key={record.id}
          remove={removeRecord}
          infoPreview={record}
          isLoading={false}
        />
      ))}
    </section>
  )
}
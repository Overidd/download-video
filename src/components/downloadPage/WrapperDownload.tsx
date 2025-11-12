'use client';
import { cn } from '@/util';
import { validYouTubeUrl } from '@/service';
import { LionfishLoadding } from '../UI';

import {
  FromDownload,
  ErrorDonwload,
  PreviewDownload
} from '.';

import {
  useDebouncedEffect,
  useRecordCtx,
  useDownloadInfo,
  useInput,
  useDownloadMedia,
} from '@/hook';

interface Props {
  className?: string
}

export const WrapperDownload = ({
  className
}: Props) => {

  const {
    removeRecord,
    setRecord,
  } = useRecordCtx();

  const {
    loadInfo,
    isLoading,
    info,
  } = useDownloadInfo();

  const {
    process,
    isComplete,
    downloader
  } = useDownloadMedia();

  const {
    values,
    errors,
    onChange,
    validate,
    reset
  } = useInput({
    url: {
      initialValue: '',
      validators: [validYouTubeUrl]
    },
  });

  useDebouncedEffect(() => {
    if (validate()) {
      loadInfo(values.url);
      reset();
    }
  }, [values], 500);

  return (
    <div
      className={cn(
        'border-[4px] border-black w-full',
        'relative bg-card p-2 md:p-5 gap-[10px]',
        'transition-all duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)]',
        '[transform-style:preserve-3d] [perspective:1000px]',
        '[transform:rotateX(10deg)_rotateY(-5deg)]',
        'hover:[transform:rotateX(5deg)_rotateY(1deg)_scale(1.05)]',
        'hover:shadow-insto',
        'shadow-7xl',
        className
      )}
    >
      <FromDownload
        url={values.url}
        onChange={onChange}
      />

      <LionfishLoadding
        className='mx-auto'
        isLoading={isLoading}
      />

      <PreviewDownload
        infoPreview={info}
        isLoading={false}
      />

      {errors.url && (
        <ErrorDonwload url={errors.url} />
      )}

      <p className='text-sm text-gray-600 font-bold col-end-2'>
        Soporta enlaces de YouTube, YouTube Shorts, TikTok y más
      </p>
    </div>
  )
}
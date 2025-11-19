'use client';
import { useEffect } from 'react';
import { cn, Validate } from '@/util';
import { LoaddingLionfish } from '../UI';
import { DownloadTask } from './DownloadTask';

import {
  DownloadFrom,
  DonwloadError,
  DownloadPreview
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

const validateUrl = (value: string) => {
  return !Validate.urlDownload(value) ? 'La URL no es valida' : null;
};
export const DownloadWrapper = ({ className }: Props) => {

  const { setRecord } = useRecordCtx();

  const {
    info,
    loadInfo,
    isLoading: loadingInfo,
    messageError: errorInfo,
  } = useDownloadInfo();

  const {
    status,
    progress,
    startDownload,
    cancel,
    pause,
    resume,
    messageError: errorMedia,
  } = useDownloadMedia();

  const {
    values,
    errors,
    onChange,
  } = useInput({
    url: {
      initialValue: '',
      validators: [validateUrl],
    },
  });

  useDebouncedEffect(() => {
    if (!errors.url && values.url.trim()) {
      loadInfo(values.url);
    }
  }, [values.url], 500);

  useEffect(() => {
    if (status === 'finished') {
      setRecord(info, status);
    }
  }, [status, info, setRecord]);

  const isPreview = loadingInfo && status === 'idle' && info;
  const isDownloading = (status === 'downloading' || status === 'paused') && progress && info;
  const error = errors.url ?? errorInfo ?? errorMedia;

  return (
    <div className={cn(
      'border-[4px] border-black w-full',
      'relative bg-card p-2 md:p-5 gap-[10px]',
      'transition-all duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)]',
      '[transform-style:preserve-3d] [perspective:1000px]',
      '[transform:rotateX(10deg)_rotateY(-5deg)]',
      'hover:[transform:rotateX(5deg)_rotateY(1deg)_scale(1.05)]',
      'hover:shadow-insto shadow-7xl',
      className
    )}>

      <DownloadFrom
        url={values.url}
        onChange={onChange}
      />

      <LoaddingLionfish
        className="mx-auto"
        isLoading={loadingInfo}
      />

      {isPreview && (
        <DownloadPreview
          info={info}
          startDownload={startDownload}
        />
      )}

      {isDownloading && (
        <DownloadTask
          info={info}
          progress={progress}
          status={status}
          onCancel={cancel}
          onPause={pause}
          onResume={resume}
        />
      )}

      {error &&
        <DonwloadError
          message={error}
        />
      }

      <p className='text-sm text-gray-600 font-bold col-end-2'>
        Soporta enlaces de YouTube, YouTube Shorts, TikTok y más
      </p>
    </div>
  );
};
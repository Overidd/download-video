'use client';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { validYouTubeUrl } from '@/service';

import {
  Card,
  CardContent,
  InputDownloader,
  LionfishLoadding
} from '../UI';

import {
  PreviewDownloader,
} from '../homePage';

import {
  useDebouncedEffect,
  useDownload,
  useInput,
  usePreviewDownloader
} from '@/hook';
import { cn } from '@/util';

interface Props {
  className?: string;
}

export const FromDownloader = ({
  className,
}: Props) => {

  const {
    values,
    errors,
    handleChange,
    validate,
    // reset
  } = useInput({
    url: {
      initialValue: '',
      validators: [validYouTubeUrl]
    },
  });

  const {
    stage,
    progress,
    isComplete,
    downloadVideo,
    setUrl: setUrlDown,
    messageError: messageErrorDown,
    isLoading: isLoadingDown,
  } = useDownload()

  const {
    infoPreview,
    setUrl: setUrlPreview,
    // messageError: messageErrorPreview,
    isLoading: isLoadingPreview,
  } = usePreviewDownloader()

  const {
    isLoading: isLoadingDebounce
  } = useDebouncedEffect(() => {
    if (validate()) {
      setUrlDown(values.url);
      setUrlPreview(values.url);
    }
  }, [values], 1000);

  return (
    <Card className={cn(
      'max-w-2xl bg-white border-4 border-black shadow-7xl transform rotate-1',
      className
    )}>
      <CardContent className='p-4 md:p-6 px-5 md:px-10 flex flex-col gap-4 relative'>
        <InputDownloader
          value={values.url}
          onChange={handleChange}
          isComplete={isComplete}
          onClick={downloadVideo}
          isDownloading={isLoadingDown}
        />

        <PreviewDownloader
          infoPreview={infoPreview}
          isLoading={isLoadingPreview}
        />

        <LionfishLoadding
          className='mx-auto'
          isLoading={isLoadingDebounce}
        />

        {(isLoadingDown || isComplete) && (
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-black font-bold'>
                {stage}
              </span>
              <span className='text-sm text-black font-bold'>
                {progress}%
              </span>
            </div>
            <div className='h-6 bg-gray-200 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden'>
              <div
                className='h-full bg-green-500 rounded-full border-r-4 border-black transition-all duration-300'
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            {isComplete && (
              <div className='flex items-center gap-2 text-green-600 text-sm font-bold'>
                <CheckCircle className='w-4 h-4' />
                <span>
                  Video descargado exitosamente
                </span>
              </div>
            )}
          </div>
        )}

        {errors.url || messageErrorDown && (
          <div className='flex items-center gap-2 text-red-600 text-sm font-bold'>
            <AlertCircle className='w-4 h-4' />
            <span>
              {errors.url || messageErrorDown}
            </span>
          </div>
        )}

        <p className='text-sm text-gray-600 font-bold'>
          Soporta enlaces de YouTube, YouTube Shorts, TikTok y más
        </p>
      </CardContent>
    </Card>
  )
}
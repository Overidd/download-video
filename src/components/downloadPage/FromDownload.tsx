'use client';
import { cn } from '@/util';
import { AlertCircle, Plus } from 'lucide-react';
import { validYouTubeUrl } from '@/service';

import {
  InputDownloader,
} from '../UI';

import {
  useDebouncedEffect,
  useDownloadCtx,
  useInput,
} from '@/hook';
import { ButtonComic } from '../UI/ButtonComic';

interface Props {
  className?: string;
}

export const FromDownload = ({
  className,
}: Props) => {

  const {
    loadDonwloader
  } = useDownloadCtx();

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
      loadDonwloader(values.url);
      reset();
    }
  }, [values], 500);

  return (
    <form className={cn(
      'border-[4px] border-black w-full',
      'relative bg-card p-2 md:p-5 gap-[10px]',
      'transition-all duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)]',
      '[transform-style:preserve-3d] [perspective:1000px]',
      '[transform:rotateX(10deg)_rotateY(-5deg)]',
      'hover:[transform:rotateX(5deg)_rotateY(1deg)_scale(1.05)]',
      'grid grid-cols-[1fr_auto] items-center',
      'hover:shadow-insto',
      'shadow-7xl',
      className
    )}>
      <InputDownloader
        name='url'
        value={values.url}
        onChange={onChange}
      // disabled={isLoadingDown}
      />
      <ButtonComic
        type='button'
        variant='outline'
        className='uppercase'
      >
        <Plus className='w-4 h-4' />
        Agregar
      </ButtonComic>

      {errors.url && (
        <div className='flex items-center gap-2 text-red-600 text-sm font-bold col-end-2'>
          <AlertCircle className='w-4 h-4' />
          {errors.url}
        </div>
      )}

      <p className='text-sm text-gray-600 font-bold col-end-2'>
        Soporta enlaces de YouTube, YouTube Shorts, TikTok y más
      </p>
    </form>
  )
}
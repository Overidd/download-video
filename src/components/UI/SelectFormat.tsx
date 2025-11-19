import { useState } from 'react';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '.';
import { cn, formatSize } from '@/util';
import { VideoFormat } from '@/interface';

interface Props {
  placeholder?: string;
  className?: string;
  formats: VideoFormat[];
  onChange: (e: { value: string; name: string, type?: string }) => void;
  name: string;
  value: string | null;
  type: 'audio' | 'video';
  isError?: boolean;
}

export const SelectFormat = ({
  placeholder,
  className,
  formats,
  onChange,
  name,
  value,
  type,
  isError
}: Props) => {

  const handleChange = (formatId: string) => {
    onChange({ value: formatId, name, type: 'select' });
  };

  return (
    <Select
      value={value || ''}
      onValueChange={handleChange}
    >
      <SelectTrigger
        className={cn(
          'bg-primary text-center',
          'rounded-none',
          'w-full px-2',
          'shadow-none border-3',
          'hover:shadow-6xl',
          'font-bold text-black text-left',
          'hover:translate-x-[-2px] hover:translate-y-[-2px]',
          'active:translate-x-[2px] active:translate-y-[2px]',
          'transition-all duration-150 ease-out',
          'flex items-center justify-between',
          className,
        )}
      >
        <SelectValue
          placeholder={placeholder || `Selecciona un formato de ${type}`}
        />
      </SelectTrigger>
      <SelectContent
        className={cn(
          'rounded-none',
          'bg-gray-100 ',
          'overflow-hidden',
          'border-4 border-black ',
          'shadow-7xl',
        )}
      >
        {formats.map((f, index) => (
          <SelectItem
            key={f.format_id}
            value={f.format_id}
            className={cn(
              'hover:bg-primary/80',
              'active:bg-primary',
              'transition-colors duration-150',
              'w-full px-4 py-3 text-left font-bold text-black',
              index !== formats.length - 1 ? 'border-b-2 border-black' : '',
            )}
          >
            <div className='flex flex-col gap-1'>
              <p className='font-medium'>
                {f.format_id} — {f.format_note}
              </p>
              <p className='text-sm text-muted-foreground'>
                Ext: {f.ext} · Codec: {f.acodec}
              </p>
              <p className='text-sm text-muted-foreground'>
                Bitrate: {f.tbr ? `${f.tbr} kbps` : '–'}
              </p>
              <p className='text-sm text-muted-foreground'>
                Peso: {formatSize(f.filesize ?? f.filesize_approx)}
              </p>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
'use client';

import { VideoFormat } from '@/interface';
import { useMemo } from 'react';

// interface IFormat {
//   vcodec?: string;
//   acodec?: string;
//   height?: number | null;
//   tbr?: number | null;
//   [key: string]: unknown;
// }

interface UseMediaFormatsResult {
  videos: VideoFormat[];
  audios: VideoFormat[];
}

export const useMediaFormats = (formats: VideoFormat[]): UseMediaFormatsResult => {
  const { videos, audios } = useMemo(() => {
    const videos = formats
      .filter(f => f.vcodec && f.vcodec !== 'none')
      .sort((a, b) => (b.height ?? 0) - (a.height ?? 0));

    const audios = formats
      .filter(f => f.acodec && f.acodec !== 'none' && (f.vcodec === 'none' || !f.vcodec))
      .sort((a, b) => (b.tbr ?? 0) - (a.tbr ?? 0));

    return { videos, audios };
  }, [formats]);

  return { videos, audios };
};

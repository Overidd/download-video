// downloadStateReducer.ts

import { IPlaylistInfo, IVideoInfo } from '@/interface';

export interface DownloadStateInput {
  status: string;
  loadingInfo: boolean;
  info: IVideoInfo | IPlaylistInfo | null;
  errors: {
    url?: string | null;
    info?: string | null;
    media?: string | null;
  };
}

export interface DownloadStateOutput {
  isPreview: boolean;
  isDownloading: boolean;
  error: string | null;
}

export const useDownloadState = ({
  status,
  loadingInfo,
  info,
  errors,
}: DownloadStateInput): DownloadStateOutput => {
  const isPreview = !loadingInfo && info && status === 'idle"';

  const isDownloading =
    status === "downloading" ||
    status === "paused" ||
    status === "processing";

  const error =
    errors.url ||
    errors.info ||
    errors.media ||
    null;

  return {
    isPreview: !!isPreview,
    isDownloading,
    error,
  };
};

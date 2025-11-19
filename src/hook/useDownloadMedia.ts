'use client';

import { useMemo, useState, useRef } from 'react';
import { IDownloadOptions, IVideoProgress, TStatus } from '@/interface';
import { DownloadService } from '@/service';

export const useDownloadMedia = () => {

  const [progress, setProgress] = useState<IVideoProgress | null>(null);
  const [status, setStatus] = useState<TStatus>('idle');
  const [messageError, setMessageError] = useState<string | null>(null);

  const downloadService = useMemo(() => new DownloadService(), []);

  const wsRef = useRef<WebSocket | null>(null);

  const startDownload = async (options: IDownloadOptions) => {
    setStatus('downloading');
    setProgress(null);

    const ws = await downloadService.downloadVideo(options, {
      onProgress: (p) => {
        setProgress(p);
        setStatus('downloading');
      },
      onDone: () => {
        setStatus('done');
      },
      onPaused: () => {
        setStatus('paused');
      },
      onCanceled: () => {
        setStatus('canceled');
      },
      onError: (msg) => {
        setMessageError(msg);
        setStatus('error');
      },
      onFinished: () => {
        setStatus('finished');
      },
    });

    wsRef.current = ws;
  };

  const pause = () => {
    downloadService.pause();
    setStatus('paused');
  };

  const resume = () => {
    downloadService.resume();
    setStatus('downloading');
  };

  const cancel = () => {
    downloadService.cancel();
    setStatus('canceled');
    setProgress(null);
    wsRef.current = null;
  };

  return {
    progress,
    status,
    messageError,

    // Functions
    startDownload,
    pause,
    resume,
    cancel,

    ws: wsRef.current,
  };
};
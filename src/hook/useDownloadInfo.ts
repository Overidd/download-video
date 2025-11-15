'use client';

import { IPlaylistInfo, IVideoInfo } from '@/interface';
import { DownloadService } from '@/service';
import { Validate } from '@/util';
import { useMemo, useState } from 'react';

interface IState {
  info: IVideoInfo | IPlaylistInfo | null;
  isLoading: boolean;
  messageError: string | null;
}

export const useDownloadInfo = () => {
  const [state, setState] = useState<IState>({
    info: null,
    isLoading: false,
    messageError: null
  });

  const downloadService = useMemo(() => new DownloadService(), []);

  const loadInfo = async (url: string) => {
    if (!url || !Validate.urlDownload(url)) {
      setState(prev => ({
        ...prev,
        messageError: "URL inválida"
      }));
      return;
    }

    // Start loading
    setState({
      info: null,
      isLoading: true,
      messageError: null
    });

    try {
      const info = await downloadService.getInfo(url);
      setState({
        info,
        isLoading: false,
        messageError: null
      });

    } catch (error) {
      setState({
        info: null,
        isLoading: false,
        messageError: error instanceof Error ? error.message : "Error desconocido"
      });
    }
  };

  return {
    loadInfo,
    ...state,
  };
};

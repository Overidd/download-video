'use client';
import { useYouTubeInfo } from '@/hook';
import React, { useReducer, useState } from 'react';
import { downloadreducer, DownloadCtx, ActionType } from '.';
import { IVideoInfo } from '@/service';

export const initialState: IVideoInfo[] = []

export const ProviderDownload = ({
  children
}: React.PropsWithChildren) => {
  const [downloaders, dispatch] = useReducer(downloadreducer, initialState)
  const [urlDownload, setUrlDownload] = useState<string | null>(null);

  const {
    loadInfo,
    isLoading
  } = useYouTubeInfo();

  const setDonwloader = (info?: IVideoInfo | null) => {
    if (!info) return;

    dispatch({
      type: ActionType.SET_DOWNLOADER,
      payload: info
    });
  }

  const removeDonwloader = (id: string) => {
    dispatch({
      type: ActionType.REMOVE_DOWNLOADER,
      payload: { id }
    });
  }

  const loadDonwloader = async (url: string) => {
    const info = await loadInfo(url);
    setDonwloader(info);
    setUrlDownload(url);
  }

  return (
    <DownloadCtx.Provider value={{
      isLoading,
      loadDonwloader,
      removeDonwloader,
      setDonwloader,
      downloaders,
    }}>
      {children}
    </DownloadCtx.Provider>
  )
}

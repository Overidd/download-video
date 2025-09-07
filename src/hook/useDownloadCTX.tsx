'use client';
import { DownloadCtx } from '@/context/download';
import { useContext } from 'react';

export const useDownloadCtx = () => {
  const ctx = useContext(DownloadCtx);

  if (!ctx) throw new Error('useDownloadCtx must be used within a ProviderDownload');

  return {
    ...ctx
  }
}

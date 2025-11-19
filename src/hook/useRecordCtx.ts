'use client';
import { RecordCtx } from '@/context/Record';
import { useContext } from 'react';

export const useRecordCtx = () => {
  const ctx = useContext(RecordCtx);

  if (!ctx) throw new Error('useDownloadCtx must be used within a ProviderDownload');

  return {
    ...ctx
  }
}

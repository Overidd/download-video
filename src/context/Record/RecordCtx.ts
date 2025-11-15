'use client';
import { IPlaylistInfo, IVideoInfo, TStatus } from '@/interface';
import { createContext } from 'react';

interface Type {
   removeRecord: (id: string) => void;
   setRecord: (videoInfo: IVideoInfo | IPlaylistInfo | null, status: TStatus) => void;
   records: IVideoInfo[]
}


export const RecordCtx = createContext<Type | null>(null);
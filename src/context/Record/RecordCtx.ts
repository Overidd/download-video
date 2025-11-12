'use client';
import { IVideoInfo } from '@/service';
import { createContext } from 'react';

interface Type {
   // loadDonwloader: (url: string) => void;
   removeRecord: (id: string) => void;
   setRecord: (videoInfo: IVideoInfo) => void;
   // isLoading: boolean;
   records: IVideoInfo[]
}


export const RecordCtx = createContext<Type | null>(null);
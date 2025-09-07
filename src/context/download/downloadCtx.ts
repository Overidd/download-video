'use client';
import { IVideoInfo } from '@/service';
import { createContext } from 'react';

interface Type {
   loadDonwloader: (url: string) => void;
   removeDonwloader: (id: string) => void;
   setDonwloader: (videoInfo: IVideoInfo) => void;
   isLoading: boolean;
   downloaders: IVideoInfo[]
}


export const DownloadCtx = createContext<Type | null>(null);
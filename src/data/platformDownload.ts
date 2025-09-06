import { Music, Smartphone, Youtube } from 'lucide-react';

export interface IplatformDownload {
   id: number;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   icon: any;
   name: string;
   color: string;
}

export const platformDownload: IplatformDownload[] = [
   {
      id: 1,
      icon: Youtube,
      name: 'Youtube',
      color: 'text-chart-6',
   },
   {
      id: 2,
      icon: Smartphone,
      name: 'TikTok',
      color: 'text-chart-4',
   },
   {
      id: 3,
      icon: Music,
      name: 'Audio MP3',
      color: 'text-chart-2',
   }
]

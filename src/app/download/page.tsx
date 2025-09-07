import { Metadata } from 'next';

import {
  FromDownload,
  ListDownload
} from '@/components/downloadPage';

import {
  ProviderDownload
} from '@/context/download';
import { cn } from '@/util';

export const metadata: Metadata = {
  title: 'Download',
  description: 'Download videos from YouTube and more',
};

export default function DownloadPage() {
  return (
    <main className='min-h-dvh bg-primary overflow-hidden'>
      <div className={cn(
        'container mx-auto w-[90%] max-w-6xl',
      )}>
        <ProviderDownload>
          <FromDownload
            className='mt-24 mx-auto'
          />
          <ListDownload
            className='my-10'
          />
        </ProviderDownload>
      </div>
    </main>
  )
}
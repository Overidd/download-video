import { Metadata } from 'next';

import {
  DownloadList,
  DownloadWrapper
} from '@/components/downloadPage';

import {
  ProviderRecord
} from '@/context/Record';
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
        <ProviderRecord>
          <DownloadWrapper
            className='mt-24 mx-auto'
          />
          <DownloadList
            className='my-10'
          />
        </ProviderRecord>
      </div>
    </main>
  )
}
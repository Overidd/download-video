import { FromDownloader } from '@/components/from';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Download',
  description: 'Download videos from YouTube and more',
};

export default function DownloadPage() {
  return (
    <main className='min-h-dvh bg-primary overflow-hidden'>
      <div className='container mx-auto w-[90%] max-w-6xl'>
        <FromDownloader
          className='mt-24 mx-auto'
        />
      </div>
    </main>
  )
}

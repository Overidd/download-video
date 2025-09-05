// className='h-[calc(100vh-80px)]'
import {
  Characteristics,
  FigureAnimation,
  SectionDownloader
} from '@/components/homePage';

export default function VideoDownloaderPage() {

  return (
    <>
      <FigureAnimation />

      <SectionDownloader className='min-h-[calc(100vh-5rem)]' />

      <Characteristics />
    </>
  )
}
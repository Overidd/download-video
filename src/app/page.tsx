import {
  Characteristics,
  FigureAnimation,
  SectionDownloader
} from '@/components/homePage';

export default function HomePage() {

  return (
    <>
      <FigureAnimation />

      <SectionDownloader
        className='min-h-[calc(100vh-5rem)]'
      />

      <Characteristics />
    </>
  )
}
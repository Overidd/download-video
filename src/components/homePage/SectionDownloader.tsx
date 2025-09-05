import { Youtube, Smartphone, Music } from 'lucide-react';
import { FromDownloader } from '../from';

// drop-shadow-[8px_8px_0px_#fff5]
export const SectionDownloader = () => {
  return (
    <section className='py-32 px-6 bg-primary'>
      <div className='container mx-auto max-w-6xl'>
        <div className='max-w-4xl'>
          <h1 className='text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-6 text-black transform -rotate-2'>
            DESCARGAR
            <br />
            <span >
              VIDEO
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-black mb-12 max-w-lg font-black'>
            descargar videos de youtube y de tiktok
          </p>

          <FromDownloader />

          <div className='flex items-center gap-8 mt-16 flex-wrap'>
            <div className='flex items-center gap-3 text-black p-4 rounded-lg bg-white border-4 border-black shadow-6xl transform -rotate-1'>
              <Youtube className='w-8 h-8 text-chart-6' />
              <span className='font-black text-lg'>YouTube</span>
            </div>

            <div className='flex items-center gap-3 text-black p-4 rounded-lg bg-white border-4 border-black shadow-6xl transform rotate-1'>
              <Smartphone className='w-8 h-8 text-chart-4' />
              <span className='font-black text-lg'>TikTok</span>
            </div>

            <div className='flex items-center gap-3 text-black p-4 rounded-lg bg-white border-4 border-black shadow-6xl transform -rotate-1'>
              <Music className='w-8 h-8 text-chart-2' />
              <span className='font-black text-lg'>Audio MP3</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

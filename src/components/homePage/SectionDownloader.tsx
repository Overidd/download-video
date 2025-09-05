import { FromDownloader } from '../from';
import { platformDownload } from '@/data';
import { cn } from '@/util';

// drop-shadow-[8px_8px_0px_#fff5]
interface Props {
  className?: string;
}

export const SectionDownloader = ({
  className,
}: Props) => {
  return (
    <section className={cn(
      'bg-primary flex items-center justify-center py-10',
      className
    )}>
      <div className='container mx-auto max-w-6xl'>
        <div className='max-w-4xl'>
          <h1 className='text-6xl md:text-6xl lg:text-8xl font-black leading-none mb-6 text-black transform -rotate-2 uppercase'>
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
            {
              platformDownload.map(({ id, icon: Icon, name, color }) => (
                <div
                  key={id}
                  className='flex items-center gap-3 text-black p-4 rounded-lg bg-white border-4 border-black shadow-7xl hover:shadow-6xl hover:translate-x-1 hover:translate-y-1 transition-all transform -rotate-1 group'
                >
                  <Icon className={cn('w-8 h-8 group-hover:shake', color)} />
                  <span className='font-black text-lg'>
                    {name}
                  </span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  )
}
import { FromDownloader } from '../from';
import { platformDownload } from '@/data';
import { cn } from '@/util';

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
      <div className='container mx-auto w-[90%] max-w-6xl grid md:grid-cols-2 gap-10 items-start justify-between'>
        <div className='space-y-10'>
          <h1 className={cn(
            'text-4xl md:text-6xl lg:text-7xl font-black leading-none text-black transform -rotate-2 uppercase',
            'text-center md:text-left'
          )}>
            DESCARGAR
            <br />
            <span >
              VIDEO
            </span>
          </h1>
          <div className='flex items-center gap-4 flex-wrap'>
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
        <FromDownloader />
      </div>
    </section>
  )
}
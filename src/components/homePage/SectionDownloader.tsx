import { cn } from '@/util';
import { platformDownload } from '@/data';
import { ListDetailsPlatform } from './ListDetailsPlatform';
import { Titleh1 } from '../UI';

interface Props {
  className?: string;
}

export const SectionDownloader = ({
  className,
}: Props) => {
  return (
    <article className={cn(
      'bg-primary flex items-center justify-center',
      'min-h-[calc(100vh-5rem)]',
      className
    )}>
      <div className='container mx-auto w-[90%] max-w-6xl grid md:grid-cols-2 gap-10 items-start justify-between'>
        <section className='space-y-10'>
          <Titleh1
            title='Descarga videos'
          />
          <ListDetailsPlatform
            platformDownload={platformDownload}
          />
        </section>

        <div className='w-fit mx-auto relative rounded-4xl overflow-hidden shadow-7xl'>
          <video
            className='w-full h-[20rem]'
            src='/astronaut-space-shuttle.mp4'
            autoPlay
            loop
            muted
          />
        </div>
      </div>
    </article>
  )
}

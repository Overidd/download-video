import { cn } from '@/util';
import { platformDownload } from '@/data';
import { ListDetailsPlatform } from './ListDetailsPlatform';
import { FromDownloader } from '../from';
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

        <FromDownloader />
      </div>
    </article>
  )
}
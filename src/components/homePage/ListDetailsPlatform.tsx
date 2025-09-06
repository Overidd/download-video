import { IplatformDownload } from '@/data'
import { cn } from '@/util'

interface ListDetailsPlatformProps {
  platformDownload: IplatformDownload[];
  className?: string;
}

export const ListDetailsPlatform = ({
  platformDownload,
  className
}: ListDetailsPlatformProps) => {

  return (
    <ul className={cn(
      'flex items-center gap-4 flex-wrap justify-center',
      className
    )}>
      {
        platformDownload.map(({ id, icon: Icon, name, color }) => (
          <li
            key={id}
            className='flex items-center gap-3 text-black p-4 rounded-lg bg-white border-4 border-black shadow-7xl hover:shadow-6xl hover:translate-x-1 hover:translate-y-1 transition-all transform -rotate-1 group'
          >
            <Icon className={cn('w-8 h-8 group-hover:shake', color)} />
            <span className='font-black text-lg'>
              {name}
            </span>
          </li>
        ))
      }
    </ul>
  )
}
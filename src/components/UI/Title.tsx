import { cn } from '@/util';


interface Titleh1Props {
  title?: string;
  subtitle?: string;
  className?: string;
}
export const Titleh1 = ({
  title,
  subtitle,
  className
}: Titleh1Props) => {
  return (
    <h1 className={cn(
      'text-4xl md:text-6xl lg:text-7xl font-black leading-none text-black transform -rotate-2 uppercase',
      'text-center md:text-left',
      className
    )}>
      {title}
      <br />
      <span >
        {subtitle}
      </span>
    </h1>
  )
}

export const Titleh2 = () => {
  return (
    <div>Title</div>
  )
}
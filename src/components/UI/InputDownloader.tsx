import { CheckCircle, Download } from 'lucide-react';
import { cn } from '@/util';

interface InputDownloaderProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  isDownloading: boolean,
  isComplete: boolean,
  value?: string,
  name?: string
}

export const InputDownloader = ({
  isDownloading,
  isComplete,
  onChange,
  onClick,
  name = 'url',
  value = ''
}: InputDownloaderProps) => {

  return (
    <div
      className={cn(
        'relative bg-card p-2 md:p-5 flex justify-start items-center gap-[10px]',
        'border-[4px] border-black w-full',
        'transition-all duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)]',
        '[transform-style:preserve-3d] [perspective:1000px]',
        '[transform:rotateX(10deg)_rotateY(-5deg)]',
        'hover:[transform:rotateX(5deg)_rotateY(1deg)_scale(1.05)]',
        'hover:shadow-insto',
        //   'shadow-7xl',
      )}
    >
      <div
        className={cn(
          'absolute w-full h-full left-0 bottom-0 -z-10',
          '[transform:translateZ(-50px)]',
          '[filter:blur(20px)]',
          `content-['']`,
        )}
      />

      <input
        value={value}
        onChange={onChange}
        disabled={isDownloading}
        type='text'
        name={name}
        placeholder='Ingresar URL'
        className={cn(
          'w-full outline-none border-[3px] border-black',
          'p-[10px] text-[18px] bg-white text-black relative z-[3]',
          'font-[Roboto,Arial,sans-serif] tracking-[-0.5px]',
          'transition-all duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)]',
          '[transform:translateZ(10px)]',
          'placeholder:text-[#666] placeholder:font-bold placeholder:uppercase',
          'hover:bg-card focus:bg-card',
          'hover:[transform:translateZ(20px)_translateX(-5px)_translateY(-5px)]',
          'focus:[transform:translateZ(20px)_translateX(-5px)_translateY(-5px)]',
          'hover:[box-shadow:5px_5px_0_0_#000]',
          'focus:[box-shadow:5px_5px_0_0_#000]',
        )}
      />

      
      <span
        className='
      absolute top-[-10px] left-[20px] bg-primary text-black font-bold
      px-[10px] py-[5px] text-[14px] z-[4] border-[2px] border-black
      [transform:translateZ(50px)]
    '
      >
        URL
      </span>
    </div>
  )
}
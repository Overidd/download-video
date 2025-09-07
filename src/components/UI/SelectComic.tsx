'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/util';
import { cva } from 'class-variance-authority';

interface Props {
  value?: string;
  className?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  variant?: 'default';
  size?: 'sm' | 'base' | 'lg' | 'xl' | 'icon';
  onChange?: (value: string) => void;
}

const selectVariants = cva(
  '',
  {
    variants: {
      variant: {
        default: '',
      },
      size: {
        sm: 'h-7 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 py-4 text-sm',
        base: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 py-5 text-sm',
        lg: 'h-12 rounded-md px-4 text-base',
        xl: 'h-14 rounded-md px-4 has-[>svg]:px-5 text-lg',
        icon: 'size-10 text-xl',
      },
      defaultVariants: {
      },
    }
  })

export const SelectComic = ({
  value,
  options,
  onChange,
  size = 'base',
  variant = 'default',
  placeholder = 'Selecciona una opción',
  className = '',
}: Props) => {

  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || '')

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue)
    onChange?.(optionValue)
    setIsOpen(false)
  }

  const selectedOption = options.find((option) => option.value && option.label && option.value === selectedValue);

  return (
    <div className={`relative w-full max-w-xs`}>
      <button
        type='button'
        aria-expanded={isOpen}
        aria-haspopup='listbox'
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          // 'border-4 border-black ',
          // 'shadow-6xl active:shadow-5xl',
          'bg-primary text-center',
          'rounded-none',
          'w-full px-2',
          'shadow-none border-3',
          'hover:shadow-6xl',
          'font-bold text-black text-left',
          'hover:translate-x-[-2px] hover:translate-y-[-2px]',
          'active:translate-x-[2px] active:translate-y-[2px]',
          'transition-all duration-150 ease-out',
          'flex items-center justify-between',
          isOpen && 'shadow-5xl translate-x-[2px] translate-y-[2px]',
          selectVariants({ variant, size }),
          className
        )}
      >
        <span className='truncate'>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown className={`w-5 h-5 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className='fixed inset-0 z-10' onClick={() => setIsOpen(false)} />

          <div className='absolute top-full left-0 w-full mt-2 z-20'>
            <div
              className={cn(
                'rounded-none',
                'bg-gray-100 ',
                'overflow-hidden',
                'border-4 border-black ',
                'shadow-7xl',
              )}>
              {options.map((option, index) => (
                <button
                  key={option.value}
                  type='button'
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    'hover:bg-primary/80',
                    'active:bg-primary',
                    'transition-colors duration-150',
                    'w-full px-4 py-3 text-left font-bold text-black',
                    index !== options.length - 1 ? 'border-b-2 border-black' : '',
                    selectedValue === option.value ? 'bg-primary/50' : 'bg-gray-100',
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
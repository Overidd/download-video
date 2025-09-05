'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/util';

interface ComicSelectProps {
  value?: string
  className?: string
  placeholder?: string
  options: { value: string; label: string }[]
  onChange?: (value: string) => void
}

export function ComicSelect({
  value,
  options,
  onChange,
  className = '',
  placeholder = 'Selecciona una opción',
}: ComicSelectProps) {

  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || '')

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue)
    onChange?.(optionValue)
    setIsOpen(false)
  }

  const selectedOption = options.find((option) => option.value && option.label && option.value === selectedValue);

  return (
    <div className={`relative w-full max-w-xs ${className}`}>
      <button
        type='button'
        aria-expanded={isOpen}
        aria-haspopup='listbox'
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'hover:shadow-7xl',
          'bg-primary ',
          'rounded-none',
          'w-full px-4 py-3 ',
          'border-4 border-black ',
          'shadow-6xl active:shadow-5xl',
          'font-bold text-black text-left',
          'hover:translate-x-[-2px] hover:translate-y-[-2px]',
          'active:translate-x-[2px] active:translate-y-[2px]',
          'transition-all duration-150 ease-out',
          'flex items-center justify-between',
          isOpen && 'shadow-5xl translate-x-[2px] translate-y-[2px]'
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
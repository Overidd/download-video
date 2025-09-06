import { Download } from 'lucide-react'
import React from 'react'
import { Button } from '../UI'
import { navbarData } from '@/data'
import { ListMenu } from './ListMenu'
import Link from 'next/link'

export const Navbar = () => {
  return (
    <header className='relative z-10 bg-white border-b-4 border-black shadow-[0px_8px_0px_0px_rgba(0,0,0,1)]'>
      <div className='container mx-auto px-6 py-4 flex items-center justify-between'>
        <Link href='/'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-yellow-400 rounded-lg border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
              <Download className='w-6 h-6 text-black' />
            </div>
            <h1 className='text-2xl font-black text-black drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]'>
              VideoGrab
            </h1>
          </div>
        </Link>
        <nav className='hidden md:flex items-center gap-8 text-black font-bold'>
          <ListMenu
            navbarData={navbarData}
          />
          <Button
            variant='secondary'
            size='sm'
            className='bg-red-500 text-white border-4 border-black font-black hover:bg-red-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all'
          >
            Soporte
          </Button>
        </nav>
      </div>
    </header >
  )
}

import React from 'react'

export const FigureAnimation = () => {
  return (
    <>
      <div className='absolute top-20 left-10 w-16 h-16 bg-chart-6 rounded-full border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-bounce' />
      <div className='absolute top-40 right-20 w-20 h-20 bg-chart-2 rounded-lg border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-pulse' />
      <div
        className='absolute bottom-40 left-20 w-12 h-12 bg-chart-2 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-bounce'
        style={{ animationDelay: '1s' }}
      />
      {/* <div
        className='absolute top-60 left-1/3 w-14 h-14 bg-chart-3 rounded-lg border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] animate-pulse'
        style={{ animationDelay: '0.5s' }}
      /> */}
      <div
        className='absolute bottom-60 right-1/4 w-18 h-18 bg-chart-4 rounded-full border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-bounce'
        style={{ animationDelay: '1.5s' }}
      />
    </>
  )
}

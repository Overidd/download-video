import React from 'react'

export const Process = () => {
   return (
      <div>
         {(isLoadingDown || isComplete) && (
            <div className='space-y-3'>
               <div className='flex items-center justify-between'>
                  <span className='text-sm text-black font-bold'>
                     {stage}
                  </span>
                  <span className='text-sm text-black font-bold'>
                     {progress}%
                  </span>
               </div>
               <div className='h-6 bg-gray-200 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden'>
                  <div
                     className='h-full bg-green-500 rounded-full border-r-4 border-black transition-all duration-300'
                     style={{ width: `${progress}%` }}
                  ></div>
               </div>
               {isComplete && (
                  <div className='flex items-center gap-2 text-green-600 text-sm font-bold'>
                     <CheckCircle className='w-4 h-4' />
                     <span>
                        Video descargado exitosamente
                     </span>
                  </div>
               )}
            </div>
         )}

      </div>
   )
}

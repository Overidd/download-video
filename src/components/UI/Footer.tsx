import { Download } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className='relative z-10 border-t-4 border-black bg-gray-800 shadow-[0px_8px_0px_0px_rgba(0,0,0,1)] py-12 px-6'>
      <div className='container mx-auto max-w-6xl text-center'>
        <div className='flex items-center justify-center gap-3 mb-6'>
          <div className='w-10 h-10 bg-yellow-400 rounded-lg border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
            <Download className='w-6 h-6 text-black' />
          </div>
          <h3 className='text-2xl font-black text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]'>VideoGrab</h3>
        </div>
        <p className='text-white mb-8 max-w-md mx-auto font-bold'>
          La mejor herramienta para descargar videos de YouTube y TikTok de forma gratuita y segura.
        </p>
        <div className='text-sm text-gray-300 font-bold'>
          <p>&copy; 2025 VideoGrab. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

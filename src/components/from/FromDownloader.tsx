'use client';
import { useState } from 'react';
import { Card, CardContent, InputDownloader } from '../UI';
import { AlertCircle, CheckCircle } from 'lucide-react';

export const FromDownloader = () => {
  const [url, setUrl] = useState('')
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [downloadStage, setDownloadStage] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState('')

  const simulateDownload = async () => {
    if (!url.trim()) {
      setError('Por favor ingresa una URL válida')
      return
    }

    setError('')
    setIsDownloading(true)
    setDownloadProgress(0)
    setIsComplete(false)

    const stages = [
      { stage: 'Analizando URL...', progress: 20, delay: 1000 },
      { stage: 'Obteniendo información del video...', progress: 40, delay: 1500 },
      { stage: 'Procesando video...', progress: 60, delay: 2000 },
      { stage: 'Optimizando calidad...', progress: 80, delay: 1500 },
      { stage: 'Preparando descarga...', progress: 95, delay: 1000 },
      { stage: '¡Descarga completada!', progress: 100, delay: 500 },
    ]

    for (const { stage, progress, delay } of stages) {
      setDownloadStage(stage)
      setDownloadProgress(progress)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }

    setIsDownloading(false)
    setIsComplete(true)

    // Reset después de 3 segundos
    setTimeout(() => {
      setIsComplete(false)
      setDownloadProgress(0)
      setDownloadStage('')
      setUrl('')
    }, 3000)
  }

  return (
    <Card className='max-w-2xl bg-white border-4 border-black shadow-7xl transform rotate-1'>
      <CardContent className='p-6 px-10'>
        <InputDownloader
          isComplete={isComplete}
          isDownloading={isDownloading}
          onChange={(e) => setUrl(e.target.value)}
          onClick={simulateDownload}
          value={url}
        />

        {(isDownloading || isComplete) && (
          <div className='mt-6 space-y-3'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-black font-bold'>
                {downloadStage}
              </span>
              <span className='text-sm text-black font-bold'>
                {downloadProgress}%
              </span>
            </div>
            <div className='h-6 bg-gray-200 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden'>
              <div
                className='h-full bg-green-500 rounded-full border-r-4 border-black transition-all duration-300'
                style={{ width: `${downloadProgress}%` }}
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

        {error && (
          <div className='mt-4 flex items-center gap-2 text-red-600 text-sm font-bold'>
            <AlertCircle className='w-4 h-4' />
            <span>
              {error}
            </span>
          </div>
        )}

        <p className='text-sm text-gray-600 mt-4 font-bold'>
          Soporta enlaces de YouTube, YouTube Shorts, TikTok y más
        </p>
      </CardContent>
    </Card>
  )
}
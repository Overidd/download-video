import { useState } from 'react';
import { IVideoInfo, YouTubeService } from '@/service';

export const usePreviewDownloader = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messageError, setError] = useState<string | null>(null);
  const [infoPreview, setInfoPreview] = useState<null | IVideoInfo>(null);

  const youtubeService = YouTubeService.getInstance();

  const setUrl = async (url: string) => {
    if (!url && !youtubeService.isValidYouTubeUrl(url)) return;

    setIsLoading(true);

    try {
      const videoId = youtubeService.extractVideoId(url);
      if (videoId) {
        const info = await youtubeService.getVideoInfo(videoId);
        info.thumbnail = await youtubeService.validateThumbnail(videoId);
        setInfoPreview(info);
      }
    } catch {
      setError('Error al obtener la información del video');
    } finally {
      setIsLoading(false);
    }
  };

  // console.log('----', infoPreview)

  return {
    infoPreview,
    messageError,
    isLoading,
    setUrl,
  }
};
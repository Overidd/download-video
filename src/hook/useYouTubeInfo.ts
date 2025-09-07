'use client';
import { useState } from 'react';
import { YouTubeService } from '@/service';

export const useYouTubeInfo = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messageError, setError] = useState<string | null>(null);

  const youtubeService = YouTubeService.getInstance();

  const loadInfo = async (url: string) => {
    if (!url && !youtubeService.isValidYouTubeUrl(url)) return;

    setIsLoading(true);

    try {
      const videoId = youtubeService.extractVideoId(url);
      if (videoId) {
        const info = await youtubeService.getVideoInfo(videoId);
        info.thumbnail = await youtubeService.validateThumbnail(videoId);
        return info;
      }
    } catch {
      setError('Error al obtener la información del video');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messageError,
    isLoading,
    loadInfo,
  }
};
// YouTube service for handling video information extraction and downloads
export interface IVideoInfo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  channel: string;
  views: string;
  description: string;
  publishedAt: string;
  url: string;
}

interface DownloadProgress {
  progress: number;
  status: 'preparing' | 'downloading' | 'completed' | 'error';
  downloadedBytes?: number;
  totalBytes?: number;
}

export class YouTubeService {
  private static instance: YouTubeService;

  public static getInstance(): YouTubeService {
    if (!YouTubeService.instance) {
      YouTubeService.instance = new YouTubeService();
    }
    return YouTubeService.instance;
  }

  // Extract video ID from various YouTube URL formats
  extractVideoId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/watch\?.*&v=)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/  // Direct video ID
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  }

  // Validate YouTube URL format
  isValidYouTubeUrl(url: string): boolean {
    const patterns = [
      /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)/,
      /^[a-zA-Z0-9_-]{11}$/ // Direct video ID
    ];
    return patterns.some(pattern => pattern.test(url));
  }

  // Get video information using YouTube's oEmbed API
  async getVideoInfo(videoId: string): Promise<IVideoInfo> {
    try {
      // Use YouTube's oEmbed API for basic video information
      const oEmbedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

      const response = await fetch(oEmbedUrl);
      if (!response.ok) {
        throw new Error('Video not found or private');
      }
      
      const data = await response.json();

      // Get additional metadata from YouTube's thumbnail service
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

      return {
        id: crypto.randomUUID() + videoId,
        title: data.title,
        url: data.url,
        thumbnail: thumbnailUrl,
        duration: 'Unknown', // oEmbed doesn't provide duration
        channel: data.author_name,
        views: 'Unknown', // oEmbed doesn't provide view count
        description: 'Video description not available via public API',
        publishedAt: 'Unknown'
      };
    } catch (error) {
      // Fallback with basic information
      return {
        id: videoId,
        title: 'Video Title (Limited API Access)',
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        duration: 'Unknown',
        channel: 'Unknown Channel',
        views: 'Unknown',
        description: 'Limited video information available. For full metadata, a backend service with YouTube Data API access is required.',
        publishedAt: 'Unknown'
      };
    }
  }

  // Check if thumbnail exists (maxresdefault might not be available for all videos)
  async validateThumbnail(videoId: string): Promise<string> {
    const thumbnailOptions = [
      `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/default.jpg`
    ];

    for (const thumbnail of thumbnailOptions) {
      try {
        const response = await fetch(thumbnail, { method: 'HEAD' });
        if (response.ok) {
          const img = new Image();
          return new Promise((resolve) => {
            img.onload = () => {
              // Check if it's not the default "no thumbnail" image (120x90)
              if (img.width > 120) {
                resolve(thumbnail);
              } else {
                resolve(thumbnailOptions[1]); // Fallback to hqdefault
              }
            };
            img.onerror = () => resolve(thumbnailOptions[1]);
            img.src = thumbnail;
          });
        }
      } catch (error) {
        continue;
      }
    }

    return thumbnailOptions[1]; // Default to hqdefault
  }

  // Simulate video download with progress tracking
  async downloadVideo(
    videoInfo: IVideoInfo,
    quality: string,
    format: string,
    onProgress?: (progress: DownloadProgress) => void
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      // Simulate download preparation
      onProgress?.({
        progress: 0,
        status: 'preparing'
      });

      setTimeout(() => {
        // Start simulated download
        onProgress?.({
          progress: 0,
          status: 'downloading',
          downloadedBytes: 0,
          totalBytes: this.getEstimatedSize(quality)
        });

        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 15;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            onProgress?.({
              progress: 100,
              status: 'completed',
              downloadedBytes: this.getEstimatedSize(quality),
              totalBytes: this.getEstimatedSize(quality)
            });

            // Create a mock download
            this.createMockDownload(videoInfo, quality, format);
            resolve();
          } else {
            const downloadedBytes = Math.floor((progress / 100) * this.getEstimatedSize(quality));
            onProgress?.({
              progress,
              status: 'downloading',
              downloadedBytes,
              totalBytes: this.getEstimatedSize(quality)
            });
          }
        }, 500 + Math.random() * 1000);
      }, 1000);
    });
  }

  // Create a mock download file
  private createMockDownload(videoInfo: IVideoInfo, quality: string, format: string): void {
    // In a real implementation, this would be the actual video file
    const mockContent = `Mock ${format.toUpperCase()} file for: ${videoInfo.title}\nQuality: ${quality}\nVideo ID: ${videoInfo.id}`;

    const blob = new Blob([mockContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.sanitizeFilename(videoInfo.title)}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Sanitize filename for download
  private sanitizeFilename(filename: string): string {
    return filename.replace(/[^a-z0-9\s\-_\.]/gi, '').replace(/\s+/g, '_').substring(0, 100);
  }

  // Get estimated file size based on quality
  private getEstimatedSize(quality: string): number {
    const sizes = {
      '1080p': 150 * 1024 * 1024, // 150MB
      '720p': 100 * 1024 * 1024,  // 100MB
      '480p': 60 * 1024 * 1024,   // 60MB
      '360p': 30 * 1024 * 1024,   // 30MB
      '240p': 15 * 1024 * 1024    // 15MB
    };
    return sizes[quality as keyof typeof sizes] || sizes['720p'];
  }

  // Format file size for display
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

export const validYouTubeUrl = (url: string) => {
  const patterns = [
    /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)/,
    /^[a-zA-Z0-9_-]{11}$/ // Direct video ID
  ];
  return patterns.some(pattern => pattern.test(url)) ? 'invalid' : null;
}
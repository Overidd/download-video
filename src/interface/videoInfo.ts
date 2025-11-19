export interface IVideoInfo {
  id: string;
  title: string;
  formats: VideoFormat[];
  thumbnails: VideoThumbnail[];
  thumbnail: string;
  description: string;
  upload_date: string;
  uploader: string;
  uploader_id: string;
  uploader_url: string;
  channel_id: string;
  channel_url: string;
  duration: number;
  view_count: number;

  categories: string[];
  tags: string[];
  subtitles: Subtitles;
  automatic_captions: Subtitles;
  _type: 'video';

  average_rating: number;
  age_limit: number;
  webpage_url: string;
  playable_in_embed: boolean;
  live_status: string;
  media_type: object;
  release_timestamp: object;
  _format_sort_fields: object;
  comment_count: number;
  chapters: { start_time: number; title: string; end_time: number }[];
  heatmap: object;
  like_count: number;
  channel: string;
  channel_follower_count: number;
  channel_is_verified: boolean;
  timestamp: number;
  availability: string;
  original_url: string;
  webpage_url_basename: string;
  webpage_url_domain: string;
  extractor: string;
  extractor_key: string;
  playlist: object;
  playlist_index: object;
  display_id: string;
  fulltitle: string;
  duration_string: string;
  release_year: object;
  is_live: boolean;
  was_live: boolean;
  requested_subtitles: object;
  _has_drm: object;
  epoch: number;
  requested_downloads: object[];
  asr: number;
  filesize: number;
  format_id: string;
  format_note: string;
  source_preference: number;
  fps: number;
  audio_channels: number;
  height: number;
  quality: number;
  has_drm: boolean;
  tbr: number;
  filesize_approx: number;
  url: string;
  width: number;
  language: string;
  language_preference: number;
  preference: object;
  ext: string;
  vcodec: string;
  acodec: string;
  dynamic_range: string;
  downloader_options: {
    [v: string]: string | number;
  };
  protocol: string;
  video_ext: string;
  audio_ext: string;
  vbr: object;
  abr: object;
  resolution: string;
  aspect_ratio: number;
  http_headers: {
    [v: string]: string;
  };
  format: string;
  _version: object;
}

export interface VideoFormat {
  format_id: string;
  format_note?: string;
  ext: string;
  url: string;
  width?: number;
  height?: number;
  resolution?: string;
  filesize?: number;
  tbr?: number;
  protocol: string;
  vcodec: string;
  acodec: string;
  filesize_approx?: number;
}

export interface VideoThumbnail {
  id: number;
  width?: string | number;
  height?: string | number;
  url: string;
}

interface Subtitles {
  [k: string]: { ext: string; url: string; name: string }[];
}

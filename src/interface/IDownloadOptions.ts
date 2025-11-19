import { IPlaylistOptions, TFormatAudio, TFormatIdAudio, TFormatIdVideo, TFormatVideo } from './format';
import { IVideoProgress } from './progress';


export type IDownloadOptions =
  | {
    url: string;
    type: 'video';
    formatIdVideo?: TFormatIdVideo | null;
    formatIdAudio?: TFormatIdAudio | null;
    videoOnly?: boolean;
    audioOnly?: boolean;
    format: TFormatVideo | TFormatAudio;
  }
  | {
    url: string;
    type: 'playlist';
    playlist: IPlaylistOptions;
    videoOnly?: boolean;
    audioOnly?: boolean;
    format: TFormatVideo | TFormatAudio;
  };

export interface IMessageWS {
  type: 'progress' | 'done' | 'paused' | 'canceled' | 'error';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  message?: string;
}

export interface IEvents {
  onProgress?: (progress: IVideoProgress) => void;
  onDone?: () => void;
  onPaused?: () => void;
  onCanceled?: () => void;
  onError?: (error: string) => void;
  onFinished?: () => void;
}

export interface ITypeFormat {
  formatIdVideo?: TFormatIdVideo | null;
  formatIdAudio?: TFormatIdAudio | null;
}
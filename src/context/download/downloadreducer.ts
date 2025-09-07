import { IVideoInfo } from '@/service';

export type Action =
  | { type: 'SET_DOWNLOADER'; payload: IVideoInfo }
  | { type: 'REMOVE_DOWNLOADER'; payload: { id: string } }
// | { type: 'DOWNLOAD_SUCCESS' }
// | { type: 'DOWNLOAD_ERROR'; payload: string }
// | { type: 'RESET' };

export enum ActionType {
  SET_DOWNLOADER = 'SET_DOWNLOADER',
  REMOVE_DOWNLOADER = 'REMOVE_DOWNLOADER',
  // DOWNLOAD_SUCCESS = 'DOWNLOAD_SUCCESS',
  // DOWNLOAD_ERROR = 'DOWNLOAD_ERROR',
  // RESET = 'RESET',
}

export const downloadreducer = (state: IVideoInfo[], action: Action): IVideoInfo[] => {
  switch (action.type) {
    case ActionType.SET_DOWNLOADER:
      return [action.payload, ...state];

    case ActionType.REMOVE_DOWNLOADER:
      return state.filter(video => video.id !== action.payload.id);
    default:
      return state;
  }
}

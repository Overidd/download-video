import { IVideoInfo } from '@/service';

export type Action =
  | { type: 'SET_RECORD'; payload: IVideoInfo }
  | { type: 'REMOVE_RECORD'; payload: { id: string } }
// | { type: 'DOWNLOAD_SUCCESS' }
// | { type: 'DOWNLOAD_ERROR'; payload: string }
// | { type: 'RESET' };

export enum ActionType {
  SET_RECORD = 'SET_RECORD',
  REMOVE_RECORD = 'REMOVE_RECORD',
  // DOWNLOAD_SUCCESS = 'DOWNLOAD_SUCCESS',
  // DOWNLOAD_ERROR = 'DOWNLOAD_ERROR',
  // RESET = 'RESET',
}

export const RecordReducer = (state: IVideoInfo[], action: Action): IVideoInfo[] => {
  switch (action.type) {
    case ActionType.SET_RECORD:
      return [action.payload, ...state];

    case ActionType.REMOVE_RECORD:
      return state.filter(video => video.id !== action.payload.id);
    default:
      return state;
  }
}

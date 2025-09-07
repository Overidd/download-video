'use client';
import { stagesData } from '@/data';

import {
  useReducer,
  useCallback,
  useRef,
  useEffect
} from 'react';

interface DownloadState {
  url: string;
  isLoading: boolean;
  progress: number;
  stage: string;
  isComplete: boolean;
  messageError: string;
}

type Action =
  | { type: 'SET_URL'; payload: string }
  | { type: 'START_DOWNLOAD' }
  | { type: 'SET_STAGE'; payload: { stage: string; progress: number } }
  | { type: 'DOWNLOAD_SUCCESS' }
  | { type: 'DOWNLOAD_ERROR'; payload: string }
  | { type: 'RESET' };

const initialState: DownloadState = {
  url: '',
  isLoading: false,
  progress: 0,
  stage: '',
  isComplete: false,
  messageError: '',
};

const reducer = (state: DownloadState, action: Action): DownloadState => {
  switch (action.type) {
    case 'SET_URL':
      return { ...state, url: action.payload };
    case 'START_DOWNLOAD':
      return { ...state, isLoading: true, messageError: '', isComplete: false, progress: 0 };
    case 'SET_STAGE':
      return { ...state, stage: action.payload.stage, progress: action.payload.progress };
    case 'DOWNLOAD_SUCCESS':
      return { ...state, isLoading: false, isComplete: true };
    case 'DOWNLOAD_ERROR':
      return { ...state, isLoading: false, messageError: action.payload };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

export const useDownloadVideo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const resetTimeout = useRef<NodeJS.Timeout | null>(null);

  const downloadVideo = useCallback(async () => {
    if (!state.url.trim()) {
      dispatch({
        payload: 'Por favor ingresa una URL válida',
        type: 'DOWNLOAD_ERROR',
      });
      return;
    }

    dispatch({ type: 'START_DOWNLOAD' });

    try {
      for (const { stage, progress, delay } of stagesData) {
        dispatch({ type: 'SET_STAGE', payload: { stage, progress } });
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      dispatch({ type: 'DOWNLOAD_SUCCESS' });

      resetTimeout.current = setTimeout(() => {
        dispatch({ type: 'RESET' });
      }, 3000);
    } catch {
      dispatch({
        type: 'DOWNLOAD_ERROR',
        payload: 'Ocurrió un messageError en la descarga'
      });
    }
  }, [state.url]);

  useEffect(() => {
    return () => {
      if (resetTimeout.current) clearTimeout(resetTimeout.current);
    };
  }, []);

  const setUrl = (url: string) => {
    dispatch({ type: 'SET_URL', payload: url })
  };

  return {
    ...state,
    setUrl,
    downloadVideo,
  };
};
'use client';
import { useReducer } from 'react';
import { IVideoInfo } from '@/service';
import { RecordReducer, RecordCtx, ActionType } from '.';

export const initialState: IVideoInfo[] = []

export const ProviderRecord = ({
  children
}: React.PropsWithChildren) => {
  const [records, dispatch] = useReducer(RecordReducer, initialState)

  const setRecord = (info?: IVideoInfo | null) => {
    if (!info) return;

    dispatch({
      type: ActionType.SET_RECORD,
      payload: info
    });
  }

  const removeRecord = (id: string) => {
    dispatch({
      type: ActionType.REMOVE_RECORD,
      payload: { id }
    });
  }

  return (
    <RecordCtx.Provider value={{
      removeRecord,
      setRecord,
      records,
    }}>
      {children}
    </RecordCtx.Provider>
  )
}
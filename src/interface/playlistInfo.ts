import { IVideoInfo } from './videoInfo';

export interface IPlaylistInfo {
  id: string;
  title: string;
  _type: 'playlist';
  entries: IVideoInfo[];
  webpage_url: string;
  original_url: string;
  webpage_url_basename: string;
  webpage_url_domain: null | string;
  extractor: string;
  extractor_key: string;
  release_year: null | string;
  playlist_count: number;
  epoch: number;
}
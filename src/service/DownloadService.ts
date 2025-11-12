import { IVideoInfo, IPlaylistInfo } from '@/interface';


export class DownloadService {
  private URLAPI: string | undefined;

  constructor() {
    this.URLAPI = process.env.NEXT_PUBLIC_API_URL;
  }

  async getInfo(url: string): Promise<IVideoInfo | IPlaylistInfo> {
    const res = await fetch(this.URLAPI + '/api/getInfo', {
      body: JSON.stringify({ url: url }),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message);
    }

    return json.data;
  }
}